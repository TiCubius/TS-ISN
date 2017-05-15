// ISN Project / PLAYER SYSTEM 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Player    = {}
Player.status = {}
Player.debug  = true

/*
***
** GETTERS AND SETTERS
***
*/

Player.getLives = () =>
{
	// FUNCTION: returns the player's lives
	return Player.status.lives || 0
}

Player.getPoints = () =>
{
	// FUNCTION: returns the player's points (win rounds)
	return Player.status.points || 0
}

Player.getDeaths = () =>
{
	// FUNCTION: returns the player's deaths (lost rounds)
	return Player.status.deaths || 0
}

Player.setLives = (lives) =>
{
	// FUNCTION: sets the player's lives to the choosen value
	return Player.status.lives = lives
}

Player.setPoints = (points) =>
{
	// FUNCTION: sets the player's points (win rounds) to the choosen value
	return Player.status.points = points
}

Player.setDeaths = (deaths) =>
{
	// FUNCTION: sets the player's deaths (lost rounds) to the choosen value
	return Player.status.deaths = deaths
}
