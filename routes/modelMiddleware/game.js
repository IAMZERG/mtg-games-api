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
