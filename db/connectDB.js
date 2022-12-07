const mongoose = require('mongoose')
const url = 'mongodb+srv://ankurShrivastava:Ankur121095@cluster0.gsunusb.mongodb.net/blogWebsiteDB?retryWrites=true&w=majority'

const connectDB = () => {
    // return mongoose.connect('mongodb://localhost:27017/blogWebsitePractice')
    return mongoose.connect(url)
    .then(()=>{
        console.log("Connection Successfully !")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = connectDB