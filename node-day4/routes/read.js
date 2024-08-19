const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/data.json');

const getData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

router.get('/records', (req, res) => {
    const data = getData();
    res.json(data);
});

module.exports = router;
