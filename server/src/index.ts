
import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const db = new sqlite3.Database('./myDatabase.db', sqlite3.OPEN_READWRITE, (error: Error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Connection Successful")
  }
})

db.run('create table if not exists users (applicationStatus TEXT,registrationID TEXT,parentName TEXT,studentName TEXT,studentRegisterNumber TEXT,address TEXT,zipCode TEXT,city TEXT,state TEXT,country TEXT,emailAddress TEXT,primaryContactPerson TEXT,primaryContactMobile TEXT,secondaryContactPerson TEXT, secondaryContactMobile TEXT)');




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
 
  db.run(`INSERT INTO users (applicationStatus, registrationID, parentName, studentName, studentRegisterNumber, address, zipCode, city, state, country, emailAddress, primaryContactPerson, primaryContactMobile, secondaryContactPerson, secondaryContactMobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [applicationStatus, registrationID, parentName, studentName, studentRegisterNumber, address, city, zipCode, country, state, emailAddress, primaryContactPerson, primaryContactMobile, secondaryContactPerson, secondaryContactMobile], function (err: Error) {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`A row has been inserted`);
    }
  })
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
  }
);
const sql = 'SELECT * FROM users'
db.all(sql, [], (error: Error, rows: any) => {
  if (error) {
    console.error(error);
  } else {
    rows.forEach((row: any) => {
      console.log(row)
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
// db.close((err: Error) => {
//   if (err) {
//   console.error(err)
//   } else {
//     console.log("database closed")
// }})