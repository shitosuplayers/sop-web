const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "shit osu! players",
        headerTitle: "shit osu! players",
    });

});

module.exports = router;
