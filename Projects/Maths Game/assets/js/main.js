// ISN Project / LOADING SYSTEM 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

require.config(
{
	baseUrl: './assets/js/',
	paths:
	{
		jquery:   'lib/jquery-3.1.1',
		jqueryui: 'lib/jquery-ui'
	}
})

require(
	["jquery", "jqueryui", "Game/Events", "Game/Game", "Game/Player", "Game/Operations", "UI/Ui"], ($, events, game, ui) => 
	{
		Events.loadEvents()
	}
)