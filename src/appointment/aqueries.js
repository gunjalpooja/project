const getappointments = "select * from bookingappointment";
const addappointment="insert into  bookingappointment(appointment_number,pemail,dname, select_date,select_time,speciality,message) values($1,$2,$3,$4,$5,$6,$7)";

module.exports = {
    getappointments,
    addappointment,
};