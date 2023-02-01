const path=require('path');
const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const app=express();
const mysql = require('mysql');

const multer = require("multer");
const { diskStorage } = require("multer");

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node.js'
});
connection.connect((err) => {
  if (err) console.log("error found," + err);
  console.log("Database connected");
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.get('/', (req,res)=>{
    res.render("signup.ejs");
})


app.post('/register',upload.single('profile_pic'),(req,res,next)=>{
    console.log(req.body);

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let pwd = req.body.pwd
    let user_name = req.body.username
    let image=req.file.filename;

connection.query(`INSERT INTO user_table (first_name,last_name,user_name,email,password,image) VALUES (?,?,?,?,?,?)`,[first_name,last_name,user_name,email,pwd,image],(err,result)=>{
        if(err) console.log('error found:',err);
        console.log(result);
        //res.render("dashboard.ejs",{email,pwd,username,image})
})
connection.query(
  `SELECT image FROM user_table WHERE email = ?`,
  [email],
  async (err, result) => {
    if (err) console.log("err found:", err);
    console.log(result);
    // console.log(result[0].image.toString());

    image = path.join("images", "uploads", result[0].image.toString());

    console.log(image);
    res.render("dashboard.ejs", { pwd, user_name, email, image });
  }
);
  })
  
 
app.listen(3000,()=>{
console.log('Server running on port 3000');
})


