// ISN Project / EVENT SYSTEM
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var Events = {}
Events.debug = false

Events.listen = () =>
{
	$(".start").on("click", () =>
	{
		// EVENT: Start Game button pressed
		if (Events.debug) {console.log("Events:click(.start) called;")}
		
		if (!($(".difficulty").val())) {return false}
		UI.hideElement(".welcome", "slow", () =>
		{
			UI.showElement(".game", "slow")
			Game.start()
		})
	})

	$(".return").on("click", () =>
	{
		// EVENT: Start Game button pressed
		if (Events.debug) {console.log("Events:click(.start) called;")}

		UI.hideElement(".results", "slow", () =>
		{
			UI.showElement(".welcome", "slow")
		})
	})

	$(".input").on("keyup", (event) =>
	{
		if (Events.debug) {console.log(event.type + ": " + event.key)}
		Game.checkValue()
	})
}