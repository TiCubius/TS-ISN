// ISN Project / LOADING SYSTEM 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

require.config(
{
	baseUrl: './assets/js/',
	paths:
	{
		jquery:   'lib/jquery-3.1.1',
		chartjs:  'lib/Chart',
		// jqueryui: 'lib/jquery-ui'
	}
})

require(["jquery", "chartjs", "game/game", "game/player", "game/operations", "game/ui", "game/events"], () => {Events.loadEvents();})