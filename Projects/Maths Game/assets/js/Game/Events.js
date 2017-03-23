// ISN Project / OPERATION CONTROL 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>	

var Events = {}

Events.loadEvents = () =>
{
	$(".input").focus(() => {Game.startGame()})
	$(".input").keypress(() => { console.log($(".input").val())} )
}

