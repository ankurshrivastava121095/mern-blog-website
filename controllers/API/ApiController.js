const UserModel = require("../../models/User");
const bcrypt = require('bcrypt')

class ApiController {
  static registrationInsert = async (req, res) => {
    const { name, email, password, conPassword } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ😓" });
    } else {
      if (name && email && password && conPassword) {
        if (password == conPassword) {
          try {
            // const salt = await bcrypt.genSalt(10)
            // const hashPassword = await bcrypt.hash(password,salt)
            const hashPassword = await bcrypt.hash(password, 10);
            const data = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
            });
            const dataSaved = await data.save();
            res
              .status(201)
              .send({
                status: "success",
                message: "Registration Successfully 😃🍻",
              });
          } catch (err) {
            console.log(err);
          }
        } else {
          res.send({
            status: "failed",
            message: "PASSWORD AND CONFIRM PASSWORD IS NOT MATCHING 😡😡",
          });
        }
      } else {
        res.send({ status: "failed", message: "FILL ALL FIELDS 😡😡" });
      }
    }
  };
  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      // console.log(password)
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        // console.log(user)
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatched) {
            //generate jwt token
            const token = jwt.sign(
              { userId: user._id },
              "ankurshrivastava121095"
            );
            // console.log(token)
            res.cookie("jwt", token);
            res.redirect("/admin/dashboard");
          } else {
            res.send({ status: "failed", message: "PASSWORD IS NOT VALID 😡😡" });
          }
        } else {
            res.send({ status: "failed", message: "USER NOT FOUND 😡😡" });
        }
      } else {
        res.send({ status: "failed", message: "FILL ALL FIELDS 😡😡" });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
module.exports = ApiController;
