/**
 * Modules
 */
var assert = require('assert');
var discourse = require('..');
var sso = discourse.sso;
var middleware = discourse.middleware
var querystring = require('querystring');
var crypto = require('crypto');


/**
 * Vars
 */
var noop = function(){};

describe('sso', function() {
  var sign, nonce, email, external_id, username;
  beforeEach(function() {
    sign = sso('fat tio');
    nonce = Math.random();
    email = 'tio@weo.io';
    external_id = 1;
    username = 'tio';
  });
  


  it('should sign login info', function() {
    var signed = sign({
      email: email,
      external_id: external_id
    }, sign.payload({nonce: nonce}));

    var payload = sign.payload(signed.sso, signed.sig);
    assert.equal(payload.email, email);
    assert.equal(payload.external_id, external_id);
    assert.equal(payload.nonce, nonce);

  });

  it('should throw error if not signed properly', function() {
    assert.throws(function() {
      sign({
        email: email,
        external_id: external_id
      }, invalidPayloadSign({nonce: nonce}));
    },
    function(err) {
      if ((err instanceof Error) && err.message === 'Invalid signature')
        return true;
    });

    function invalidPayloadSign(payload) {
      var newPayload = new Buffer( querystring.stringify(payload) , 'utf8').toString("base64");
      var hmac = crypto.createHmac('sha256', 'skinny tio');
      hmac.update(newPayload);
      return {
        'sso': newPayload,
        'sig': hmac.digest('hex')
      };
    }
  });

  describe('middleware', function() {
    it('should add signed payload to request', function() {
      var signM = middleware('fat tio');
      var payload = sign.payload({nonce: nonce});

      var req = {
        user: {
          email: email,
          username: username,
          external_id: 1,
        },
        param: function(param) {
          if (param === 'sso')
            return payload.sso;
          if (param === 'sig')
            return payload.sig;
        }
      };

      signM(req, {}, noop);

      assert(req.discourse);


    });
  });

});

