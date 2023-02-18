const {Pool} = require('pg');
 const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'bookappointment',
    password : 'Sairam@123',
    port : 5432
});

/*pool.query("insert into amar (name,email,mobile) values ('uma','uma@gmail.com',78564321)",(err,res)=>{
    pool.query("select * from amar",(err,res)=>{
  
    console.log(err,res);
    pool.end()
});

});*/
/*pool.query("update amar set name ='kaveri' where name ='uma'",(err,res)=>{
    pool.query("select * from amar",(err,res)=>{
  
    console.log(err,res);
    pool.end()
});*/
/*pool.query("delete  from amar where name ='   '",(err,res)=>{
    //pool.query("select * from amar",(err,res)=>{
  
    console.log(err,res);
    pool.end()
});*/
module.exports =pool;



