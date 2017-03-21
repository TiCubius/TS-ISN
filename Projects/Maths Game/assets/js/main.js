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
	["jquery", "jqueryui", "Game/Game", "Game/Player", "Game/Operations", "UI/Ui"], ($, game, ui) => 
	{
		Game.status.hasStarted = true
		Player.status.lives++ // CHEATY, I KNOW
		Player.addLife()
		console.log(Player.getPlayerLives() + " lives")
		UI.setLifeDisplay()
		UI.startTimer()

	}
)