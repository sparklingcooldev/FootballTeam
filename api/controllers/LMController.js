
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

router.post('/AddTeam', (req, res) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        const newPerson = new User({
            id: '0',
            username: req.body.username,
            password: '0',
            permission: true,
            level: "teamowner",
            parent_id: req.body._id,
            name: req.body.username
        });

        bcrypt.hash(req.body.password, salt, function (err, hash) {
            if (err) return next(err);

            newPerson.password = hash;
            newPerson.save().then((added) => {
                User.findByIdAndUpdate(added._id, { 'id': added._id }, (err) => {
                    res.json({ success: true });
                });
            })
        });
    });
});

router.post('/UpdateTeam', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, username: req.body.name }, (err) => {
        res.json({ success: true });
    });
});

router.post('/GetTeam', (req, res) => {
    console.log(req.body._id);
    User.find({ parent_id: req.body._id }, (err, data) => {
        console.log(data);
        res.json(data);
    });
});

router.post('/DeleteTeam', (req, res) => {
    console.log(req.body._id);
    User.findOneAndRemove({ _id: req.body._id }).then(res.json({ success: true }));
});
module.exports = router;