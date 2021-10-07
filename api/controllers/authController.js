
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require("../../config/keys");
const nodemailer = require("../../config/nodemailer.config");

const User = require('../models/User');

const tokenList = {}
var SALT_WORK_FACTOR = 10;

router.get('/getData', (req, res) => {
    User.find()
        .then((err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: data })
        });
});

router.post('/doRegisterUser', (req, res) => {
    const token = jwt.sign({ email: req.body.email }, config.secret);
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        const newPerson = new User({
            id: '0',
            username: req.body.username,
            password: '0',
            permission: true,
            level: 0,
            money: 5000000,
            confirmationCode: token,
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
    User.findOne({ username: req.body.username }).populate('wanted.player_id')
        .populate('wanted.team_id').populate('offered.player_id')
        .populate('offered.team_id').then((data) => {
            if (!data) return res.json({ status: 'no user' });
            else {
                if (!data.permission) return res.json({ status: 'waiting for permission' });
                else {
                    bcrypt.compare(req.body.password, data.password).then(isMatch => {
                        if (isMatch) {
                            const user = {
                                id: data._id,
                                username: req.body.username,
                                password: req.body.password,
                                level: data.level,
                                wanted: data.wanted,
                                offered: data.offered,
                                money: data.money,
                            };
                            const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
                            const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife })
                            const response = {
                                success: true,
                                token: "Bearer " + token,
                                refreshToken: refreshToken,
                            }
                            tokenList[refreshToken] = response
                            res.status(200).json(response);
                        } else {
                            return res.json({ status: "password incorrect" });
                        }
                    });
                }
            }
        });
});
router.post('/token', (req, res) => {
    // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            id: data._id,
            username: req.body.username,
            password: req.body.password,
            level: data.level
        };
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife })
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
})
module.exports = router;