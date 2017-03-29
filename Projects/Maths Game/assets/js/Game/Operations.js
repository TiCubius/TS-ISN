// ISN Project / OPERATION SYSTEM 
// VERSION 1.01, latest updated: 25/03/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var OP = {}

OP.results = {}

OP.generateNewOperation = (operation) =>
{
	// FUNCTION: Generates a new question
	// INTERACT: [GAME]
	// CHECKING: [Game has started, Operation in known]

	if (!Game.hasStarted()) {return false}
	if (Game.settings.operations.indexOf(operation) == "-1") {return false}

	let currentRound = Game.getCurrentRound()
	let integer_1 = Math.ceil(Math.random() * (10 - 1) + 1)
	let integer_2 = Math.ceil(Math.random() * (10 - 1) + 1)

	if (operation === "+") {hasMemoryGenerated = OP.generateMemory(currentRound, integer_1, integer_2, operation, integer_1 + integer_2)}
	if (operation === "-") {hasMemoryGenerated = OP.generateMemory(currentRound, integer_1, integer_2, operation, integer_1 - integer_2)}
	if (operation === "x") {hasMemoryGenerated = OP.generateMemory(currentRound, integer_1, integer_2, operation, integer_1 * integer_2)}
	if (operation === "/") {hasMemoryGenerated = OP.generateMemory(currentRound, (integer_1 * integer_2), integer_2, operation, (integer_1 * integer_2) / integer_2)}

	if (!hasMemoryGenerated) {return false}

	console.log("expected: " + OP.results.latest.expected)
	return true
}

OP.generateMemory = (round, integer_1, integer_2, operation, expected) =>
{
	// FUNCTION: Register the operation in a list
	// CHECKING: Round hasn't been registred yet

	if (round in OP.results) {return false}
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
	// CHECKING: Round has been registred, informations are valid

	if (!(round in OP.results)) {return false}
	if (!(new RegExp("[0-9]+").test(given)) || !time) {return false}

	OP.results[round].given = given
	OP.results[round].time = time

	return true
}

OP.clearMemory = () =>
{
	// FUNCTION: Removes all the previous informations
	// CHECKING: [Game hasn't started]

	if (Game.hasStarted()) {return false}
	OP.results = {}

	return true
}
