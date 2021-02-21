const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const formidable = require("express-formidable");
app.use(formidable());
require("dotenv").config();

const comicsRoute = require("./Routes/comics");
const characterRoute = require("./Routes/character");
const userRoute = require("./Routes/user");
const favorisRoute = require("./Routes/favoris");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.use(comicsRoute);
app.use(characterRoute);
app.use(userRoute);
app.use(favorisRoute);

app.all("*", (req, res) => {
    res.json({ message: "not found" });
});

app.listen(process.env.PORT, () => {
    console.log("Server has started");
});
