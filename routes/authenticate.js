var express = require('express');
var router = express.Router();


module.exports = function (passport) {
    router.get('/success', function (req, res) {
            console.log(req.user)
            res.status(200).send('success')
            
    
    });
    router.get('/failure', function (req, res) {
        return res.json({state: 'failure', user: null, message: 'invalid password or username'});
    });
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/')
    })
    return router;
}