// ISN Project / LOADING SYSTEM 
// VERSION 2.02, latest updated: 19/05/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

require.config(
{

	baseUrl: "./assets/js/",
	paths:
	{
		settings: "settings",

		jquery:   "lib/jquery-3.1.1",

		ui:       "game/ui",
		events:   "game/events",
		player:   "game/player",
		game:     "game/game",
		op:       "game/operations"
	}

})

require(["settings", "jquery", "ui", "events", "op", "player", "game"], () => 
{
	Events.listen()
})