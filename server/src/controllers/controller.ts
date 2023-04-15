import { Request, Response } from "express";
import { FormData } from "../models/model";
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:", (error: Error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Connection Successful");
  }
});
db.run(
  "create table if not exists users (applicationStatus TEXT,registrationID TEXT,parentName TEXT,studentName TEXT,studentRegisterNumber TEXT,address TEXT,zipCode TEXT,city TEXT,state TEXT,country TEXT,emailAddress TEXT,primaryContactPerson TEXT,primaryContactMobile TEXT,secondaryContactPerson TEXT, secondaryContactMobile TEXT)"
);

const submitForm = (req: Request, res: Response) => {
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

  db.run(
    `INSERT INTO users (applicationStatus, registrationID, parentName, studentName, studentRegisterNumber, address, zipCode, city, state, country, emailAddress, primaryContactPerson, primaryContactMobile, secondaryContactPerson, secondaryContactMobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
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
    ],
    function (err: Error) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
          console.log(`A row has been inserted`);
    
        res.send("Form Submitted!");
      }
    }
  );
};





const viewForms = (req: Request, res: Response) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (error: Error, rows: any) => {
    if (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    } else {
      const users = rows.map((row: FormData) => {
        return {
          applicationStatus: row.applicationStatus,
          registrationID: row.registrationID,
          parentName: row.parentName,
          studentName: row.studentName,
          studentRegisterNumber: row.studentRegisterNumber,
          address: row.address,
          city: row.city,
          zipCode: row.zipCode,
          country: row.country,
          state: row.state,
          emailAddress: row.emailAddress,
          primaryContactPerson: row.primaryContactPerson,
          primaryContactMobile: row.primaryContactMobile,
          secondaryContactPerson: row.secondaryContactPerson,
          secondaryContactMobile: row.secondaryContactMobile,
        };
      });
        res.json(users)
    }
  });
};

// db.close((err: Error) => {
//   if (err) {
//   console.error(err)
//   } else {
//     console.log("database closed")
// }})

module.exports = {
  viewForms,
  submitForm,
};
