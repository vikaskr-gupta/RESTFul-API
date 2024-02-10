const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/students-api")
.then(()=>{
    console.log("connection is success");
}).catch((error)=>{
    console.log("No connection"+error);
})