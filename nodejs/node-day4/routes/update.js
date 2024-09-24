const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataPath = path.join(__dirname, '../data/data.json');

const getData = () => JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

const saveData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

router.put('/records/:id', (req, res) => {
    const data = getData();
    const updatedRecord = req.body;
    const recordIndex = data.findIndex(record => record.id == req.params.id);

    if (recordIndex !== -1) {
        updatedRecord.id = data[recordIndex].id;

        data[recordIndex] = { ...data[recordIndex], ...updatedRecord };
        saveData(data);
        res.json(data[recordIndex]);
    } else {
        res.status(404).json({ error: 'Record not found' });
    }
});

module.exports = router;
