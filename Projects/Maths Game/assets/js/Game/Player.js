// ISN Project / PLAYER SYSTEM 
// VERSION 1.01, latest updated: 25/03/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Player = {}

Player.status =
{
	/* IN-GAME INFORMATIONS & COUNTERS
	* lives: how many lives the player has left
	* combo: how many good answeres the player
	* errors: how many total errors the player made
	* success: how many good answeres the player made
	*/

	lives: 0,
	combo: null,
	errors: null,
	success: null
}

Player.addLife = () =>
{
	// FUNCTION: Adds a life to the player
	// CHECKING: [Game has started]

	if (!Game.hasStarted()) {return false}
	Player.status.lives++

	console.log("------------------- LIFE++ ")

	return true
}

Player.takeLife = () =>
{
	// FUNCTION: Removes a life to the player
	// CHECKING: [Game has started]

	if (!Game.hasStarted()) {return false}
	Player.status.lives--

	return true
}

Player.setLives = (lives) =>
{
	// FUNCTION: Force the lives of the player
	// CHECKING: [Game has started]

	Player.status.lives = lives

	return true
}

Player.getLives = () =>
{
	// FUNCTION: Returns how many lives the player has

	return Player.status.lives
}

Player.isAlive = () =>
{
	// FUNCTION: Returns wheather or not the player is alive

	return Player.status.lives? true : false
}