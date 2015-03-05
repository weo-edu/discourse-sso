/**
 * Modules
 */

var sso = require('./sso');

/**
 * Middleware that adds discourse options to req when sso and sig are detected on req
 * 
 * @param  {string} discourse secret
 */
module.exports = function(secret) {
  var sign = sso(secret);

  return function(req, res, next) {
    var sso = req.param('sso');
    var sig = req.param('sig');
    if (sso && sig) {
      var user = req.user;
      req.discourse = sign({
        username: user.username, 
        email: user.email, 
        external_id: user.id}, {
        sso: sso,
        sig: sig
      });
    }
    next();
  };
};