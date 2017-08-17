var express = require('express');
var router = express.Router();


router.route('/')
    .get(function (req, res) {
        if (req.isAuthenticate) {
        res.render('index', {title: 'Speak',  user: req.user }, function (err, html) {
            if (err) return res.send(500, err);
            //console.log(html)
            return res.send(html);
        });
        }
        res.render('index', { title: 'Speak', user: false }, function (err, html) {
            if (err) return res.status(500).send('there was an internal server error');
            console.log('here')
            return res.status(200).send(html);
        });
    })
router.route('/login')
      .get(function (req, res) {
         res.render('login', {title: 'Login', user: false}, function(err, html) {
              console.log(err)
             if (err) return res.status(500).send(err);
             return res.status(200).send(html);
         })
    });
router.route('/about')
      .get(function(req, res) {
          user = req.user || false
          res.render('About', {title: 'About', user: user}, function(err, html) {
              if (err) return res.status(500).send('sorry there was an error!');
              return res.status(200).send(html);
          })
      });
router.route('/register')
    .get(function (req, res) {
        res.render('Register', {title: 'Register', user: false}, function(err, html) {
            if (err) return res.status(500).send('There was an internal error on the server');
            return res.status(200).send(html);
        });
    });

    


    module.exports = router;