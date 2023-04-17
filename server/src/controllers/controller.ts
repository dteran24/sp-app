import { Request, Response } from "express";
import { FormData, UpdateFormData } from "../models/model";
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
  const form: FormData = req.body;
  
  db.run(
    `INSERT INTO users (applicationStatus, registrationID, parentName, studentName, studentRegisterNumber, address, zipCode, city, state, country, emailAddress, primaryContactPerson, primaryContactMobile, secondaryContactPerson, secondaryContactMobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      form.applicationStatus,
      form.registrationID,
      form.parentName,
      form.studentName,
      form.studentRegisterNumber,
      form.address,
      form.city,
      form.zipCode,
      form.country,
      form.state,
      form.emailAddress,
      form.primaryContactPerson,
      form.primaryContactMobile,
      form.secondaryContactPerson,
      form.secondaryContactMobile,
    ],
    function (err: Error) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else {
        res.status(201).send("Form Submitted!");
      }
    }
  );
  
};

const getForm = (req: Request, res: Response) => {
  const {id} = req.params;
  let sql = `SELECT * FROM users WHERE registrationID = ?`;
  
  db.get(sql, [id], (err: Error, row: FormData) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else if (!row) {
      res.status(404).send('User not found');
    } else {
      console.log(`found user with ${id}`)
      const user = {
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
      res.json(user);
    }
    

  });
  console.log("get form function");
}

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
  console.log('View Forms function')
};




const updateForm = (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedForm: FormData = req.body; 
  const sql = 'UPDATE users SET parentName = ?, studentName = ?, address = ?, city = ?, zipCode = ?, country = ?, state = ?, emailAddress = ?, primaryContactPerson = ?, primaryContactMobile = ?, secondaryContactPerson = ?, secondaryContactMobile = ? WHERE registrationID = ?';
  db.run(sql,
    [ updatedForm.parentName,
      updatedForm.studentName,
      updatedForm.address,
      updatedForm.city,
      updatedForm.zipCode,
      updatedForm.country,
      updatedForm.state,
      updatedForm.emailAddress,
      updatedForm.primaryContactPerson,
      updatedForm.primaryContactMobile,
      updatedForm.secondaryContactPerson,
      updatedForm.secondaryContactMobile, id], (err: Error, row: FormData) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
      } else if (row!) {
        res.status(404).send('User not found');
      } else {
        res.status(202).send('User Updated!');
      }
    })

  
}







// db.close((err: Error) => {
//   if (err) {
//   console.error(err)
//   } else {
//     console.log("database closed")
// }})

module.exports = {
  viewForms,
  submitForm,
  getForm,
  updateForm
};
