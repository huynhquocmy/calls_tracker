
var bunyan = require('bunyan');
var _log = bunyan.createLogger({name: 'calls-tracker'});
module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
    	_log.info("line 12");
        return res.redirect('/login');
    }
};