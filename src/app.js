const express = require("express");
const path = require("path");
const hbs = require("hbs");
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

app.get("/", (req, res)=>{
    res.render("register")
})

app.post("/", async(req, res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;


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

            const registered = await registerEmployee.save();
            res.status(201).render("register")
        }
        else{
            res.send("Passwords are not matching")
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})