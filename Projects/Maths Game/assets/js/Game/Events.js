// ISN Project / EVENTS SYSTEM
// VERSION 1.01, latest updated: 25/03/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Events = {}

Events.loadEvents = () =>
{
	// FUNCTION: Loads all the events
	// INTERACT: [GAME]
	$(".input").focus(() => {Game.start()})
	$(".input").on("keydown", (event) => {console.log(event.type + ": " + event.key); console.log(Game.checkValue())})
}