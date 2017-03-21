// ISN Project / GAME MECHANICS 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Game = {}
Game.settings =
{
	/* IN GAME SETTINGS
	* lives: how many lives the player starts with
	* difficulty: 
		* 1 ->
		* 2 ->
		* 3 ->
	*/

	lives: 3,
	difficulty: 2
}

Game.status = 
{
	/* IN-GAME INFORMATIONS & COUNTERS
	* hasStarted:
	* round: how many questions have been asked?
	* baseTimer: 
	* currentTimer: how many ms left before the end of the question?

	* lives: how many lives left?
	* combo: how many good answeres in a row?
	* success: how many good answeres in total?
	* errors: how many bad answeres in total?
	*/

	hasStarted: false,
	currentTimer: 0,
	baseTimer: 10,
	round: 0
}


// FUNCTION: hasStarted()
Game.hasStarted = () => 
{
	/* CHECKS BEFORE ACTION
		* NONE

		RETURNS: Game.status.hasStarted
	*/

	return Game.status.hasStarted
}

// FUNCTION: addRound()
Game.addRound = () =>
{
	/* CHECKS BEFORE ACTION
		* THE GAME HAS STARTED
		* THE PLAY IS STILL ALIVE

		RETURNS: Game.status.round
	*/

	if (Game.hasStarted() && Player.isAlive()) {Game.status.round++}
	return Game.getCurrentRound()
}

// FUNCTION: getCurrentRound()
Game.getCurrentRound = () =>
{
	/* CHECKS BEFORE ACTION
		* NONE

		RETURNS : Game.status.round
	*/

	return Game.status.round
}

// FUNCTION: startGame()
Game.startGame = () =>
{
	/* CHECKS BEFORE ACTION
		* THE GAME HAS STARTED

		RETURNS: true or false
	*/

	if (Game.hasStarted()) {return false}
}

// FUNCTION: stopGame()
Game.stopGame = () =>
{
	/* CHECKS BEFORE ACTION
		* THE GAME HAS STARTED

		RETURNS: 
	*/

	if (!Game.hasStarted()) {return false}
}
