var passport = require('passport');
var bunyan = require('bunyan');
var _log = bunyan.createLogger({name: 'calls-tracker'});
module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function (req, res) {
      res.view("index");
    },

    signup: function (req, res) {
      res.view("index");
    },

    isAuthenticated: function (req, res, next) {
       if (req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect('/login');
        }
    },

    authenticate: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.redirect('/login');
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.redirect("/users/"+user.id+"/overview");
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/login');
    }
};