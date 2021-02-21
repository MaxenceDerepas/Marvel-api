const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../Models/User");

router.post("/user/signup", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.fields.email });

        if (!user) {
            if (
                req.fields.email &&
                req.fields.username &&
                req.fields.password
            ) {
                const salt = uid2(64);
                const token = uid2(64);
                const hash = SHA256(req.fields.password + salt).toString(
                    encBase64
                );

                const newUser = new User({
                    email: req.fields.email,
                    username: req.fields.username,
                    favoriteCharacters: [],
                    favoriteComics: [],
                    token: token,
                    hash: hash,
                    salt: salt,
                });
                await newUser.save();

                res.status(200).json({
                    _id: newUser._id,
                    token: newUser.token,
                    message: "Compte créé avec succès !!!",
                });
            } else {
                res.status(400).json({
                    message: "please enter email, username and password ",
                });
            }
        } else {
            res.status(400).json({ message: "email already exist" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/user/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.fields.email });

        if (user) {
            const password = req.fields.password;
            const newHash = SHA256(password + user.salt).toString(encBase64);

            if (newHash === user.hash) {
                res.json({
                    _id: user._id,
                    token: user.token,
                    favoriteCharacters: user.favoriteCharacters,
                    favoriteComics: user.favoriteComics,
                    message: "Vous êtes connecté",
                });
            } else {
                res.json({
                    message: "email ou mot de pass incorrect",
                });
            }
        } else {
            res.json({ message: "email ou mot de pass incorrect" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
