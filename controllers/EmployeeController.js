class EmployeeController{
    static home = async(req,res) => {
        try{
            // res.send('Home')
            res.render('Home')
        }catch(err){
            console.log(err)
        }
    }
    static about = async(req,res) => {
        try{
            // res.send('about')
            res.render('about')
        }catch(err){
            console.log(err)
        }
    }
    static ourTeam = async(req,res) => {
        try{
            // res.send('ourTeam')
            res.render('ourTeam')
        }catch(err){
            console.log(err)
        }
    }
    static contactUs = async(req,res) => {
        try{
            // res.send('contactUs')
            res.render('contactUs')
        }catch(err){
            console.log(err)
        }
    }
    static login = async(req,res) => {
        try{
            // res.send('login')
            res.render('login')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = EmployeeController