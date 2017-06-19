# The Source for MTG Decklists and Gameplay


### Games and Decklists

GET [imawesome.bob/api/v1/games/](#)

Sample Request Headers:
```
Authorization: "JWT TOKEN.GOES.HERE"
```

Sample Response with a single game (Note: format of games, decklists, etc. is in flux.  Subject to change):
```
games: [{decklist1: [{name: "Island", quantity: 60}],
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

	subActions: []
}],
	comments: [{text: "Ow." }]
}]
```

Fetches all games for the currently logged in user.  Might be configured to get a subset of games using query params.

<hr>

POST [imawesome.bob/api/v1/games/](#) 

Add a game for the currently logged in user.

<hr>

GET [imawesome.bob/api/v1/games/:id](#) 

Fetches a game for the logged in user.

<hr>

GET [imawesome.bob/api/v1/actions/](#) 

Fetches actions from previous games.

<hr>

GET [imawesome.bob/api/v1/boardstates/](#) 

Fetches boardstates from previous games.

<hr>

GET [imawesome.bob/api/v1/decklists/](#) 

Fetches decklists the currently logged in user has played with.


### Users

POST [imawesome.bob/api/v1/login/](#) 
```
Sample Request Body:
{
  email: "bob@happytreepainting.org"
  password: "bobisawesome"
}
```

Success Response:
```
{
  token: "JWT.RETURNED.HERE",
  user: {
    firstName: "Bob",
    lastName: "Ross",
    email: "bob@happytreepainting.org",
    role: "Owner"
  }
}
```

<hr>

POST [imawesome.bob/api/v1/register/](#) 

Sample request body:
```
{
  firstName: "Bob",
  lastname: "Ross",
  email: "bob@happytreepainting.org",
  password: "bobisawesome"
}
```

Success Response:
```
{
  token: "TOKEN.RETURNED.HERE",
  user: {
    firstName: "Bob",
    lastName: "Ross",
    email: "bob@happytreepainting.org",
    role: "Owner"
  }
}
```
  
## Todo
0. Get documentaton in order.
1. Polish off authorization/authentication.
2. Clean up the models.
3. Get to work on the front end of the app.
4. Figure out what additional endpoints to support, or make the front-end do all the heavy lifting (makes the most sense since this targets desktops primarily).
6. Open up the API to be flexible enough to handle other games (version 2 territory).

