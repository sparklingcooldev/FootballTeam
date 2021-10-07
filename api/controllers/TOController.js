
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.post('/GetPlayer', (req, res) => {
    if (req.body.type === 0) {
        Player.find({ team_id: req.body._id }).populate('team_id').then((err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
    else
        Player.find({ team_id: { $ne: req.body._id } }).populate('team_id').then((err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
});
module.exports = router;