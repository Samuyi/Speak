var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('lodash');

var Post = mongoose.model('Post')

router.use(function (req, res, next) {
    if (req.method === 'GET') {
        return next('route');
    }
    if (!req.isAuthenticated()) {
        return res.status(400).send('request forbidden');
    }
    return next()
});

router.route('/speak')
      .get(function (req, res) {
          user = req.user || false;
          Post.find(function(err, posts) {
             if (err) return res.send(500, 'there was an error');
             console.log(posts)
             res.render('speaks', {title: 'Speak', posts: posts, user: user}, function(err, html) {
                  console.log(err)
                 if (err) return res.status(500).send('there was an internal error!')
                return  res.status(200).send(html)
             } )
          });

      })
     .post(function (req, res) {
         var post = new Post();
         var text = req.body.text;
         post.username = req.body.username;
         post.post = text;
         post.save(function(err, post) {
            if (err) return res.send(500, 'there was an error while tryin to save');
            console.log(post)
            return res.send(post) 
         })
     });
router.route('/post/:id')
       .put(function (req, res) {
        if (!_.isNumber(req.params.id)) return res.send(400, 'wrong request parameter');
        Post.findById(req.params.id, function(err, post) {
            if(err) return res.send(500, 'there was an error!');
            if(!post) return res.send(404, 'post not found');

            post.username = req.params.created_by;
            post.text = req.params.text;

            post.save(function(err, post) {
                if(err) return res.send(500, 'there was an error while tryin to save')
                return res.send(200, post);
            })
        })
       })
       .get(function(req, res) {
           if (!_.isNumber(req.params.id)) return res.send(400, 'wrong request parameter');
           Post.findById(req.params.id, function(err, post) {
               if (err) return res.send(500, 'there was a server error');
               return res.send(200, post);
           })
       })
        .delete(function(req, res) {
            if (!_.isNumber(req.params.id)) return res.send(400, 'wrong request parameter');
            Post.remove(req.params.id, function(err, post) {
                if(err) return res.send(500, 'there was an internal server error while deleting');
                return res.send(200, 'post deleted')
            })
        })
    
module.exports = router;