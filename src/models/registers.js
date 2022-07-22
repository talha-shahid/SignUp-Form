const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");

//defining Schema
const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

//---> MIDDLEWARE

//generating tokens
employeeSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id: this._id.toString()}, "mynameisTalhaShahidAScientist");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(error){
        res.send("the error part" + error);
    }
}

//converting password into hash
employeeSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);

        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
})

const Register = new mongoose.model("Register", employeeSchema);

//exporting
module.exports = Register;