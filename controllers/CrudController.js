class CrudController{
    static display = async(req,res) => {
        try{
            res.render('crud/display')
        }catch(err){
            console.log(err)
        }
    }
    static create = async(req,res) => {
        try{
            res.render('crud/create')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = CrudController