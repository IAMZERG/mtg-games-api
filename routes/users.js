var express = require('express');
var router = express.Router();
var AuthController = require("../controllers/authentication");
var passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  
/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.post('/api/v1/login', requireLogin, AuthController.login);
router.post('/api/v1/register', AuthController.register);
//router.post('/api/vl/request-reset', PasswordController.requestReset);
//router.post('/api/vl/complete-reset', PasswordController.completeReset);

module.exports = router;
