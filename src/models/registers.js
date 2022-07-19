const mongoose = require("mongoose");

const employeeSshema = new mongoose.Schema({
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
    }
})

const Register = new mongoose.model("Register", employeeSshema);

module.exports = Register;