var express = require('express');
var router = express.Router();
var Game = require("./models").Game

router.param("gID", function(req, res, next, id) {
        Game.findById(id, function(err, doc) {
                if (err) return next(err);
                if (!doc) {
                        err = new Error("Not Found");
                        err.status = 404;
                        return next(err);
                }
                res.game = doc;
        });
});


/* GET home page

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

OMITTED FOR NOW */

/* GET game */

router.get('/games/:gID', function (req, res, next) {
        res.json(doc);
});
/* GET game containing card */

/* GET game with tag */

/*POST game */
/* PUT game */
/* DELETE game */

/* GET comments for game :id */
/* POST comment for game :id */

/* GET subcomments for :comment_id */
/* POST subcomment for :comment_id */
/* PUT subcomment for :comment_id */

/* DELETE comment/subcomment :id */



module.exports = router;
