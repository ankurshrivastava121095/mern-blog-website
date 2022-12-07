const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    catName : {
        type : String,
        required : true
    }
},{ timestamps : true })

const CategoryModel = mongoose.model('practicecategories',CategorySchema)

module.exports = CategoryModel