// ISN Project / USER INTERFACE 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var UI    = {}
UI.konami = {}
UI.debug  = false

/*
***
** PAGES SWITCH
***
*/

UI.hideElement = (element, time, callback) =>
{
	// FUNCTION: hides the elements with the fadeTo function
	var element = $(element)

	element.fadeTo(time, 0, () =>
	{
		element.addClass("hidden delete")
		if(callback) {callback()}
	})

	if (UI.debug) {console.log("called hideElement(); {element:" + element + ", time:" + time + ", callback:" + callback)}
	return true
}

UI.showElement = (element, time, callback) =>
{
	// FUNCTION: show the elements with the fadeTo function
	var element = $(element)

	element.removeClass("hidden delete")
	element.fadeTo(time, 1, () =>
	{
		if (callback) {callback()}
	})

	if (UI.debug) {console.log("called showElement(); {element:" + element + ", time:" + time + ", callback:" + callback)}
	return true
}

/*
***
** UI ELEMENTS
***
*/

UI.displayHealth = () =>
{
	// FUNCTION: displays the health as hearts to the user
	var lives = Player.getLives()
	var input = $(".input")
	var hp    = $(".hp")

	$(".fa-heart").remove()
	input.removeClass("animate-input")

	if (lives == 1) {input.addClass("animate-input")}
	for (var i = 0; i < lives; i++) {hp.append("<i class=\"fa fa-heart\"></i> \n")}

	if (UI.debug) {console.log("called UI:displayHealth(); {lives:" + lives + "}")}
	return true
}

UI.displayOperation = () =>
{
	// FUNCTION: displays the operation to the user
	var latestOperation = OP.results

	if (Game.getStatus() != "running" || !("latest" in latestOperation)) {return false}
	$(".equation").text(latestOperation["latest"]["integer_1"] + " " + latestOperation["latest"]["operation"] + " " + latestOperation["latest"]["integer_2"])

	if (UI.debug) {console.log("called UI:displayOperation();")}
	return true
}

UI.displayScore = () =>
{
	// FUNCTION: displays the points and deaths to the user
	var score = Player.getPoints()
	var deaths = Player.getDeaths()

	$(".fa-trophy").remove()
	$(".fa-times").remove()
	$(".score").append("<b><i class='fa fa-trophy' aria-hidden='true'> " + score + " / </i> <i class='fa fa-times' aria-hidden='true'> " + deaths + "</i></b>")

	if (UI.debug) {console.log("called UI:displayScore();")}
	return true
}

UI.clearInput = () =>
{
	// FUNCTION: deletes the user's value

	$(".input").val("")
	$(".input").focus()
	return true
}


/*
***
** AUDIO
***
*/

UI.setAudio = (type) =>
{
	// FUNCTION: starts the music
	var music_calm   = $(".music_calm")
	var music_stress = $(".music_stress")

	if (type == "calm")
	{
		if ((music_stress[0].volume > 0))
		{
			music_stress.animate({volume: 0}, 750, () =>
			{
				music_stress[0].pause()
				music_stress[0].currentTime = 0
			})
		}

		if (music_calm[0].paused)
		{
			music_calm[0].play()
			music_calm.animate({volume: .50}, 500)
		}
	}

	if (type == "stress")
	{
		if ((music_calm[0].volume > 0))
		{
			music_calm.animate({volume: 0}, 750, () =>
			{
				music_calm[0].pause()
				music_calm[0].currentTime = 0
			})
		}

		if (music_stress[0].paused)
		{
			music_stress[0].play()
			music_stress.animate({volume: .50}, 500)
		}
	}

	if (type == "stop")
	{
		music_calm.animate({volume: 0}, 250)
		music_stress.animate({volume: 0}, 250, () =>
		{
			music_calm[0].pause()
			music_stress[0].pause()
		})
	}

	if (UI.debug) {console.log("called UI:setAudio(); {type: " + type + "}")}
	return true
}

/*
***
** TIMER
***
*/

UI.startTimer = (time, callback) =>
{
	// FUNCTION: Starts the animation of the timer

	$(".timer").css({"animation": "timer " + time + "s linear", "animation-fill-mode": "forwards"})
	clearTimeout(UI.timer)
	UI.timer = setTimeout(() =>
	{
		UI.resetTimer(callback)
	}, (time)*999)

	if (UI.debug) {console.log("called UI:startTimer(); {time: " + time + "}")}
	return true
}

UI.resetTimer = (callback) =>
{
	// FUNCTION: Stops the animation of the timer

	$(".timer").css({"animation": "stopTimer .25s linear", "animation-fill-mode": "forwards"})

	UI.resetKonami()
	setTimeout(() => {if(callback) {callback()}}, 250)

	if (UI.debug) {console.log("called UI:resetTimer();")}
	return true
}


/*
***
** KONAMI
***
*/

UI.konamiHideInput = () =>
{
	// FUNCTION: Sets the input type to password, so we hide what the user inputs
	$(".input").attr("type", "password")
}

UI.konamiHideText = (timer) =>
{
	// FUNCTION: Adds the animation of setting equation's opacity to 0
	$(".equation").css({"animation": "hideText 1s linear", "animation-fill-mode": "forwards"})
}

UI.konamiHideTimer = () =>
{
	// FUNCTION: Adds the animation of setting timer's opacity to 0
	$(".timer").css({"animation": "stopTimer 1s linear", "animation-fill-mode": "forwards"})
}

UI.resetKonami = () =>
{
	// FUNCTION: Clears the mess made by the konami code
	$(".input").attr("type", "text")
	$(".equation").css({"animation": ""})
}