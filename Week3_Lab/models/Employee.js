const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
        firstName:{
        type:String,
        required:false
        },
        lastName:{
            type:String,
            required:false
        },
        department:{
            type:String,
            required:false
        },
        startDate:{
            type:Date,
            required:false
        },
        jobTitle:{
            type:String,
            required:false
        },
        salary:{
            type:String,
            required:false
        }

})

mongoose.model('Employee', EmployeeSchema)