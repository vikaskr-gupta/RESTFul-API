const express = require("express");
require("./db/conn")
const Student = require("./modules/students")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//POST
app.post("/students", async(req, res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch(e){
        res.status(400).send(e);
    }
});

//GET
app.get("/students", async(req, res)=>{
    try{
        const studentsData = await Student.find();
        res.status(404).send(studentsData);
    } catch(e){
        res.status(500).send(e);
    }
});

//FIND by ID
app.get("/students/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    } catch(e){
        res.status(500).send(e);
    }
});

//Update
app.patch("/students/:id", async(req, res)=>{
    try{
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new : true
        });
        res.send(updateStudents);
    }catch(e){
        res.status(400).send(e);
    }
});

//Delete
app.delete("/students/:id", async(req, res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    }catch(e){
        res.status(400).send(e);
    }
});

//Listening on Given port
app.listen(port, ()=>{
    console.log(`${port} Yes, I am connected!`);
});