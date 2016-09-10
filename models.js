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

module.exports.Game = Game;
