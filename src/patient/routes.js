const { Router } = require ('express');
const controller = require('./controller');
const router = Router();

router.get("/allpatient",controller.getpatients);
router.post("/register", controller.registerpatient);
router.get("/getpatient/", controller.getPatientById);
 router.put("/upadatepatient",  controller.updatepatient);
 router.delete("/deletepatient",controller.removepatient);
 router.post("/login", controller.loginPatient);
router.post("/forget-password",controller.forget_password);
module.exports = router;