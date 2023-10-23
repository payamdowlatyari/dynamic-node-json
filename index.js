const express = require("express");
const app = express();
app.use(express.json());

const fs = require('fs');
const data = fs.readFileSync('question.json');
const items = JSON.parse(data);

// To solve the cors issue
const cors = require('cors');
app.use(express.static('public'));
app.use(cors({
    origin: ["*"],
    methods: ["POST","GET"],
    credentials: true,
    content: 'application/json'
}));

// GET request
app.get('/api/items', (req, res) => {
    res.send(items);
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

