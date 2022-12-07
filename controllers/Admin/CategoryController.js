const CategoryModel = require('../../models/PracticeCategory')

class CategoryController{
    static category = async(req,res) => {
        try{
            res.render('admin/category/index')
        }catch(err){
            console.log(err)
        }
    }
    static categoryInsert = async(req,res) => {
        try{
            // console.log(req.body)
            const data = new CategoryModel({
                catName : req.body.catName
            })
            await data.save()
            res.redirect('/admin/categoryList')
        }catch(err){
            console.log(err)
        }
    }
    static categoryList = async(req,res) => {
        try{
            const data = await CategoryModel.find()
            res.render('admin/category/display',{result : data})
        }catch(err){
            console.log(err)
        }
    }
    static viewCategory = async(req,res) => {
        try{
            const data = await CategoryModel.findById(req.params.id)
            res.render('admin/category/view',{result : data})
        }catch(err){
            console.log(err)
        }
    }
    static editCategory = async(req,res) => {
        try{
            const data = await CategoryModel.findById(req.params.id)
            res.render('admin/category/edit',{result : data})
        }catch(err){
            console.log(err)
        }
    }
    static categoryUpdate = async(req,res) => {
        try{
            const data = await CategoryModel.findByIdAndUpdate(req.params.id,{
                catName : req.body.catName
            })
            res.redirect('/admin/categoryList')
        }catch(err){
            console.log(err)
        }
    }
    static deleteCategory = async(req,res) => {
        try{
            const data = await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/categoryList')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = CategoryController