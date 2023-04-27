import { Request, Response } from "express";
import { FormData } from "../models/model";
const sqlite3 = require("sqlite3").verbose();

//create inmemory database
const db = new sqlite3.Database(":memory:", (error: Error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Connection Successful");
  }
});
//creating table
db.run(
  "create table if not exists users (applicationStatus TEXT,registrationID TEXT, registrationDate TEXT, parentName TEXT,studentName TEXT, studentAge TEXT ,studentRegisterNumber TEXT,address TEXT,zipCode TEXT,city TEXT,state TEXT,country TEXT,emailAddress TEXT,primaryContactPerson TEXT,primaryContactMobile TEXT,secondaryContactPerson TEXT, secondaryContactMobile TEXT)"
);

const submitForm = (req: Request, res: Response) => {
  const form: FormData = req.body;
  let sql =
    "INSERT INTO users (applicationStatus, registrationID, registrationDate, parentName, studentName, studentAge, studentRegisterNumber, address, zipCode, city, state, country, emailAddress, primaryContactPerson, primaryContactMobile, secondaryContactPerson, secondaryContactMobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
  const requiredProps: Array<keyof FormData> = [
    "applicationStatus",
    "registrationID",
    "registrationDate",
    "parentName",
    "studentName",
    "studentAge",
    "studentRegisterNumber",
    "address",
    "zipCode",
    "city",
    "state",
    "country",
    "emailAddress",
    "primaryContactPerson",
    "primaryContactMobile",
    "secondaryContactPerson",
    "secondaryContactMobile",
  ];
  const missingProps = requiredProps.filter((prop) => !req.body[prop]);
  if (missingProps.length > 0) {
    const errorMessage = `Missing properties: ${missingProps.join(", ")}`;
    return res.status(400).json({ error: errorMessage });
  } else {
    db.run(
      sql,
      [
        form.applicationStatus,
        form.registrationID,
        form.registrationDate,
        form.parentName,
        form.studentName,
        form.studentAge,
        form.studentRegisterNumber,
        form.address,
        form.zipCode,
        form.city,
        form.state,
        form.country,
        form.emailAddress,
        form.primaryContactPerson,
        form.primaryContactMobile,
        form.secondaryContactPerson,
        form.secondaryContactMobile,
      ],
      function (err: Error) {
        if (err) {
          console.error(err.message);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).send("Form Submitted!");
        }
      }
    );
  }
};

const getForm = (req: Request, res: Response) => {
  const { id } = req.params;
  let sql = `SELECT * FROM users WHERE registrationID = ?`;
  

  db.get(sql, [id], (err: Error, row: FormData) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else if (!row) {
      console.log("User not found");
      res.status(404).send("User not found");
    } else {
      res.status(200);
      console.log(`found user with ${id}`);
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
};

const viewForms = (req: Request, res: Response) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (error: Error, rows: any) => {
    if (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    } else {
      const users = rows.map((row: FormData) => {
        return {
          applicationStatus: row.applicationStatus,
          registrationID: row.registrationID,
          registrationDate: row.registrationDate,
          parentName: row.parentName,
          studentName: row.studentName,
          studentAge: row.studentAge,
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
      res.json(users);
    }
  });
  console.log("View Forms function");
};

const updateForm = (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedForm: FormData = req.body;
  const sql =
    "UPDATE users SET applicationStatus = ?, registrationID = ?, parentName = ?, studentName = ?, studentRegisterNumber=?, address = ?, city = ?, zipCode = ?, country = ?, state = ?, emailAddress = ?, primaryContactPerson = ?, primaryContactMobile = ?, secondaryContactPerson = ?, secondaryContactMobile = ? WHERE registrationID = ?";
  const requiredProps: Array<keyof FormData> = [
      "parentName",
      "studentName",
      "studentRegisterNumber",
      "address",
      "zipCode",
      "city",
      "state",
      "country",
      "emailAddress",
      "primaryContactPerson",
      "primaryContactMobile",
      "secondaryContactPerson",
      "secondaryContactMobile",
    ];
    const missingProps = requiredProps.filter((prop) => !req.body[prop]);
    if (missingProps.length > 0) {
      const errorMessage = `Missing properties: ${missingProps.join(", ")}`;
      return res.status(400).json({ error: errorMessage });
    } else {
        
  db.run(
    sql,
    [
      updatedForm.applicationStatus,
      updatedForm.registrationID,
      updatedForm.parentName,
      updatedForm.studentName,
      updatedForm.studentRegisterNumber,
      updatedForm.address,
      updatedForm.city,
      updatedForm.zipCode,
      updatedForm.country,
      updatedForm.state,
      updatedForm.emailAddress,
      updatedForm.primaryContactPerson,
      updatedForm.primaryContactMobile,
      updatedForm.secondaryContactPerson,
      updatedForm.secondaryContactMobile,
      id,
    ],
    (err: Error, row: FormData) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
      } else if (row!) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send("User Updated!");
      }
    }
  );
    }
  

  console.log("calling edit form");
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
  getForm,
  updateForm,
};
