

module.exports = {
  create : function (params, cb) {

    if (!params.email) {
      return cb(new Error({ code : 'Error.Passport.Email.Missing', message : 'No email was entered.'}));
    }

    if (!params.password) {
      return cb(new Error({message : 'No password was entered.', code : 'Error.Passport.Password.Missing'}));
    }

    var user = _.assign({}, params);

    User.create(user, function (err, user) {
      if (err) {
        if (err.code === 'E_VALIDATION') {
          if (err.invalidAttributes.email) {
            sails.log.error('Error.Passport.Email.Exists');
          } else {
            sails.log.error('Error.Passport.User.Exists');
          }
        }        
        return cb(err);
      } else {
        cb(null, user);
      }
    });
  },

  login: function (params, cb) {
    User.findOne({email: params.email, password: params.password}, function(err, user) {
      if (err) {
        cb(err);
      } else {
        cb(null, user);
      }
    })
  },

  getUserById: function (userId, cb) {
    User.findOne({id: userId}, function(err, user) {
      if (err) {
        cb(err);
      } else {
        cb(null, user);
      }
    })
  }
}