const {auth, requiredScopes} = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

const checkScopes = requiredScopes('read:messages');

module.exports = {checkJwt, checkScopes};
