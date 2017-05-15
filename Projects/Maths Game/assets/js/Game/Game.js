// ISN Project / game system 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE kevin & arnaud louis, <ticubius@gmail.com>

var Game    = {}
Game.status = {}
Game.debug  = false

/*
***
** GETTERS AND SETTERS
***
*/

Game.getStatus = () =>
{
	// FUNCTION: returns wheater or not the game has started
	return Game.status.status || "stopped"
}

Game.getDifficulty = () =>
{
	// FUNCTION: returns the difficulty settings
	return Game.status.difficulty
}

Game.getKonami = () =>
{
	// FUNCTION: returns wheater or not we are in konami mode
	return Game.status.konami || false
}

Game.getCurrentRound = () =>
{
	// FUNCTION: returns the current round number
	return Game.status.round || 0
}

Game.setKonami = (konami) =>
{
	// FUNCTION: sets the konami's status
	Game.status.konami = konami || false
}

Game.setRound = (round) =>
{
	// FUNCTION: sets the current round
	Game.status.round = round || 0
}

Game.setStatus = (status) =>
{
	// FUNCTION: sets the game's status
	Game.status.status = status || "stopped"
}

Game.setDifficulty = () =>
{
	// FUNCTION: requests the select's value & sets the difficulty in a variable
	var konami = Game.getKonami()
	var difficulty = $(".difficulty").val() || "normal"
	var status = Game.getStatus()

	if (konami) {difficulty = "konami"}
	Game.status.difficulty = settings[difficulty]

	if (Game.debug) {console.log("called Game:setDifficulty(); {status:" + status + ", difficulty:" + difficulty + "}")}
	return true
}

/*
***
** ACTUAL LOGIC
***
*/

Game.start = (konami) =>
{
	// FUNCTION: setup the game
	var status = Game.getStatus()
	var konami = konami?true:false
	
	if (status != "running")
	{
		Game.setKonami(konami)
		Game.setRound(0)
		Game.setDifficulty()

		Player.setLives(Game.getDifficulty().lives)

		UI.hideElement(".welcome", "slow", () =>
		{
			UI.showElement(".game", "slow")
		})

		Game.setStatus("paused")
		setTimeout(() => Game.newRound(), 600)
	}

	if (Game.debug) {console.log("called Game:start(); {status:" + status + ", konami:" + konami + "}")}
	return status == "running"?false:true
}

Game.stop = () =>
{
	// FUINCTION: abort the game!
	var status = Game.getStatus()

	if (status != "stopped")
	{
		Player.reset()
		UI.setAudio("stop")
		UI.hideElement(".game", "slow", () =>
		{
			UI.showElement(".welcome", "slow", () => OP.clear())
		})
		Game.setStatus("stopped")
	}

	if (Game.debug) {console.log("called Game:stop(); {status:" + status + "}")}
	return status == "stopped"?false:true
}

Game.newRound = () =>
{
	// FUNCTION: setups the round
	var round  = Game.getCurrentRound()
	var status = Game.getStatus()
	var lives  = Player.getLives()
	var difficulty = Game.getDifficulty()

	if (status == "paused")
	{
		Game.setStatus("running")
		Game.setRound(round+1)

		OP.generate()

		if (lives > 1) {UI.setAudio("calm")}
		else {UI.setAudio("stress")}

		UI.clearInput()
		UI.displayScore()
		UI.displayHealth()
		UI.displayOperation()
		UI.startTimer(difficulty.timer, () => {Game.lostRound()})

		if (Game.getKonami())
		{
			switch(Math.round(Math.random() * 2)) {
				case 0:
					UI.konamiHideInput(difficulty.timer/5)
					break;
				case 1:
					UI.konamiHideText()
					break;
				case 2:
					UI.konamiHideTimer()
					break;
				default:
					break;
			}
		}

	}

	if (Game.debug) {console.log("called Game:newRound(); {status:" + status + "}")}
	return status == "paused"?true:false
}

Game.winRound = () =>
{
	// FUNCTION: the player gave the correct answere, he won that round
	var status = Game.getStatus()
	var points = Player.getPoints()
	var lives  = Player.getLives()

	if (status == "running")
	{
		Game.setStatus("paused")

		Player.setPoints(points+1)
		if (Math.random() < Game.getDifficulty().chance){Player.setLives(lives+1)}
		UI.resetTimer(() =>	Game.newRound())
	}
	else {console.error("called Game:winRound() while status != 'running' ! {status:" + status + ", points:" + points + "}")}

	if (Game.debug) {console.log("called Game:winRound(); {status:" + status + "}")}
	return status == "running"?true:false	
}

Game.lostRound = () =>
{
	// FUNCTION: the player took too much time, he lost that round
	var status = Game.getStatus()
	var lives  = Player.getLives()
	var deaths = Player.getDeaths()

	if (status == "running")
	{
		Game.setStatus("paused")

		Player.setLives(lives-1)
		Player.setDeaths(deaths+1)
		UI.resetTimer()

		if ((lives-1) > 0) {Game.newRound()}
		else {Game.stop()}
	}
	else if (Game.debug) {console.error("called Game:lostRound() while status != 'running' ! {status:" + status + "}")}

	if (Game.debug) {console.log("called Game:lostRound(); {status:" + status + "}")}
	return status == "running"?true:false	
}

Game.checkValue = () =>
{
	// FUNCTION: checks if the user's input is the correct answer
	var value    = $(".input").val()
	var expected = OP.getExpectedValue()

	if (value == expected) {Game.winRound()}
	return value==expected?true:false
}