import { Request, Response } from "express";

const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// app.use(cors());
// const corsOptions ={
//   origin:'http://localhost:3001', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));


app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "Hello from Express!" });
  });



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});