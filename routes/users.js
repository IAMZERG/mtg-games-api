var express = require('express');
var router = express.Router();
var AuthController = require("../controllers/authentication");

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;
