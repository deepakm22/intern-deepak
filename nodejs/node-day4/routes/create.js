const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/data.json');

const getData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

router.post('/records', (req, res) => {
    const data = getData();
    const newRecord = req.body;

    if (data.find(record => record.id === newRecord.id)) {
        return res.status(400).json({ error: 'ID already exists' });
    }

    data.push(newRecord);
    saveData(data);
    res.json(newRecord);
});

module.exports = router;
