const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' })

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});