const BlogModel = require('../../models/PracticeBlog')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'depjzfj9a', 
    api_key: '489915939841262', 
    api_secret: '5tBdTUHJ33XMIN3iP-49Rfeps9I',
    // secure: true
});

class BlogController{
    static blog = async(req,res) => {
        try{
            res.render('admin/blog/index')
        }catch(err){
            console.log(err)
        }
    }
    static blogList = async(req,res) => {
        try{
            const data = await BlogModel.find()
            // console.log(data)
            res.render('admin/blog/display',{result:data})
        }catch(err){
            console.log(err)
        }
    }
    static blogInsert = async(req,res) => {
        try{
            // console.log(req.files.image)
            const file = req.files.image
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogImage'
            })

            // console.log(myCloud)
            const data = new BlogModel({
                title : req.body.title,
                description : req.body.description,
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            })
            await data.save()
            res.redirect('/admin/blogList')
        }catch(err){
            console.log(err)
        }
    }
    static viewBlog = async(req,res) => {
        try{
            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/view',{result:data})
        }catch(err){
            console.log(err)
        }
    }
    static editBlog = async(req,res) => {
        try{
            const data = await BlogModel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/edit',{result:data})
        }catch(err){
            console.log(err)
        }
    }
    static blogUpdate = async(req,res) => {
        try{
            const user = await BlogModel.findById(req.params.id)
            const imageId = user.image.public_id
            // console.log(imageId)
            await cloudinary.uploader.destroy(imageId)
            const file = req.files.image
            // console.log(file)
            const myCloud = await cloudinary.uploader.upload(file.tempFilePath,{
                folder : 'blogImage'
            })
            // console.log(req.params.id)
            const data = await BlogModel.findByIdAndUpdate(req.params.id,{
                title : req.body.title,
                description : req.body.description,
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
            })
            await data.save()
            res.redirect('/admin/blogList')
        }catch(err){
            console.log(err)
        }
    }
    static deleteBlog = async(req,res) => {
        try{
            const user = await BlogModel.findById(req.params.id)
            const imageId = user.image.public_id
            // console.log(imageId)
            await cloudinary.uploader.destroy(imageId)
            const data = await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/blogList')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = BlogController