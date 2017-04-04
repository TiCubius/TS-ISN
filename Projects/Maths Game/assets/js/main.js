// ISN Project / LOADING SYSTEM 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

require.config(
{
	baseUrl: './assets/js/',
	paths:
	{
		jquery:   'lib/jquery-3.1.1',
		// jqueryui: 'lib/jquery-ui'
	}
})

require(["jquery", "game/game", "game/player", "game/operations", "game/ui", "game/events"], () => {Events.loadEvents();})