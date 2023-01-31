const path=require('path');
const express=require('express');
const ejs=require('ejs');
const bodyParser=require('body-parser');
const app=express();
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

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req,res)=>{
    res.render("signup.ejs");
})
let image;

app.post('/register',upload.single("profile_pic"),(req,res,next)=>{
    console.log(req.body);

    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let pwd = req.body.pwd
    let username = req.body.username
    image=req.file.filename;

    connection.query(`INSERT INTO user_table (first_name,last_name,user_name,email,password,image) VALUES (?,?,?,?,?,?)`,[first_name,last_name,username,email,pwd,image],(err,result)=>{
        if(err) console.log('error found:',err);
        console.log(result);

    })
    connection.query(
        `SELECT image FROM user_table WHERE email=?`,
        [email],
        async(err,result)=>{
            if(err)console.log("err found:",err);
            image=path.join("images","uploads",result[0].image.toString());

            console.log(image);
            res.render("dashboard.ejs",{password,username,email,image});        
  })
})

app.post("/update", (req, res) => {
    console.log(req.body);
  
    let email = req.body.email;
    let password = req.body.pwd;
    let username = req.body.username;
  
    connection.query(
      `UPDATE user_table SET  username = ? , password = ? WHERE email = ? `,
      [email, username, password],
      [email],
      (err, result) => {
        if (err) console.log("error found:", err);
        console.log(result);
  
        res.render("dashboard.ejs", { email, password, username, image });
      });
  });
  
app.listen(3000,()=>{
console.log('Server running on port 3000');
})


