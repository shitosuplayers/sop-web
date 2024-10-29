const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load secrets from .env file
dotenv.config({ path: '../.env' })

const indexRouter = require('./routes/index');
const membersRouter = require('./routes/members');
const faqsRouter = require('./routes/faqs');
const knockoutRouter = require('./routes/knockout');

const app = express();
const port = process.env.PORT || 3000;

// Configure EJS as the templating engine
app.set('trust proxy', true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../frontend/views/pages'));

app.use((req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
    res.locals.headerTitle = "shit osu! players";
    res.locals.socialLinks = {
        discord: "https://discord.gg/8peUKrkCTj",
        twitter: "https://x.com/shitosuplayers",
        youtube: "https://youtube.com/@shitosuplayers",
        instagram: "https://instagram.com/shitosuplayers",
        github: "https://github.com/shitosuplayers",
    },
    res.locals.email = "shitosuplayers@gmail.com",
    next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Define routes
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/faqs', faqsRouter);
app.use('/knockout', knockoutRouter);

// Run the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});