# Discourse sso

Middleware and library for discourse sso;

## Installation

```
$ npm install discourse-sso
```

## API

### .sso(secretKey)

Returns a function for signing login info.

```js
var discourseSso = require('discourse-sso');
var sign = discourseSso.sso('fat tio');

// {sso: discourse_reply_payload, sig: discourse_reply_sig}
var signed = sign({
  email: email,
  external_id: external_id
}, {sso: discourse_payload, sig: discourse_sig});

```

### .middleware(secretKey)

Returns middleware for adding a signed payload to the request. Expects the request to have login info at `req.user` and puts the payload at `req.discourse`.

```js
var discourse = discourseSso.middleware('fat tio');

app.get('/sso', getUser, discourse, function(req, res) {
  res.send(req.discourse);
});

```