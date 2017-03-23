// ISN Project / PLAYER MECHANICS 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Player = {}
Player.status = 
{
	lives: 0, 
	combo: 0,
	errors: 0,
	success: 0	
}

// FUNCTION: addLife(), ADD ONE LIFE
Player._addLife = () =>
{
	/* CHECKS BEFORE ACTIONS
		* THE GAME HAS STARTED
		* THE PLAYER IS STILL ALIVE

		RETURNS: Lives remaining
	*/

	if ((Game.hasStarted()) && (Player.isAlive())) {Player.status.lives++}
	return Player.status.lives
}

// FUNCTION: takeLife(), TAKE ONE LIFE
Player._takeLife = () =>
{
	/* CHECKS BEFORE ACTIONS
		* THE GAME HAS STARTED
		* THE PLAYER IS STILL ALIVE

		RETURNS: Lives remaining
	*/

	if ((Game.hasStarted()) && (Player.isAlive())) {Player.status.lives--}
	return Player.status.lives
}

// FUNCTION: _setLife(lives)
Player._setLives = (lives) => 
{
	/* CHECKS BEFORE ACTIONS
		* NONE

		RETURNS: true
	*/

	Player.status.lives = lives
	return true

}

// FUNCTION: getPlayerLives(), RETRUN THE LIVES OF THE PLAYER
Player.getPlayerLives = () =>
{
	/* CHECKS BEFORE ACTIONS
		* THE GAME HAS STARTED

		RETURNS: Lives remaining or FALSE
	*/
	if (Game.hasStarted()) {return Player.status.lives}
	return false
}

// FUNCTION: isPlayerAlive(), RETURNS TRUE OR FALSE
Player.isAlive = () =>
{
	/* CHECKS BEFORE ACTIONS
		* THE GAME HAS STARTED

		RETURNS: TRUE or FALSE
	*/

	if ((Game.hasStarted()) && (Player.getPlayerLives() > 0)) {return true}
	return false
}