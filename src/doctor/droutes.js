const { Router } = require ('express');
const dcontroller = require('./dcontroller');
const router = Router();

router.get("/alldoctor",dcontroller.getdoctors);
router.post("/registerdoctor", dcontroller.registerdoctor);
router.get("/getdoctor/:did", dcontroller.getDoctorById);
router.put("/updatedoctor/:did",  dcontroller.updatedoctor);
router.delete("/deletedoctor/:did",dcontroller.removedoctor);
router.post("/logindoctor", dcontroller.logindoctor);
//router.put("/forgot-password",dcontroller.forgetpassword);
module.exports = router;