// ISN Project / PLAYER SYSTEM 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Player    = {}
Player.debug  = false
Player.status = {}

Player.isAlive = () =>
{
	// FUNCTION: Returns weather or not the player is alive
	if (Player.debug) {console.log("Player:isAlive() called; lives:", Player.status.lives)}

	return Player.status.lives > 0 ? true : false
}

Player.getLives = () =>
{
	// FUNCTION: returns the lives
	if (Player.debug) {console.log("Player:getLives() called; lives:", Player.status.lives)}

	return Player.status.lives
}

Player.setLives = (lives) =>
{
	// FUNCTION: Forces the player to have X lives
	if (Player.debug) {console.log("Player:setLives() called; lives:", lives)}

	Player.status.points = 0
	Player.status.lives = lives
	return true
}

Player.addLife = () =>
{
	// FUNCTION: Can be called when the player has win a round
	if (Player.debug) {console.log("Player:addLife() called; lives:", Player.status.lives)}

	Player.status.lives++

	return true
}

Player.takeLife = () =>
{
	// FUNCTION: Called when the player has lost a round
	if (Player.debug) {console.log("Player:takeLife() called; lives:", Player.status.lives)}	

	Player.status.lives--

	return true
}

Player.getPoints = () =>
{
	return Player.status.points
}

Player.addPoint = () =>
{
	if (!Player.status.points) {Player.status.points = 0}
	Player.status.points++

	return true
}
