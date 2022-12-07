const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
    },
},{ timestamps : true })

const BlogModel = mongoose.model('practiceblogs',BlogSchema)

module.exports = BlogModel