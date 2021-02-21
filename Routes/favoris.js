const express = require("express");
const router = express.Router();

const User = require("../Models/User");

router.post("/addFavoriteCharacters", async (req, res) => {
    try {
        const user = await User.findById(req.fields.id);

        let counter = 0;
        for (let i = 0; i < user.favoriteCharacters.length; i++) {
            if (user.favoriteCharacters[i].id === req.fields._id) {
                counter++;
                break;
            }
        }
        if (counter === 0) {
            user.favoriteCharacters.push({
                img: req.fields.img,
                name: req.fields.name,
                description: req.fields.description,
                id: req.fields._id,
            });

            await user.save();
            res.status(200).json(user);
        } else {
            let num;

            for (let i = 0; i < user.favoriteCharacters.length; i++) {
                if (user.favoriteCharacters[i].id === req.fields._id) {
                    num = i;
                }
            }
            user.favoriteCharacters.splice(num, 1);
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error.message);
        res.json({ message: "erreur" });
    }
});

router.post("/addFavoriteComics", async (req, res) => {
    try {
        const user = await User.findById(req.fields.id);

        let counter = 0;
        for (let i = 0; i < user.favoriteComics.length; i++) {
            if (user.favoriteComics[i].id === req.fields._id) {
                counter++;
                break;
            }
        }

        if (counter === 0) {
            user.favoriteComics.push({
                img: req.fields.img,
                title: req.fields.title,
                description: req.fields.description,
                id: req.fields._id,
            });
            await user.save();
            res.status(200).json(user);
        } else {
            let num;

            for (let i = 0; i < user.favoriteComics.length; i++) {
                if (user.favoriteComics[i].id === req.fields._id) {
                    num = i;
                }
            }
            user.favoriteComics.splice(num, 1);
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

router.get("/favorite", async (req, res) => {
    try {
        const user = await User.findById(req.query.id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
