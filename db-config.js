const mysql=require('mysql');
const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node.js'
});
connection.connect((err) => {
    if (err) console.log("error found," + err);
    console.log("connected to db successfully");
  });

module.exports = connection;