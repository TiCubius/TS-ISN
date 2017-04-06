// ISN Project / USER INTERFACE SYSTEM 
// VERSION 1.01, latest updated: 25/03/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var UI = {}

UI.status = 
{
	timerInterval: null
}

UI.setStatusDisplay = (status) =>
{
	// FUNCTION: Warns the user about his actions
	// CHECKING: [Game has started]
	// INTERACT: [GAME]

	if (!Game.hasStarted()) {return false}
	if (status === "error")
	{
		// CHANGES BORDER COLOR TO RED, REMOVES IT AFTER 2500ms
		$(".input").val("").addClass("error")
		setTimeout(() => {$(".error").removeClass("error")}, 500)
	}
	if (status === "success")
	{
		// CHANGES BORDER COLOR TO RED, REMOVES IT AFTER 2500ms
		$(".input").val("").addClass("success")
		setTimeout(() => {$(".success").removeClass("success")}, 500)
	}

	return true
}

UI.setHealthDisplay = () =>
{
	// FUNCTION: Shows how many lives the user has
	// CHECKING: [Game has started]
	// INTERACT: [PLAYER, GAME]

	$(".fa-heart").remove()
	lives = Player.getLives()

	if (lives === 0)
	{
		// PLAYER IS DEAD
		$(".hearts").append('<i class="fa fa-heart broken"></i> \n')
		$(".equation").text("Perdu !")
	}
	if (lives === 1)
	{
		// PLAYER IS CLOSE TO DEATH
		$(".hearts").append('<i class="fa fa-heart last"></i> \n')		
	}
	if (lives > 1)
	{
		// LOOP: ADD 1 HEART/LIFE
		for (var i = 0; i < lives; i++)
		{
			$(".hearts").append('<i class="fa fa-heart"></i> \n')
		}
	}

	return true
}

UI.setOperationDisplay = () =>
{
	// FUNCTION: Show the operation to the user
	// CHECKING: [Game has Started, Operation has generated]
	// INTERACT: [OPERATION]

	if (!Game.hasStarted() || !("latest" in OP.results)) {return false}
	$(".equation").text(OP.results["latest"]["integer_1"] + " " + OP.results["latest"]["operation"] + " " + OP.results["latest"]["integer_2"])

	return true
}

UI.startTimer = () =>
{
	// FUNCTION: Shows the time left for the user
	// CHECKING: [Game has started]
	// INTERACT: [GAME]

	if (!Game.hasStarted()) {return false}

	Game.status.timeLeft = Game.status.timeNext * 1000
	$(".timer").animate({width: '0%'}, Game.status.timeLeft, "linear")

	// EVERY 250ms, REMOVES 250ms FROM THE TIMER
	UI.status.timerInterval = setInterval(() =>
	{
		Game.status.timeLeft -= 250
		if (Game.status.timeLeft <= 0)
		{
			// TIMER <= 0, NO NEED TO CONTINUE...
			
			Game.lostRound()
			$(".timer").animate({width: "100%"}, 500, "linear")

			clearInterval(UI.status.timerInterval)
			UI.status.timerInterval = null

		}
	}, 250)

	return true
}

UI.resetTimer = () =>
{
	// FUNCTION: Resets the timer
	// CHECKING: [Timer has started]

	if (!UI.status.timerInterval) {return false}

	$(".timer").stop()
	$(".timer").animate({width: "100%"}, 500, "linear")

	clearInterval(UI.status.timerInterval)
	UI.status.timerInterval = null

	return true
}

var ctx = document.getElementById("myChart").getContext("2d");

var data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 45, 46, 47, 48, 49, 50],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(99, 3, 203, 0.9)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 5, 5, 6, 6, 7, 8, 8, 9, 9, 9, 10, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(215, 40, 40, 0.9)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 5, 5, 6, 6, 7, 8, 8, 9, 9, 9, 10, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 17, 17, 17, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20]
        }
    ]
};

setTimeout(() => {
	var myLineChart = new Chart(ctx).Line(data, {});
}, 200)