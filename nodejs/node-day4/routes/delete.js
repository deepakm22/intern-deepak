const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/data.json');

const getData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

router.delete('/records/:id', (req, res) => {
    let data = getData();
    data = data.filter(record => record.id != req.params.id);
    saveData(data);
    res.json({ success: true });
});

module.exports = router;
