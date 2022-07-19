const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/customerRegisteration")
.then(()=>{console.log(`connection successful`);})
.catch((e)=>{`no connection`})