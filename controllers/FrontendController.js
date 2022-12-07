const BlogModel = require('../models/PracticeBlog')
const CategoryModel = require('../models/PracticeCategory')

class FrontendController{
    static home = async(req,res) => {
        try{
            const blogs = await BlogModel.find()
            // console.log(blogs)
            res.render('front/home',{b : blogs})
        }catch(err){
            console.log(err)
        }
    }
    static about = async(req,res) => {
        try{
            res.render('front/about')
        }catch(err){
            console.log(err)
        }
    }
    static ourTeam = async(req,res) => {
        try{
            res.render('front/ourTeam')
        }catch(err){
            console.log(err)
        }
    }
    static contactUs = async(req,res) => {
        try{
            res.render('front/contactUs')
        }catch(err){
            console.log(err)
        }
    }
    static login = async(req,res) => {
        try{
            res.render('front/login',{succMessage : req.flash('succMsg'), errMsg : req.flash('error')})
        }catch(err){
            console.log(err)
        }
    }
    static blogDetail = async(req,res) => {
        try{
            // console.log(req.params.id)
            const data = await BlogModel.findById(req.params.id)
            const catData = await CategoryModel.find()
            const blogData = await BlogModel.find()
            res.render('front/blogDetail',{result : data, categoryData : catData, allBlogs :blogData})
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = FrontendController