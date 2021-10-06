
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const keys = require("../../config/keys");

const User = require('../models/User');

var SALT_WORK_FACTOR = 10;

router.get('/getData', (req, res) => {
    User.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/doRegisterUser', (req, res) => {
    console.log(req.body);
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        const newPerson = new User({
            id: '0',
            username: req.body.username,
            password: '0',
            permission: true,
            level: 0,
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

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    User.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/doBlockUser', (req, res) => {
    const name = req.body.name;
    console.log(name);
    User.findOneAndUpdate({ username: name }, { 'permission': false }, (err) => {
        res.json({ success: true });
    });
});

router.post('/doLoginUser', (req, res) => {
    User.findOne({ username: req.body.username }).then((data) => {
        if (!data) return res.json({ status: 'no user' });
        else {
            if (!data.permission) return res.json({ status: 'waiting for permission' });
            else {
                bcrypt.compare(req.body.password, data.password).then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: data._id,
                            username: req.body.username,
                            password: req.body.password,
                            level: data.level
                        };

                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                return res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        );
                    } else {
                        return res.json({ status: "password incorrect" });
                    }
                });
            }
        }
    });
});

module.exports = router;