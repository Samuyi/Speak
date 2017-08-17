var LocalStrategey = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');


var User = mongoose.model('User');
var User = mongoose.model('User');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        console.log('serializing user:', user._id);
       return  done(null, user._id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id,function (err, user) {
            if(err) return done(err, false);
            if(!user) return done('user not found', false);
            return done(null, user);
        });
    });

    passport.use('login', new LocalStrategey({
          passReqToCallcack: true
    },
        function (username, password, done) {
            console.log(typeof(username));
            User.findOne({ username: username }).exec(function (err, user) {
                if (err) return done(err, false);
                console.log(user)
                if (!user) return done('username does not exist', false);
                if (!isValidPassword(user, password)) {
                    return done('password doesn\'t match this username', false);
                }
                console.log(user);

                return done(null, user);
            });
        }
    ));
    passport.use('signup', new LocalStrategey({
        passReqToCallcack: true
    },
    function (username, password, done) {
          User.findOne({username: username}, function (err, user) {
              if(err) return done(err, false);
              if(user) return done('username taken already', false);
        
              var user = new User();
              user.username = username;
              user.password = createHash(password);

              user.save(function (err, user) {
                  if (err) return done(err, false);
                  console.log(user)
                  return done(null, user);
              })
          })
    }
));
};

const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
};

const createHash = function (password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
