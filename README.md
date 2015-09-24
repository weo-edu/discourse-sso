# Discourse sso

[![version](https://img.shields.io/npm/v/sso-discourse.svg?style=flat-square)](https://www.npmjs.com/package/sso-discourse) [![Codeship Status for weo-edu/sso-discourse](https://img.shields.io/codeship/5b259310-a5bb-0132-f089-42192025a880/master.svg)](https://codeship.com/projects/66828) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Middleware and library for discourse sso;

## Installation

```
$ npm install sso-discourse
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
