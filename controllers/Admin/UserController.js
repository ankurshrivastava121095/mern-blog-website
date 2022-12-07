const UserModel = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static register = async(req,res) => {
        try{
            res.render('front/register',{message : req.flash('error')})
        }catch(err){
            console.log(err)
        }
    }
    static registrationInsert = async(req,res) => {
            const {name, email, password, conPassword} = req.body
            const user = await UserModel.findOne({email:email})
            if (user) {
                req.flash('error','Email already exist !')
                res.redirect('/admin/register')
            } else {
                if (name && email && password && conPassword) {
                    if (password == conPassword) {
                        try{
                            // const salt = await bcrypt.genSalt(10)
                            // const hashPassword = await bcrypt.hash(password,salt)
                            const hashPassword = await bcrypt.hash(password,10)
                            const data = new UserModel({
                                name: name,
                                email: email,
                                password: hashPassword
                            })
                            const dataSaved = await data.save()
                            if (dataSaved) {
                                req.flash('succMsg','Registreation Successful, Please Login !')
                                res.redirect('/login')
                            } else {
                                res.redirect('/admin/register')
                            }
                        }catch(err){
                            console.log(err)
                        }
                    } else {
                        req.flash('error','Password and Confirm Password does not match !')
                        res.redirect('/admin/register')
                    }
                } else {
                    req.flash('error','All Fields are required !')
                    res.redirect('/admin/register')
                }
            }
    }
    static verifyLogin = async(req,res) => {
        try{
            // console.log(req.body)
            const {email, password} = req.body
            // console.log(password)
            if (email && password) {
                const user = await UserModel.findOne({email : email})
                // console.log(user)
                if (user != null) {
                    const isMatched = await bcrypt.compare(password,user.password)
                    if ((user.email === email) && isMatched) {
                        //generate jwt token
                        const token = jwt.sign({ userId: user._id }, 'ankurshrivastava121095');
                        // console.log(token)
                        res.cookie('jwt',token)
                        res.redirect('/admin/dashboard')
                    } else {
                        req.flash('error','Email and Password is not valid !')
                        res.redirect('/login')
                    }
                } else {
                    req.flash('error','You are not registered user !')
                    res.redirect('/login')
                }
            } else {
                req.flash('error','All Fields are required !')
                res.redirect('/login')
            }
        }catch(err){
            console.log(err)
        }
    }
    static logout = async(req,res) => {
        try{
            res.clearCookie('jwt')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = UserController