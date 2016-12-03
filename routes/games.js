const Game = require("../models").Game;


/* GET all games? */

module.exports.getGames = function(req, res, next) {
	console.log(req.user);
	Game.find({}, function(err, docs) {
		if (!err) {
			console.log(docs);
			res.json({games: docs});
		} else {
			throw err;
		}
	});
}

/* GET game */


module.exports.getGame = function (req, res, next) {
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

}


/* PUT game */

module.exports.putGame = function (req, res, next) {
	//using the doc object, update it from the information sent in the request

	Game.findById(req.params.gID, function(err, doc) {
		if (err) return next(err);
		if (!doc) {
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		} else {
			for(var key in req.body) {
				doc[key] = req.body[key];
			}
			doc.save(function (err) {
				if (err) {
					return err;
				} else {
					res.json(doc);
				}
			});
		}
	});
}


module.exports.newGame = function (req, res, next) {
	console.log(req.body.game);
	var newGame = new Game({
		decklist1: req.body.decklist1,
			decklist2: req.body.decklist2,
			comments: [{text: "This is a test", user: req.user.profile.firstName + " " + req.user.profile.lastName}]
	});
	newGame.save(function (err) {
		if (err) {
			return err;
		} else {
			res.json(newGame);
		}
	});
}


module.exports.deleteGame = function (req, res, next) {
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
}
