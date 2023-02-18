const pool = require('../../db');
const queries = require('./queries');
const config = require('../config/config');
const bcrypt = require('bcrypt');
var randomstring = require('randomstring');
 var nodemailer = require('nodemailer');
 var randtoken = require('rand-token');
 const sendresetpasswordmail = async(pname,pemail,token) => {}
 try {

   const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth: {
    user: config.emailUser, // Your email id
    pass: config.emailPassword // Your password
    }
    });
   const  mailOptions = {
    from: config.emailUser,
    to: pemail,
    subject: 'Reset Password Link',
    html: '<p>You requested for reset password, kindly use this <a href="http://localhost:8000/api/v1/patient/reset-password?token=' + token + '">link</a> to reset your password'
    } 
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
  console.log(error)
  } else {
  console.log("Mail has been sent:-", info.response)
  }
  });
  }
 catch(error) {
  res.status(400).send({success:false,msg: "error message"})    

 }

const getpatients = (req, res) => {
  //console.log("getting patient");
  pool.query(queries.getpatients, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    //res.send("all patient");
  });
};
const getPatientById = (req, res) => {
  //const pid = parseInt(req.params.pid);
  const pname = req.body.pname;
  pool.query(queries.getPatientById, [pname], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
    console.log("get patient successfully");
    //console.log(getPatientByname);
  });
};

const registerpatient = async (req, res) => {
  //const pid = req.body.pid;
  const pname = req.body.pname;
  const pemail = req.body.pemail;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const token = req.body.token;
  try {
    const data = await queries.getPatientByemail;
    const arr = data.rows;
    if (arr && arr.length) {
      return res.status(400).json({ error: "email already there,no need to register again" , status: false});
    }
    else {
      bcrypt.hash(password, 8, (error, hash) => {
        if (error)
          res.status(error).json({ error: "server error" , status: false});
        /*const user ={
          pid,
          pname,
          pemail,
          mobile,
          password:hash,
        };*/
        var flag = 1;


        pool.query(
          queries.registerpatient,
          [pname, pemail, mobile, password,token],
          (error, results) => {
            if (error) {
              flag = 0;//if user is not insert is inserted to databse
              res.status(500).json({ "msg": "database error" , status: false})
            }
            else {
              flag = 1;
              return res.status(200).json({ status: true,"msg": "user added to database" });
            }
            /*if (flag) {
               const token = jwt.sign({ pemail: pemail }, process.env.SECRET_KEY);
             }*/
          });
      })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "database error while registation patient", })

  };
}


const removepatient = (req, res) => {
  // const pid = parseInt(req.params.pid);
  const pname = req.body.pname;
  pool.query(queries.removepatient, [pname], (error, results) => {
    const nopatientfound = !results.rows.length;
    if (nopatientfound) {
      res.send("patient does not exist in the database");
    }
  });
};

const updatepatient = (req, res) => {
  //const pid = parseInt(req.params.pid);
  const pname = req.body.pname;
  pool.query(queries.updatepatient, [pname], (error, results) => {
    const nopatientfound = !results.rows.length;
    if (nopatientfound) {
      res.send({"msg" : "patient does not exist in the database", status : true});
    }
  });
};
const loginPatient = (req, res) => {
  const pemail = req.body.pemail;
  const password = req.body.password;
  pool.query(queries.getPatientByemail, [pemail], (error, results) => {
    if (error) {
      res.status(500).json({ "msg": "something wrong", status: false })
    }
    const user = results.rows[0];
    if (user) {
      if (password === user.password) {
        console.log(" patient login successfully");
        res.status(200).json({ status: true, data: user });
      }
      else {
        res.status(400).json({ " msg": "invalid password", status: false })
      }
    }
    else {
      res.status(400).json({ " msg": "invalid email", status: false })
    }
  });
};

const forget_password = async(req, res)=>{ 
try {
const pemail=req.body.pemail;

 const userData = await patient.findOne({pemail: pemail});

 if(userData){
  const randomstring = randomstring.generate();
 const data =await patient.updateOne({pemail:pemail},{$set:{token :randomstring}});
sendresetpasswordmail(userData.pname,userData.pemail,randomstring);

 res.status(200).send({success:true,msg: "please check your inbox of mailand reset your password."})    


}
  else {
 res.status(200).send({success:true,msg: "This email does not exists."})  
  } 
} catch (error) 
  {
     res.status(400).send({success:false,msg:error.message});
  
  }
}


module.exports = {
  getpatients,
  getPatientById,
  registerpatient,
  updatepatient,
  removepatient,
  loginPatient,
  forget_password,
};