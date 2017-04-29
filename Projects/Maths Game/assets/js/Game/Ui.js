// ISN Project / USER INTERFACE 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var UI = {}
UI.debug = false


UI.hideElement = (element, time, callback) =>
{
	// FUNCTION: Hides the element with JQUERY's fadeTo function & CSS.
	if (UI.debug) {console.log("UI:hideElement() called; time: " + time + ", element: " + element + ", callback:",  callback)}

	$(element).fadeTo(time, 0, () =>
	{
		$(element).addClass("hidden delete")
		if (callback) {callback()}
	})

	return true
}

UI.showElement = (element, time, callback) =>
{
	// FUNCTION: Show the element with JQUERY's fadeTo function & CSS.
	if (UI.debug) {console.log("UI:showElement() called; time: " + time + ", element: " + element + ", callback:",  callback)}

	$(element).removeClass("hidden delete")
	$(element).fadeTo(time, 1, () =>
	{
		if (callback) {callback()}
	})
	
	return true
}

UI.startTimer = (time, callback) =>
{
	// FUNCTION: Animate a timer as a background
	if (UI.debug) {console.log("UI:startTimer() called; time:", time + ", callback:", callback)}

	$(".timer").animate({height: "100%"}, time, "linear", () =>
	{
		$(".timer").delay(700).animate({height: 0}, 300, "linear", () => {if (callback) {callback()}})
	})

	return true
}

UI.displayHealth = () => 
{
	// FUNCTION: Display the health as hearts
	lives = Player.getLives()
	if (UI.debug) {console.log("UI:displayHealth() called; displayed lives:", lives)}

	$(".fa-heart").remove()
	$(".input").removeClass("animate-input")
	for (var i = 0; i < lives; i++)
	{
		$(".hp").append('<i class="fa fa-heart"></i> \n')
	}

	if (lives == 1) {$(".input").addClass("animate-input")}

	return true
}

UI.displayOperation = () =>
{
	// FUNCTION: Displays the operation to the user
	if (UI.debug) {console.log("UI:displayOperation() called;")}

	if (!Game.hasStarted() || !("latest" in OP.results)) {return false}
	$(".equation").text(OP.results["latest"]["integer_1"] + " " + OP.results["latest"]["operation"] + " " + OP.results["latest"]["integer_2"])

	return true
}

UI.displayScore = () =>
{
	// FUNCTION: Displays the score to the user
	if (UI.debug) {console.log("UI:displayScore() called;")}

	$(".fa-trophy").remove()
	$(".score").append("<i class='fa fa-trophy' aria-hidden='true'> " + Player.getPoints() + "</i>")
}

UI.audio = () =>
{
	// FUNCTION: Plays the music
	lives = Player.getLives()
	if (UI.debug) {console.log("UI:audio() called; lives:", lives)}

	if (lives > 1)
	{
		var music_base = $(".music_base")[0]
		var music_stress = $(".music_stress")[0]

		music_stress.currentTime = 0
		$(".music_stress").animate({volume: 0}, 750, () =>
		{
			music_stress.pause()
		})

		if (music_base.paused)
		{
			music_base.currentTime = 0
			music_base.volume = 0
			music_base.play()
			$(".music_base").animate({volume: .5}, 750)
		}
	}

	if (lives == 1)
	{
		var music_base = $(".music_base")[0]
		var music_stress = $(".music_stress")[0]

		music_base.currentTime = 0
		$(".music_base").animate({volume: 0}, 750, () =>
		{
			music_base.pause()
		})

		if (music_stress.paused)
		{
			music_stress.currentTime = 0
			music_stress.volume = 0
			music_stress.play()
			$(".music_stress").animate({volume: .5}, 750)
		}
	}

	if (lives <= 0)
	{
		$(".music_base").animate({volume: 0}, 750)
		$(".music_stress").animate({volume: 0}, 750, () =>
		{
			$(".music_base")[0].pause()
			$(".music_stress")[0].pause()
		})


	}

	return true
}

UI.clearInput = () =>
{
	// FUNCTION: Clear the input
	if (UI.debug) {console.log("UI:clearInput() called")}

	$(".input").val("")

	return true
}
 
UI.resetTimer = (callback) =>
{
	// FUNCTION: Stops the timer
	if (UI.debug) {console.log("UI:resetTimer() called; callback:", callback)}

	$(".timer").stop()
	$(".timer").animate({height: "0"}, 750, "linear", () =>
	{
		setTimeout(() => {if (callback) {callback()}}, 750)
	})
}

/*
UI.generateResults = () =>
{
	// UI.hideElement(".welcome"); UI.showElement(".game"); UI.generateResults()
	if (UI.debug) {console.log("UI:generateResults() called;")}
	var rounds = Game.getCurrentRound()

	var data = 
	{
		labels: Array.apply(null, {length: rounds}).map(Number.call, Number),
		datasets: 
		[
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: OP.results.points
			}
		]
	}

	var options = 
	{
		maintainAspectRatio: true,
		scaleOverride: false,
		scaleSteps: 10,
		scaleStepWidth: 10,
		scaleStartValue: 0,
		animation: true,

		responsive: false
	}

	var ctx = $("#myChart")[0].getContext("2d")
	var myNewChart = new Chart(ctx).Line(data, options)
}

*/