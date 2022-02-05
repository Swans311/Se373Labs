const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')
const { Console } = require('console')
const http = require('http')
const url = require('url')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())



mongoose.connect('mongodb://localhost:27017/EmployeeEntry',{
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
})

require('./models/Employee')

var Employee = mongoose.model('Employee')

//saves the data
app.post('/saveNewEntry', (req,res)=>{
    console.log(req.body)
    //var emp = new Employee(req.body.firstName, req.body.lastName, req.body.department,  req.body.startDate,  req.body.jobTitle, req.body.salary)
    //console.log(emp)
    new Employee(req.body).save().then(()=>{
        console.log("Data Saved")
        res.redirect("workerList.html")
    }) 
})

//reads the data
app.get('/getData', (req,res)=>{
    Employee.find().then((Employee)=>{
        res.json({Employee})
    })
})

//delete the data
app.post('/deleteWorker', (req,res)=>{
    console.log("Employee Terminated " + req.body._id + " " + req.body.Employee)
    Employee.findByIdAndDelete(req.body._id).exec()
    res.redirect("workerList.html")
})

//update the worker here...
app.post('/toUpdate', (req,res)=>{
    console.log("Stuff happened..."+req.body._id)
    var emp = Employee.findById(req.body._id)
    console.log(emp)
    //Employee.findById(req.body._id).exec()
    res.redirect("workerUpdate.html")//?._id="+req.body._id)
    console.log("should not get this far...")
})

app.get('/getWorker', (req,res)=>{
    Employee.find().then((Employee)=>{
        res.json({Employee})
    })
})

app.post('/saveUpdatedEntry', (req,res)=>{
    console.log(req.body)
    //var emp = new Employee(req.body.firstName, req.body.lastName, req.body.department,  req.body.startDate,  req.body.jobTitle, req.body.salary)
    //console.log(emp)
    Employee.findByIdAndUpdate(req.body._id, req.body).then(()=>{
        console.log("Data Saved")
        res.redirect("workerList.html")
    }) 
})




app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log('listening on port 3000')
})