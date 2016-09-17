'use strict';
var express = require('express');
var router = express.Router();
var Game = require("../models").Game;

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
                        boardstates: [],  //normally, would put a before/after boardstate here.

                        subActions: []   //holds all actions related to casting a spell
                                         //e.g. cleaning up the board after a Wrath of God
                }],
                comments: [{text: "Ow." }]
});
/*
router.get("/", function (req,res, next) {
        console.log("Blablabla");
        next();
});
*/

/*
router.param("gID", function(req, res, next, id) {
        Game.findById(id, function(err, doc) {
                if (err) return next(err);
                if (!doc) {
                        err = new Error("Not Found");
                        err.status = 404;
                        return next(err);
                } else {
                        req.game = doc;
                        console.log(req.game);
                        next();
                }
        });
});
*/

/*

router.get('/', function(req, res, next) {
  Game.find({}, function(err, doc) {
          if (!doc) {
                  err = new Error("Not Found!");
                  err.status = 404;
                  return next(err);
          } else if (!err) {
                  res.json(doc);
          }
  });
});
*/

/* GET all games? */

router.get('/games/', function(req, res, next) {
        console.log("I'm in the games route");
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
        Game.findById(req.params.gID, function(err, doc) {
                if (err) return next(err);
                if (!doc) {
                        err = new Error("Not Found");
                        err.status = 404;
                        return next(err);
                } else {
                        res.json(doc);
                }
        });

});

router.put('/games/:gID/', function (req, res, next) {
        //using the doc object, update it from the information sent in the request

        Game.findById(req.params.gID, function(err, doc) {
                if (err) return next(err);
                if (!doc) {
                        err = new Error("Not Found");
                        err.status = 404;
                        return next(err);
                } else {
                        doc.save(function (err) {
                                if (err) {
                                        return err;
                                } else {
                                        doc = _.extend(doc, req.body);
                                        res.json(doc);
                                }
                        });
                }
        });
});

/* GET game containing card */

/* GET game with tag */

/*POST game */
// i.e. create new game

router.post('/games/new', function (req, res, next) {
        console.log(req.body.game);
        var newGame = new Game({
                decklist1: req.body.decklist1,
            decklist2: req.body.decklist2,
            comments: [{text: "This is a test"}]
        });
        newGame.save(function (err) {
                if (err) {
                        return err;
                } else {
                        res.json(newGame);
                }
        });
});
/* PUT game */
/* DELETE game */

router.delete('/games/:gID', function (req, res, next) {
        Game.findById(req.params.gID, function(err, doc) {
                if (err) return next(err);
                if (!doc) {
                        err = new Error("Not Found");
                        err.status = 404;
                        return next(err);
                } else {
                        doc.remove(function () {
                                doc.save(function () {
                                        if (err) return err;
                                        res.json(doc);
                                });
                        });
                }
        });
});

/* GET comments for game :id */
/* POST comment for game :id */

/* GET subcomments for :comment_id */
/* POST subcomment for :comment_id */
/* PUT subcomment for :comment_id */

/* DELETE comment/subcomment :id */



module.exports = router;
