const { Router } = require ('express');
const acontroller = require('./acontroller');
const router = Router();

router.get("/allappointments",acontroller.getappointments);
router.post("/bookappointment", acontroller.makeappointment);


module.exports = router;