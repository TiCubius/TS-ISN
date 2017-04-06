// ISN Project / GAMING SYSTEM 
// VERSION 1.01, latest updated: 25/03/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Game = {}

Game.settings = 
{
	/* IN-GAME SETTINGS
	* debug: 
	* lives: how many lives the player starts a new game with
	* chance: probability of winning a life
	* difficulty: changes base lives, chance, and timer
	* operations: what operations are allowed to be generated
	*/

	debug: true,
	lives: 3,
	chance: null,
	difficulty: null,
	operations: ["+", "-", "x", "/"]
}

Game.status = 
{
	/* IN-GAME INFORMATIONS & COUNTERS
	* round: tracks down the current round number
	* timeLeft: time, in milliseconds, before the end of the current round
	* timeNext: time, in milliseconds, for the next round
	* hasStarted: wheater or not the game has started
	*/

	round: 0,
	timeLeft: null,
	timeNext: 5,
	hasStarted: false
}

Game.setDifficulty = (difficulty) =>
{
	// FUNCTION: Changes the time, and chance
	Game.settings.difficulty = difficulty
	if (difficulty == "easy")
	{
		Game.settings.lives = 3
		Game.settings.chance = 1/5
		Game.status.timeNext = 20
	}
	if (difficulty == "normal")
	{
		Game.settings.lives = 2
		Game.settings.chance = 1/20
		Game.status.timeNext = 15
	}
	if (difficulty == "hard")
	{
		Game.settings.lives = 1
		Game.settings.chance = 1/100
		Game.status.timeNext = 10
	}
	if (difficulty == "ultra")
	{
		Game.settings.lives = 1
		Game.settings.chance = 1/500
		Game.status.timeNext = 5
	}
}

Game.debug = () =>
{
	// FUNCTION: Return wheater or not we console.log()
	return Game.settings.debug
}

Game.hasStarted = () =>
{
	// FUNCTION: Return wheater or not the game has started
	return Game.status.hasStarted
}

Game.getCurrentRound = () =>
{
	// FUNCTION: Returns the current round number
	return Game.status.round
}

Game.generateNewRound = () =>
{
	// FUNCTION: Generate a new round 
	// INTERACT: [PLAYER, UI, OPERATION]
	// CHECKING: [Game has started, Player is alive]

	if (!Game.hasStarted()) {return false}
	if (!Player.isAlive())  {Game.stop(); return false}
	Game.status.round++

	setTimeout(() =>
	{
		OP.generateNewOperation(Game.settings.operations[Math.ceil(Math.random() * (4) -1)])
		UI.setOperationDisplay()
		UI.setHealthDisplay()
		UI.startTimer()		
	}, 500)

	return true
}

Game.winRound = () =>
{
	// FUNCTION: The player has win this round, regenerate a new one
	// INTERACT: [PLAYER, UI, OPERATION]
	// CHECKING: [Game has started]

	if (!Game.hasStarted()) {return false}
	Math.random() < Game.settings.chance ? Player.addLife() : ""

	OP.setRoundMemory(Game.getCurrentRound(), $("input").val(), Game.status.timeLeft)
	UI.resetTimer()
	UI.setStatusDisplay("success")

	Game.generateNewRound()
	return true
}

Game.lostRound = () =>
{
	// FUNCTION: The player has lost this round, regenerate a new one
	// INTERACT: [PLAYER, UI, OPERATION]
	// CHECKING: [Game has started]

	if (!Game.hasStarted()) {return false}
	Player.takeLife()

	OP.setRoundMemory(Game.getCurrentRound(), $("input").val(), Game.status.timeLeft)
	UI.setStatusDisplay("error")

	Game.generateNewRound()

	return true
}

Game.start = () =>
{
	// FUNCTION: Starts the game
	// INTERACT: [PLAYER]

	if (Game.hasStarted()) {return false}
	if (!Game.settings.difficulty) {Game.setDifficulty("normal")}
	
	Game.status.hasStarted = true
	
	Player.setLives(Game.settings.lives)
	Game.generateNewRound()
	
	return true
}

Game.stop = () =>
{
	// FUNCTION: Stops the game and resets the game status
	// INTERACT: [UI, OPERATIONS]
	
	if (!Game.hasStarted()) {return false}
	Game.status.hasStarted = false
	Game.status.timeLeft   = null
	Game.status.timeNext   = 5
	Game.status.round      = null

	OP.clearMemory()
	UI.setHealthDisplay()
	UI.resetTimer()

	return true
}

Game.checkValue = () =>
{
	// FUNCTION: Checks if value is correct
	// CHECKING: [Game has started]
	// INTERACT: [UI, OPERATION]

	if (!Game.hasStarted()) {return false}
	if ($(".input").val() == OP.results.latest.expected) 
	{
		Game.winRound()
		return true
	}

	return false
}