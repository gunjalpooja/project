
const pool = require('../../db');
//const queries = require('./queries');
const bcrypt = require('bcrypt');
const Validator = require("validator");
 var nodemailer = require('nodemailer');
 var bcrypt = require('bcrypt');
 var randtoken = require('rand-token');
//send email
function sendEmail(pemail, token) {
var pemail = pemail;
var token = token;
var mail = nodemailer.createTransport({
service: 'gmail',
auth: {
user: 'bhagatkaveri750@gmail.com', // Your email id
pass: '8669724028' // Your password
}
});
var mailOptions = {
from: 'bhagatkaveri2000@gmail.com',
to: pemail,
subject: 'Reset Password Link - Tutsmake.com',
text: 'You requested for reset password, kindly use this <a href="http://localhost:8000/api/v1/patient/reset-password?token=' + token + '">link</a> to reset your password'
};
mail.sendMail(mailOptions, function(error, info) {
if (error) {
console.log(1)
} else {
console.log(0)
}
});
}

router.get('/', function(req, res, next) {
res.render('login', {
title: 'forget password'
});
});
/* send reset password link in email */
router.post('/reset-password-email', function(req, res, next) {
var pemail = req.body.pemail;
//console.log(sendEmail(email, fullUrl));
pool.query('SELECT * FROM patient WHERE pemail ="' + pemail + '"', function(err, result) {
if (err) throw err;
var type = ''
var msg = ''
console.log(result[0]);
if (result[0].pemail.length > 0) {
var token = randtoken.generate(20);
var sent = sendEmail(pemail, token);
if (sent != '0') {
var data = {
token: token
}
pool.query('UPDATE patient SET ? WHERE pemail ="' + pemail + '"', data, function(err, result) {
if(err) throw err
})
type = 'success';
msg = 'The reset password link has been sent to your email address';
} else {
type = 'error';
msg = 'Something goes to wrong. Please try again';
}
} else {
console.log('2');
type = 'error';
msg = 'The Email is not registered with us';
}
req.flash(type, msg);
res.redirect('/');
});
})
/* reset page */
router.get('/reset-password', function(req, res, next) {
res.render('reset-password', {
//title: 'Reset Password Page',
token: req.query.token
});
});
/* update password to database */
router.post('/update-password', function(req, res, next) {
var token = req.body.token;
var password = req.body.password;
pool.query('SELECT * FROM patient WHERE token ="' + token + '"', function(err, result) {
if (err) throw err;
var type
var msg
if (result.length > 0) {
var saltRounds = 10;
// var hash = bcrypt.hash(password, saltRounds);
bcrypt.genSalt(saltRounds, function(err, salt) {
bcrypt.hash(password, salt, function(err, hash) {
var data = {
password: hash
}
pool.query('UPDATE patient SET ? WHERE pemail ="' + result[0].pemail + '"', data, function(err, result) {
if(err) throw err
});
});
});
type = 'success';
msg = 'Your password has been updated successfully';
} else {
console.log('2');
type = 'success';
msg = 'Invalid link; please try again';
}
req.flash(type, msg);
res.redirect('/');
});
})
module.exports = router;