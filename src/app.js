const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const Register = require("./models/registers");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


//--> get "/"
app.get("/", (req, res)=>{
    res.render("index");
})

//sign up

//--->get "/register"
app.get("/register", (req, res)=>{
    res.render("register");
})
//--->post "/register"
app.post("/register", async(req, res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        //if passwords are matching,then proceed
        if(password === cpassword){
            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword,
                gender: req.body.gender
            })
            //generate token
            const token = await registerEmployee.generateAuthToken();
            //save to database
            const registered = await registerEmployee.save();
            //return to index
            res.status(201).render("index");
        }
        else{
            res.send("Passwords are not matching")
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

//login check

//---> get "/login"
app.get("/login", (req,res)=>{
    res.render("login");
})
//---> post "/login"
app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        //find the specified email in the database
        const useremail = await Register.findOne({email: email});

        //compare typed password with the stored password
        const isMatch = await bcrypt.compare(password, useremail.password);

        //if typed password matched with password in database
        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send("password are not matching");
        }
    }
    catch(error){
        res.status(400).send("invalid email");
    }
})


//listening
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})