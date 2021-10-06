
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require("../../config/keys");

const Pellet = require('../models/Pellet');
const PelletTypes = require('../models/PelletTypes');

router.get('/doGetWholePellet', (req, res) => {
    Pellet.find((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.get('/doGetWholePelletTypes', (req, res) => {
    let total = []
    PelletTypes.find((err, types) => {
        if (err) return res.json(err);
        types.forEach((each, i) => {
            Pellet.aggregate([
                { $match: { pellet_type: each.id } },
                {
                    $lookup: {
                        from: "pellet_types",
                        localField: "pellet_type",
                        foreignField: "id",
                        as: "pellet_info"
                    },
                },
            ], (err, data) => {
                total.push(data)
                if (i === types.length - 1)
                    res.json(total)
            })
        })
    });
});

module.exports = router;