import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import osuAuthMiddleware from './middleware/osuAuth.js'; // Note the .js extension

// Load secrets from .env file
dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3000;

// Configure EJS as the templating engine
app.set('trust proxy', true);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), '../frontend/views/pages')); // Adjusted for ES module

// Middleware to attach osuAuthMiddleware
app.use(osuAuthMiddleware);

// Middleware for locals
app.use((req, res, next) => {
    res.locals.currentYear = new Date().getFullYear();
    res.locals.headerTitle = "shit osu! players";
    res.locals.socialLinks = {
        discord: "https://discord.gg/8peUKrkCTj",
        twitter: "https://x.com/shitosuplayers",
        youtube: "https://youtube.com/@shitosuplayers",
        instagram: "https://instagram.com/shitosuplayers",
        github: "https://github.com/shitosuplayers",
    };
    res.locals.email = "shitosuplayers@gmail.com";
    next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), '../frontend'))); // Adjusted for ES module

// Define routes using dynamic imports
const loadRoutes = async () => {
    const indexRouter = (await import('./routes/index.js')).default;
    const membersRouter = (await import('./routes/members.js')).default;
    const faqsRouter = (await import('./routes/faqs.js')).default;
    const knockoutRouter = (await import('./routes/knockout.js')).default;

    // Use the loaded routers
    app.use('/', indexRouter);
    app.use('/members', membersRouter);
    app.use('/faqs', faqsRouter);
    app.use('/knockout', knockoutRouter);
};

// Load the routes and then start the server
loadRoutes().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Error loading routes:', err);
});
