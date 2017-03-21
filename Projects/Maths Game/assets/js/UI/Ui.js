// ISN Project / UI CONTROL 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var UI = {}
UI.status =
{
	timerInterval: null
}

// FUNCTION: setInputDisplay()
UI.setInputDisplay = (status) =>
{
	/* CHECKS BEFORE ACTIONS
		* THE GAME HAS STARTED
		* {STATUS} IS KNOWN
		
		RETURNS: true or false
	*/

	if (!Game.hasStarted()) {return false}
	switch(status)
	{
		default:
			// SHOULDN'T HAPPEN, SENDS A MESSAGE IN CONSOLE TO DEBUG
			console.log("UI.setInputDisplay(" + status + ") returned an error")
			console.log(status + " isn't recognized !")
			return false

		case "error":
			// CHANGES BORDER COLOR TO RED, REMOVES IT AFTER 2500ms
			$(".input").val("").addClass("error")
			setTimeout(() => {$(".error").removeClass("error")}, 2500)
			break

		case "success":
			// CHANGES BORDER COLOR TO GREEN, REMOVES IT AFTER 2500ms
			$(".input").val("").addClass("success")
			setTimeout(() => {$(".success").removeClass("success")}, 2500)
			break
	}

	return true
}

// FUNCTION: setLifeDisplay()
UI.setLifeDisplay = () =>
{
	/* CHECKS BEFORE ACTIONS
		* THE GAME HAS STARTED

		RETURNS: true or false
	*/

	if (!Game.hasStarted()) {return false}
	let lives = Player.getPlayerLives()
	
	// REMOVE OLD DISPLAY
	$(".fa-heart").remove()

	if (lives === 0)
	{
		// PLAYER IS DEAD
		$(".hearts").append('<i class="fa fa-heart broken"></i> \n')
	}

	if (lives === 1)
	{
		// PLAYER IS CLOSE TO DEATH
		$(".hearts").append('<i class="fa fa-heart last"></i> \n')		
	}

	for (var i = 0; i < lives; i++)
	{
		// LOOP: ADD 1 HEART/LIFE
		$(".hearts").append('<i class="fa fa-heart"></i> \n')
	}

	return true
}

// FUNCTION: setOperationDisplay()
UI.setOperationDisplay = () =>
{
	/* CHECKS BEFORE ACTION
		* "LASTEST" is defined
		* THE GAME HAS STARTED
		* THE PLAYER IS STILL ALIVE

		RETURNS: TRUE or FALSE
	*/

	if (!Game.hasStarted() || !Player.isAlive() || !("latest" in OP.results)) {return false}
	$(".equation").text(OP.results["latest"]["operand_1"] + OP.results["latest"]["operation"] + OP.results["latest"]["operand_2"])
	
	return true
}

// FUNCTION: startTimer()
UI.startTimer = () =>
{
	/* CHECKS BEFORE ACTION
		* THE GAME HAS STARTED
		* THE PLAYER IS STILL ALIVE

		RETURNS: null
	*/

	if (!Game.hasStarted() || !Player.isAlive()) {return false}

	Game.status.currentTimer = Game.status.baseTimer * 1000
	$(".timer").animate({width: '0%'}, Game.status.currentTimer, "linear")

	// EVERY 1000MS, REMOVES 1000MS FROM TIMER
	UI.status.timerInterval = setInterval(() =>
	{
		Game.status.currentTimer -= 250
		if (Game.status.currentTimer <= 0)
		{
			// TIMER <= 0, NO NEED TO CONITNUE THE TIMER

			$(".timer").animate({width: '100%'}, 1000, "easeInCubic")
			clearInterval(UI.status.timerInterval)
			UI.status.timerInterval = null
		}
	}, 250)

	return true
}

// FUNCTION: resetTimer()
UI.resetTimer = () =>
{
	/* CHECKS BEFORE ACTION
		* THE GAME HAS STARTED
		* THE PLAYER IS STILL ALIVE
		* THE TIMER HAS STARTED

		RETURNS: true or false
	*/

	if (!Game.hasStarted() || !Player.isAlive() || !UI.status.timerInterval) {return false}

	$(".timer").stop()
	$(".timer").animate({width: '100%'}, 1000, "easeInCubic")
	clearInterval(UI.status.timerInterval)
	UI.status.timerInterval = null		

	return true
}