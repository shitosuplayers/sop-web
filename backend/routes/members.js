const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("members", {
        title: "Members",
        headerTitle: "Members",
    });
});

module.exports = router;
