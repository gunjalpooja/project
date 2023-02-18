const express=require('express')
const cors=require('cors')

const patientRoutes = require("./src/patient/routes");
const doctorRoutes = require("./src/doctor/droutes");
const appointmentRoutes = require("./src/appointment/aroutes");
const app= express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public/ui'));

app.get("/", (req,res) =>
{
    res.send("hello world");                                                                                                                                                                                                                                                                                                                    
});

app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes);


app.listen(port,() => console.log('app listening on port  8000'));


