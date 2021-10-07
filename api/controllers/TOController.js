
const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const User = require('../models/User');

router.post('/GetOfferCnt', (req, res) => {
    let cnt = 0;
    Player.find({ status: "market", team_id: req.body._id }).populate('team_id').populate('offered').then((data) => {
        console.log(data);
        data && data.map(data => {
            cnt += data.offered.length;
        })
        console.log(cnt);
        res.json(cnt);
    });
});

router.post('/GetUser', (req, res) => {
    User.findOne({ _id: req.body._id }).then((data) => {
        return res.json(data);
    });
});

router.post('/GetPlayer', (req, res) => {

    if (req.body.type === 0) {
        Player.find({ team_id: req.body._id }).populate('team_id').populate('offered').then((data) => {
            return res.send(data);
        });
    }
    else if (req.body.type === 1)
        Player.find({
            $and: [
                { status: "market" },
                {
                    $or: [
                        { firstname: new RegExp(req.body.criteria) },
                        { lastname: new RegExp(req.body.criteria) },
                        { country: new RegExp(req.body.criteria) },
                    ]
                }

            ]
        }).populate('team_id').populate('offered').then((data) => {
            console.log(req.body.criteria);
            return res.send(data);
        });
    else {
        Player.find({ status: "market", team_id: req.body._id }).populate('team_id').populate('offered').then((data) => {
            return res.send(data);
        });
    }
});

router.post('/UpdatePlayer', (req, res) => {
    Player.findOneAndUpdate({ _id: req.body._id }, { firstname: req.body.firstname, lastname: req.body.lastname, country: req.body.country, sellmoney: req.body.sellmoney }, (err) => {
        res.json({ success: true });
    });
});

router.post('/ChangeStatus', (req, res) => {
    if (req.body.value === "team") {
        Player.findOneAndUpdate({ _id: req.body._id }, { status: req.body.value, offered: [] }, (err) => {
            res.json({ success: true });
        });
    }
    else
        Player.findOneAndUpdate({ _id: req.body._id }, { status: req.body.value }, (err) => {
            res.json({ success: true });
        });
});

router.post('/OfferPlayer', (req, res) => {
    Player.findOne({ _id: req.body.playerid }).then(data => {
        data.offered.push(req.body.teamid);
        Player.findOneAndUpdate({ _id: req.body.playerid }, { offered: data.offered }, (err) => {
            res.json({ success: true });
        });
    });

});

router.post('/StopOffer', (req, res) => {
    Player.findOne({ _id: req.body.playerid }).then(data => {
        const i = data.offered.indexOf(req.body.teamid);
        data.offered.splice(i, 1);
        Player.findOneAndUpdate({ _id: req.body.playerid }, { offered: data.offered }, (err) => {
            res.json({ success: true });
        });
    });
});

router.post('/AcceptTerm', (req, res) => {
    Player.findOne({ _id: req.body.playerid }).then(data => {
        let sm = data.sellmoney;
        User.findOne({ _id: req.body.teamid1 }).then(d => {
            User.findOneAndUpdate({ _id: req.body.teamid1 }, { money: d.money + sm }).then();
        })
        Player.findOneAndUpdate({ _id: req.body.playerid }, { price: data.price * 1.6, offered: [], team_id: req.body.teamid, status: "team" }).then();
        User.findOne({ _id: req.body.teamid }).then(d => {
            User.findOneAndUpdate({ _id: req.body.teamid }, { money: d.money - sm }).then(data => { res.json({ success: true }) });
        })
    });
});

module.exports = router;