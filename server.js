const express = require('express');
const app = express();
const PORT = 3000;

app.get('/test-api', (req, res) => {
    res.json({ message: 'Server is working!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
