const path=require('path');
const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const connection = require('./db-config');
const app=express();

// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");


app.get('/', (req,res)=>{
    res.render("form")
})
app.post("/", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    console.log("username:"+ username);
    console.log("password:" +password);

})

app.get("/register",(req,res)=>{
    res.render('signup')
})

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})


