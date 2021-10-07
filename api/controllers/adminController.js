
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Player = require('../models/Player');
const bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
router.get('/doGetWholeUser', (req, res) => {
    User.find((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.get('/doGetWholePlayer', (req, res) => {
    Player.find().populate('team_id').then((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.post('/doGetWholeTeam', (req, res) => {
    User.find({ level: "teamowner" }).populate('parent_id').then((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.post('/doGetWholeLeague', (req, res) => {
    User.find({ level: "leaguemanager" }).then((err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

router.post('/setUserPermission', (req, res) => {
    const id = req.body.id;
    User.findOneAndUpdate({ id: id }, { 'permission': req.body.permission }, (err) => {
        res.json({ success: true });
    });
});

//!!!!!!!!!!!!!!!!!!!!!!PLAYER!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.post('/ChangePlayerTeam', (req, res) => {
    Player.findOneAndUpdate({ _id: req.body._id }, { team_id: req.body.teamid }, (err) => {
        res.json({ success: true });
    });
});

router.post('/UpdatePlayer', (req, res) => {
    console.log(req.body.price);
    Player.findOneAndUpdate({ _id: req.body._id }, { firstname: req.body.firstname, lastname: req.body.lastname, price: req.body.price }, (err) => {
        res.json({ success: true });
    });
});

router.post('/AddPlayer', (req, res) => {
    const player = new Player({ firstname: req.body.firstname, lastname: req.body.lastname, team_id: "615d21218bfe5e2d5c13c50b", price: req.body.price });

    player.save(function (err) {

        if (err) return console.log(err);
        return res.json({ success: true });
    });
});

router.post('/DeletePlayer', (req, res) => {
    console.log(req.body._id);
    Player.findOneAndRemove({ _id: req.body._id }).then(res.json({ success: true }));
});

//!!!!!!!!!!!!!!!!!!!!!!TEAMOWNER!!!!!!!!!!!!!!!!!!!!!!!!!!!

router.post('/ChangeTeamLeague', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, { parent_id: req.body.leagueid }, (err) => {
        res.json({ success: true });
    });
});

router.post('/UpgradeLeague', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, { level: "leaguemanager" }, (err) => {
        res.json({ success: true });
    });
});

router.post('/UpdateTeam', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, username: req.body.name }, (err) => {
        res.json({ success: true });
    });
});

router.post('/AddTeam', (req, res) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        const newPerson = new User({
            id: '0',
            username: req.body.username,
            password: '0',
            permission: true,
            level: "teamowner",
            parent_id: "615d21218bfe5e2d5c13c50b",
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

router.post('/DeleteTeam', (req, res) => {
    console.log(req.body._id);
    User.findOneAndRemove({ _id: req.body._id }).then(res.json({ success: true }));
});

//!!!!!!!!!!!!!!!!LEAGUE MANAGER!!!!!!!!!!!!!!!!

router.post('/AddLeague', (req, res) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        const newPerson = new User({
            id: '0',
            username: req.body.username,
            password: '0',
            permission: true,
            level: "leaguemanager",
            parent_id: "615d21218bfe5e2d5c13c50b",
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

router.post('/UpdateLeague', (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id }, { name: req.body.name, username: req.body.name }, (err) => {
        res.json({ success: true });
    });
});

router.post('/DeleteLeague', (req, res) => {
    console.log(req.body._id);
    User.findOneAndRemove({ _id: req.body._id }).then(res.json({ success: true }));
});
module.exports = router;