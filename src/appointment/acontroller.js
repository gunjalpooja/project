const pool = require('../../db');
const aqueries = require('./aqueries');
const bcrypt = require('bcrypt');
const getappointments = (req, res) => {
  //console.log("getting patient");
  pool.query(aqueries.getappointments, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);

  });
};

const makeappointment = async (req, res) => {
  const appointment_number = req.body.appointment_number;
  const pemail = req.body.pemail;
  const dname = req.body.dname;
  const select_date = req.body.select_date;
  const select_time = req.body.select_time;
  const speciality = req.body.speciality;
  const message = req.body.message;


  pool.query(
    aqueries.addappointment,
    [appointment_number, pemail, dname, select_date, select_time, speciality, message],
    (error, results) => {

      // if (error) {
      //    throw error
      //  }
      //  res.status(201).send({"msg":"patient appointment created successfully",status :true});
      if (error) {
        throw error;
      }
      res.status(500).json({ "msg": "patient appointment created successfully" , status: true})
    })
};

module.exports = {
  getappointments,
  makeappointment,
};