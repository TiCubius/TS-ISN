// ISN Project / GAME SYSTEM 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Game    = {}
Game.debug  = false
Game.status = {}

Game.setDifficulty = () =>
{
	// FUNCTION: Request the select's value & sets the difficulty.
	difficulty = $(".difficulty").val()
	if (Game.debug) {console.log("Game:setDifficulty() called; difficulty:", difficulty)}
	
	Game.status.difficulty = settings[difficulty]

	return true
}

Game.hasStarted = () =>
{
	// FUNCTION: Request the select's value & sets the difficulty.
	if (Game.debug) {console.log("Game:hasStarted() called; started:", Game.status.hasStarted)}

	return Game.status.hasStarted
}

Game.getCurrentRound = () =>
{
	// FUNCTION: Returns the current round number
	round = Game.status.round
	if (Game.debug) {console.log("Game:getCurrentRound() called; round:", round)}

	return round
}

Game.focus = () =>
{
	// FUNCTION: autofocus the input
	if (Game.debug) {console.log("Game:focus() called;")}

	$(".input").focus()

	return true
}

Game.start = () => 
{
	// FUNCTION: Sets the difficulty & lives, and start a new round
	if (Game.debug) {console.log("Game:start() called;")}
	if (Game.hasStarted()) {return false}

	Game.status.round = 0
	Game.status.hasStarted = true

	Game.setDifficulty()
	Player.setLives(Game.status.difficulty.lives)
	UI.displayHealth()
	Game.newRound()

	return true
}

Game.stop = () =>
{
	// FUNCTION: Stops the round
	if (Game.debug) {console.log("Game:stop() called;")}

	$(".music").animate({volume: 0}, 1000)
	Game.status.hasStarted = false

	UI.audio()

	UI.hideElement(".game", "slow", () =>
	{
		UI.showElement(".welcome", "slow", () =>
		{
			OP.clearMemory()
		})
	})

	return true
}

Game.newRound = () =>
{
	// FUNCTION: Starts a new round
	if (Game.debug) {console.log("Game:newRound() called;")}

	Game.status.round++
	Game.status.isPaused = false

	OP.generate()
	UI.audio()
	UI.clearInput()
	UI.displayScore()
	UI.displayHealth()
	UI.displayOperation()
	UI.startTimer(Game.status.difficulty.timer * 1000, () =>
	{
		Game.lostRound()
	})

	return true
}

Game.winRound = () =>
{
	// FUNCTION: Called when the player has win a round

	if (!Game.status.isPaused)
	{
		Game.status.isPaused = true
		chance = Math.random() 
		added  = chance < Game.status.difficulty.chance ? Player.addLife() : false
		if (Game.debug) {console.log("Game:winRound() called; add life:", added + "; value:", chance)}

		Player.addPoint()
		OP.setRoundMemory(Game.getCurrentRound(), $(".input").val(), 1)
		UI.resetTimer(() => Game.newRound())
	}
	else {console.log("------- WARNING: WIN ROUND WHILE PAUSED!")}

	return true
}

Game.lostRound = () =>
{
	// FUNCTION: Called when the player has lost a round
	if (Game.debug) {console.log("Game:lostRound() called;")}

	if (!Game.status.isPaused)
	{
		Game.status.isPaused = true
		Player.takeLife()

		OP.setRoundMemory(Game.getCurrentRound(), $(".input").val(), 20)
		if (Player.isAlive()) 
		{
			setTimeout(() => Game.newRound(), 1500)
		}
		else {Game.stop()}		
	}
	else {console.log("------- WARNING: LOST ROUND WHILE PAUSED!")}

	return true
}

Game.checkValue = () =>
{
	// FUNCTION: Checks if value is correct

	if ($(".input").val() == OP.results.latest.expected) 
	{
		if (Game.debug) {console.log("Game:checkValue() called; GOOD VALUE")}
		Game.winRound()
		return true
	}

	if (Game.debug) {console.log("Game:checkValue() called; WRONG VALUE")}
	return false
}