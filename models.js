'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CardSchema = new Schema({
        name: String,
    quantity: Number
});

var BoardstateSchema = new Schema({
        theStack: [cards],
    p1Library: [cards],
    p1Hand: [cards],
    p1Graveyard: [cards],
    p1Exile: [cards],
    p1Battlefield: [cards],
    p1Life: Number,

    p2Library: [cards],
    p2Hand: [cards],
    p2Graveyard: [cards],
    p2Exile: [cards],
    p2Battlefield: [cards],
    p2Life: Number
});

var CommentSchema  = new Schema({
        createdAt: {type: Date, default: Date.now},
    userName: {type: String, default: "Bob"},
    text: String,
    subComments: [comment]
});

var ActionSchema = new Schema({
        player: Number,
    turn: Number,
    description: String,
    cardName: String,
    zoneTo: String,
    zoneFrom: String,
    boardstate: [boardstate],  //yeah... this is a crummy hack
    subActions: [action]
});

var GameSchema = new Schema({
        decklist1: [cards],
    decklist2: [cards],
    sideboard1: [cards],
    sideboard2: [cards],
    winner: Number,
    boardstates: [boardstate],
    actions: [action],
    comments: [comment]
});


var Game - mongoose.model("Game", GameSchema);

module.exports.Game = Game;
