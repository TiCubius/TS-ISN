// ISN Project / OPERATION CONTROL 
// VERSION 1.00, latest updated: 
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var OP = {}
OP.results = {}

// FUNCTION: generateNewOperation(operation)
OP.generateNewOperation = (operation) =>
{
	/* CHECKS BEFORE ACTION
		* THE GAME HAS STARTED
		* THE PLAYER IS STILL ALIVE
		* OPERATION IS KNOWN

		RETURNS: true or false
	*/

	if (!Game.hasStarted() || !Player.isAlive()) {return false}
	if ((["+", "-", "/", "x"].indexOf(operation)) == "-1") {return false}

	let round = Game.getCurrentRound()
	let operand_1 = Math.ceil(Math.random() * (10-1) +1)
	let operand_2 = Math.ceil(Math.random() * (10-1) +1)

	if (operation === "+") {hasMemoryGenerated = OP._generateMemory(round, operand_1, operand_2, operation, operand_1 + operand_2)}
	if (operation === "-") {hasMemoryGenerated = OP._generateMemory(round, operand_1, operand_2, operation, operand_1 - operand_2)}
	if (operation === "x") {hasMemoryGenerated = OP._generateMemory(round, operand_1, operand_2, operation, operand_1 * operand_2)}
	if (operation === "/") {hasMemoryGenerated = OP._generateMemory(round, (operand_1 * operand_2), operand_2, operation, (operand_1 * operand_2) / operand_2)}

	UI.setOperationDisplay()

	if (hasMemoryGenerated) {return true}
	return false
}

// FUNCTION: _generateMemory()
OP._generateMemory = (round, operand_1, operand_2, operation, expected, given, time) =>
{
	/* CHECKS BEFORE ACTION
		* ROUND hasn't already been registred

		RETURNS: true or false
	*/

	if (round in OP.results) {return false}
	OP.results[round] = 
	{
		operand_1: operand_1,
		operation: operation,
		operand_2: operand_2,
		expected: expected,
		given: given,
		time: time
	}

	OP.results["latest"] = OP.results[round]
	return true
}

OP.setMemory = (round, given, time) =>
{
	/* CHECKS BEFORE ACTION
		* ROUND exists
		* GIVEN and TIME are defined

		RETURNS: FALSE or TRUE
	*/	

	if (!(round in OP.results)) {return false}
	if (!given || !time) {return false}

	OP.results[round].given = given
	OP.results[round].time  = time

	return true
}