const mysql=require('mysql');
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node.js'
});
connection.connect(function(error){
    if(!!error) console.log(error);
    else {
        console.log('Database connected')
    }
});

module.exports = connection;