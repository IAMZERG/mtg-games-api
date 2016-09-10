var express = require('express');
var router = express.Router();
var Game = require("../models").Game

var game = new Game({
        decklist1: [{name: "Island", quantity: 60}],
                decklist2: [{name: "Forest", quantity: 60}],
                sideboard1: [{name: "Counterspell", quantity: 4}],
                sideboard2: [{name: "Counterspell", quantity: 4}],
                winner: 1,
                boardstates: [
                {
                        theStack: [
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1},
                        {name: "Grapeshot", quantity: 1} ],
                        p1Library: [],
                        p2Library: [],
                        p1Hand: [],
                        p2Hand: [],
                        p1Graveyard: [],
                        p2Graveyard: [],
                        p1Battlefield: [],
                        p2Battlefield: [],
                        p1Exile: [],
                        p2Exile: [],
                        p1Life: 20,
                        p2Life: 20 
                } ],
                actions: [
                {
                        player: 1,
                        turn: 1,
                        description: "First turn kill (this is a test action)",
                        cardName: "Grapeshot",
                        zoneTo: "theStack",
                        zoneFrom: "p1Hand",
                        boardstate: [],  //normally, would put a before/after boardstate here.

                        subActions: []   //holds all actions related to casting a spell
                                         //e.g. cleaning up the board after a Wrath of God
                }],
                comments: [{text: "Ow.", subComments: [{text: "Yup!", userName: "Mike"}] }]
});
                        
                



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




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all games? */
router.get('/games/', function(req, res, next) {
        Game.find({}, function(err, docs) {
                if (!err) {
                        console.log(docs);
                        res.json(docs);
                } else {
                        throw err;
                }
        });
});

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
