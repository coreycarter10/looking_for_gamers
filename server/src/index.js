require("dotenv").config();
const migration = require("../db/seed");
const express = require("express");
const cors = require("cors");
const app = express();

const ctrl = require("./controller.js");

app.use(express.json());
app.use(cors());

app.listen(4545, () => console.log(`Server running on port 4545`));
