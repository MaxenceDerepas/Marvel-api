const mongoose = require("mongoose");

const User = mongoose.model("User", {
    email: {
        unique: true,
        type: String,
    },
    username: {
        type: String,
    },
    favoriteCharacters: [Object],
    favoriteComics: [Object],

    token: String,
    hash: String,
    salt: String,
});

module.exports = User;
