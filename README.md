#Welcome to your new Confidant and playtesting buddy 
---

##Todo
1. Polish off authorization/authentication.
2. Clean up the models.
3. Get to work on the front end of the app.
4. Figure out what additional endpoints to support, or make the front-end do all the heavy lifting (makes the most sense since this targets desktops primarily).
6. Open up the API to be flexible enough to handle other games (version 2 territory).
##Planned Endpoints


###Games and Decklists

[somecrazylongurlbecausebbqpwnsauce.com/api/v1/games/](#disclaimer) 

Fetches all games for the currently logged in user.  Might be configured to get a subset of games using query params.


[somecrazylongurlbecausebbqpwnsauce.com/api/v1/actions/](#disclaimer) 

Fetches actions from previous games for data analytics and to speed up playtesting.


[somecrazylongurlbecausebbqpwnsauce.com/api/v1/boardstates/](#disclaimer) 

Fetches boardstates from previous games for data analytics and to speed up playtesting.

[somecrazylongurlbecausebbqpwnsauce.com/api/v1/decklists/](#disclaimer) 

Features decklists the currently logged in user has played with.


###Users

POST [somecrazylongurlbecausebbqpwnsauce.com/api/v1/login/](#disclaimer) 

Response:
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

[somecrazylongurlbecausebbqpwnsauce.com/api/v1/register/](#disclaimer) 

See description above.

[somecrazylongurlbecausebbqpwnsauce.com/api/v1/options/](#disclaimer) 

Get/set options for the currently logged in user.



































That is all.
> Power at any cost.  

### <a name="disclaimer"></a>Note: This will not be the url of the API endpoint.  If you thought it would be and are disappointed, I am sorry.  Go buy that domain and make something special if you feel like it.
