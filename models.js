'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CardSchema = new Schema({
        name: String,
    quantity: Number
});

var BoardstateSchema = new Schema({
        theStack: [CardSchema],
    p1Library: [CardSchema],
    p1Hand: [CardSchema],
    p1Graveyard: [CardSchema],
    p1Exile: [CardSchema],
    p1Battlefield: [CardSchema],
    p1Life: Number,

    p2Library: [CardSchema],
    p2Hand: [CardSchema],
    p2Graveyard: [CardSchema],
    p2Exile: [CardSchema],
    p2Battlefield: [CardSchema],
    p2Life: Number
});

var CommentSchema  = new Schema({
        createdAt: {type: Date, default: Date.now},
    userName: {type: String, default: "Bob"},
    text: String,
    subComments: [{ type: mongoose.Types.ObjectId, ref: 'CommentSchema'}]
});

var ActionSchema = new Schema({
        player: Number,
    turn: Number,
    description: String,
    cardName: String,
    zoneTo: String,
    zoneFrom: String,
    boardstate: [BoardstateSchema],  //yeah... this is a crummy hack
    subActions: [{ type: mongoose.Types.ObjectId, ref: 'ActionSchema'}]
    
});

var GameSchema = new Schema({
        decklist1: [CardSchema],
    decklist2: [CardSchema],
    sideboard1: [CardSchema],
    sideboard2: [CardSchema],
    winner: Number,
    boardstates: [BoardstateSchema],
    actions: [ActionSchema],
    comments: [CommentSchema]
});


var Game = mongoose.model("Game", GameSchema);

var UserSchema = new Schema({
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
		password: {
			type: String, required: true 
		},
		profile: { 
			firstName: {type: String}, 
		lastName: {type: String }
		},
		role: { 
			type: String, enum: ['Member', 'Client', 'Owner', 'Admin'],
			default: 'Owner'
		},
		resetPasswordToken: {type: String },
		resetPasswordExpires: {type: Date }
},
{
		timestamps: true
});

UserSchema.pre("save", function(next) {
	var user = this;
	var SALT_FACTOR = 10;
	if (!user.isModified('password')) return next();
	var salt = bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			user.password = hash;
			user.password.save(function (err) {
				if (err) {
					return next(err);
				} else {
					return next();
				}
			});
		});
	});
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, hash) {
		if (err) { return cb(err); }

		cb(null, isMatch);
	});
};

var User = mongoose.model("User", UserSchema);

module.exports.Game = Game;
module.exports.User = User;
