// routes/index.js
import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "shit osu! players",
        headerTitle: "shit osu! players",
    });
});

export default router; // Export the router
