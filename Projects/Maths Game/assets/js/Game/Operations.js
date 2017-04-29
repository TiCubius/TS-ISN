// ISN Project / OPERATION SYSTEM 
// VERSION 2.01, latest updated: 30/04/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var OP = {}
OP.debug = false
OP.results = {}

OP.generate = () => 
{
	// FUNCTION: Generate a random operation
	if (OP.debug) {console.log("OP:generate() called;")}

	var currentRound = Game.getCurrentRound()
	var integer_1    = OP.RNG(1, 10)
	var integer_2    = OP.RNG(1, 10)
	var operation    = settings.operations[OP.RNG(0, 3)]

	if (operation === "+") {hasMemoryGenerated = OP.save(currentRound, integer_1,               integer_2, operation, integer_1 + integer_2)}
	if (operation === "-") {hasMemoryGenerated = OP.save(currentRound, integer_1,               integer_2, operation, integer_1 - integer_2)}
	if (operation === "x") {hasMemoryGenerated = OP.save(currentRound, integer_1,               integer_2, operation, integer_1 * integer_2)}
	if (operation === "/") {hasMemoryGenerated = OP.save(currentRound, (integer_1 * integer_2), integer_2, operation, (integer_1 * integer_2) / integer_2)}

	return hasMemoryGenerated
}

OP.RNG = (min, max) =>
{
	// FUNCTION: Generate a random number
	if (OP.debug) {console.log("OP:RNG() called;")}

	return Math.floor(Math.random() * (max - min + 1)) + min
}

OP.save = (round, integer_1, integer_2, operation, expected) =>
{
	// FUNCTION: Register the operation in a list
	if (OP.debug) {console.log("OP:save() called; round:", round + "; ", integer_1, operation, integer_2, "=", expected)}

	if (round in OP.results) {return false}
	if (!(OP.results.points)) {OP.results.points = []}

	OP.results[round] =
	{
		operation: operation,
		integer_1: integer_1,
		integer_2: integer_2,
		expected: expected,
		given: null,
		time: null
	}

	OP.results["latest"] = OP.results[round]
	return true
}

OP.setRoundMemory = (round, given, time) =>
{
	// FUNCTION: Register the information on the round
	if (OP.debug) {console.log("OP:setRoundMemory() called; round:", round + "; given:", given + "; time:", time)}

	if (!(round in OP.results)) {return false}
	if ((given && !(new RegExp("[0-9]+").test(given))) || !time) {return false}

	OP.results.points.push(Player.getPoints())
	OP.results[round].given = given
	OP.results[round].time = time

	return true
}

OP.clearMemory = () =>
{
	// FUNCTION: Delete all saved values
	if (OP.debug) {console.log("OP:clearMemory() called;")}

	OP.results = {}

	return true
}