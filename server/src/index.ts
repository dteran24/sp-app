import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit", (req: Request, res: Response) => {
  const {
    applicationStatus,
    registrationID,
    parentName,
    studentName,
    studentRegisterNumber,
    address,
    city,
    zipCode,
    country,
    state,
    emailAddress,
    primaryContactPerson,
    primaryContactMobile,
    secondaryContactPerson,
    secondaryContactMobile,
  } = req.body;
  console.log(`app status:${applicationStatus} 
  RegistrationID: ${registrationID} 
  ${parentName} 
  ${studentName} 
  ${studentRegisterNumber} 
  ${address} 
  ${zipCode} 
  ${city}
  ${country} ${state} ${emailAddress} ${primaryContactMobile} ${primaryContactPerson} ${secondaryContactMobile} ${secondaryContactPerson}`);
  res.send("Form Submitted!");
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
