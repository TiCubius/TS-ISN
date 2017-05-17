// ISN Project / EVENT SYSTEM
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Events   = {}
Events.debug = true
Events.status =
{
	konami_status: 0,
	konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A

	cheat_status: 0,
	cheat: [67, 72, 69, 65, 84] // c h e a t
	
}

Events.listen = () =>
{
	$(".start").on("click", () =>
	{
		// EVENT: start game button pressed
		if (Events.debug) {console.log("called Events:click(\".start\");")}

		if (!($(".difficulty").val())) {return false}
		Game.start()

	})

	$(".return").on("click", () =>
	{
		// EVENT: return to welcome screen button pressed
		if (Events.debug) {console.log("called Events:click(\".return\");")}

		UI.hideElement(".results", "slow", () =>
		{
			UI.showElement(".welcome", "slow")
		})

	})

	$(document).on("keydown", (event) =>
	{
		if (event.keyCode === Events.status.konami[Events.status.konami_status++])
		{
			if (Events.status.konami_status == Events.status.konami.length)
			{
				console.warn("KONAMI MODE ACTIVATED")
				Events.status.konami_status = 0
				Game.start(true)
			}
		}
		else
		{
			Events.status.konami_status = 0
		}

		if (event.keyCode === Events.status.cheat[Events.status.cheat_status++])
		{
			if (Events.status.cheat_status == Events.status.cheat.length)
			{
				console.warn("CHEAT MODE ACTIVATED")
				Events.status.interval = setInterval(() => Game.winRound(), 2500)
			}
		}
		else
		{
			Events.status.cheat_status = 0
		}
	})	

	$(".input").on("keyup", (event) =>
	{
		if (Events.debug) {console.log(event.type + ": " + event.key)}
		Game.checkValue()
	})
}