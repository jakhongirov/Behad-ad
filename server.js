require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
const { PORT } = require("./src/config");
const router = require("./src/modules");

app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use("/api/v1", router);

app.listen(PORT, console.log(PORT));