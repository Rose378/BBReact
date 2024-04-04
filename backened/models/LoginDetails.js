const mongoose = require('mongoose');

//create a schema

let LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
 

})

//create a table

let login = mongoose.model('Login' , LoginSchema)
module.exports = login