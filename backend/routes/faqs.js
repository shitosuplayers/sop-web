import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
    res.render("faqs", {
        title: "FAQs",
        headerTitle: "FAQs",
    });

});

export default router;
