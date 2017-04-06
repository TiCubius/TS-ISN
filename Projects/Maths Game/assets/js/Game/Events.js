// ISN Project / EVENTS SYSTEM
// VERSION 1.01, latest updated: 25/03/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Events = {}
Events.status =
{
	konami_status: 0,
	konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
}

Events.loadEvents = () =>
{
	// FUNCTION: Loads all the events
	// INTERACT: [GAME]
	$(".input").focus(() => {Game.start()})
	$(".input").on("keyup", (event) => 
	{
		if (Game.debug())
		{
			console.log(event.type + ": " + event.key)
			console.log(Game.checkValue())
		}
		else
		{
			Game.checkValue()
		}
	})

	$(document).on("keydown", (event) =>
	{
		if (event.keyCode === Events.status.konami[Events.status.konami_status++])
		{
			if (Events.status.konami_status == Events.status.konami.length)
			{
				Game.setDifficulty("ultra")
				Game.start()
			}
		}
	})
}

