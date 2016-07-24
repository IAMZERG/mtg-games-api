DROP DATABASE IF EXISTS mtg_games;
CREATE DATABASE mtg_games;

\c mtg_games;

CREATE TABLE boardstates (
        ID SERIAL PRIMARY KEY,
        the_stack INTEGER,   --key matches with a zone number in the zones table
        p1_life INTEGER,     --(except this one... this is just an integer..
        p1_library INTEGER,
        p1_hand INTEGER,
        p1_battlefield INTEGER,
        p1_graveyard INTEGER,
        p1_exile INTEGER,

        p2_life INTEGER,     --(except this one... this is just an integer..
        p2_library INTEGER,
        p2_hand INTEGER,
        p2_battlefield INTEGER,
        p2_graveyard INTEGER,
        p2_exile INTEGER
);

CREATE TABLE zones (
        ID SERIAL PRIMARY KEY,
        zone_number UNIQUE INTEGER,
);

CREATE TABLE cards_in_zone (
        ID SERIAL PRIMARY KEY,
        zone_number INTEGER,
        card_id INTEGER,
        card_name VARCHAR
);

CREATE TABLE cards (
        ID SERIAL PRIMARY KEY,
        decklist_id INTEGER,
        name VARCHAR
);


CREATE TABLE decklists (
        ID SERIAL PRIMARY KEY,
        name VARCHAR
);

CREATE TABLE games (
        ID SERIAL PRIMARY KEY,
        decklist_1_id INTEGER,
        decklist_2_id INTEGER,
        description VARCHAR,      --perhaps a stringified version of the actions taken?  Perhaps something the user puts in to describe it?
        winner INTEGER            --will be either 1 or 2 -- constrain this or leave as-is and force programmatically?  Force programmatically methinks.
);
        
CREATE TABLE actions (
        ID SERIAL PRIMARY KEY,
        player VARCHAR,
        turn INTEGER,
        description VARCHAR,
        card_name VARCHAR,
        card_id INTEGER,
        boardstate_id INTEGER
);

