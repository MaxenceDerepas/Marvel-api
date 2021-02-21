const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../Models/User");

router.get("/character", async (req, res) => {
    try {
        const skip = Number(req.query.limit) * Number(req.query.skip);

        const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${req.query.limit}&skip=${skip}&name=${req.query.name}`
        );
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

router.get("/user/characters", async (req, res) => {
    try {
        const user = await User.findById(req.query.id);
        res.status(200).json(user.favoriteCharacters);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: "" });
    }
});

module.exports = router;
