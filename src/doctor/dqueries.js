const getdoctors = "select * from doctor";
const registerdoctor="insert into doctor (dname,speciality,start_time,end_time,landline,demail,password) values ($1, $2,$3,$4,$5,$6,$7)";
const checkEmailExists = "SELECT s FROM doctor s WHERE s.demail = $1";
const getDoctorById = "SELECT demail,speciality FROM doctor where dname= $1";
const updatedoctor="UPDATE doctor SET dname=$1,demail=$2 where dname = $3 ";
const removedoctor="delete from doctor where dname = $1 ";
const getdoctorByemail = "SELECT * FROM doctor where demail= $1";
module.exports = {
    getdoctors,
     checkEmailExists,
    getDoctorById,
    updatedoctor,
    removedoctor,
    getdoctorByemail,
    registerdoctor,
};