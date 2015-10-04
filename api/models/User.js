var bcrypt = require('bcrypt');
module.exports = {
  attributes: {
    email     : { 
      type: 'email',  
      unique: true,
      required: true
    },
    firstName : {
      required: true,
      type : 'string'
    },
    lastName : {
      required: true,
      type : 'string'
    },
    username: {
      required: true,
      type: 'string'
    },
    password: {
      required: true,
      type: 'string'
    },
    gender : {
      type : 'string',
      in : ['male','female']
    },
    birthDate : {
      type : 'date'
    },
    phone: {
      type: 'string'
    },
    title: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                console.log(err);
                cb(err);
            } else {
                user.password = hash;
                cb();
            }
        });
    });
  }
};

