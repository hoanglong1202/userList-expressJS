var express = require('express');
var router = express.Router();
module.exports = router;

var db = require('../db');
const shortid = require('shortid');

router.get('/', function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

router.get('/search', function (req, res) {
    var q = req.query.q;
    var usersList = db.get('users').value();
    var matchUsers = usersList.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchUsers
    });
});

router.get('/create', function (req, res) {
    res.render('users/create')
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    var user = db.get('users').find({id: id}).value();

    res.render('users/view', {
        user: user
    });
});

router.get('/:id/delete', function (req, res) {
    var id = req.params.id;
    var user = db.get('users').remove({id: id}).write();;

    res.render('users/delete');
});

router.post('/create', function (req, res) {
    req.body.id = shortid.generate();
    db.get('users')
        .push(req.body)
        .write();
    res.redirect('/');
});