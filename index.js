/**
 * Modules
 */
var crypto 		= require("crypto");
var	querystring = require("querystring");

/**
 * Exports
 */
module.exports = sso;

/**
 * Creates a login signer for a given secret
 * 
 * @param  {string} secret 
 * @return {function}       
 */
function sso(secret) {

	return signedLoginOptions;

	/**
	 * Signs login information
	 * 
	 * @param  {object} login   login options: email, external_id, username, name
	 * @param  {object} options signature options
	 * @return {object}         signed login info
	 */
	function signedLoginOptions(login, options) {
		var paylod = options.sso;
		var sig = options.sig;

		validate(payload, sig);
		login.nonce = getNonce(payload);
		return signedPayload(login);
	}

	function getHmac() {
		return crypto.getHmac('sha256', secret);
	}

	function validate(payload, sig) {
		var hmac = getHmac();
		hmac.update(querystring.unescape(payload));
		if(hmac.digest("hex") === sig) {
			return true;
		} else {
			throw new Error('Invalid signature');
		}
	}


	function getNonce(payload) {
		var q = querystring.parse(
			new Buffer( querystring.unescape(payload) , 'base64').toString()
		);

		return q.nonce || throw new Exception("Missing Nonce in payload!");
	}

	function signPayload(payload) {
		var newPayload = new Buffer( querystring.stringify(payload) , 'utf8').toString("base64");
		var hmac = getHmac();
		hmac.update(newPayload);
		return {
			'sso': newPayload,
			'sig': hmac.digest('hex')
		};
	}
}

	

