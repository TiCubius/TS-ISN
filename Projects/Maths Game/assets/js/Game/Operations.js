// ISN Project / OPERATION SYSTEM 
// VERSION 2.02, latest updated: 19/05/2017
// TARTIERE Kevin & ARNAUD Louis, <ticubius@gmail.com>

var OP     = {}
OP.results = {}
OP.debug   = true


/*
***
** GETTERS AND SETTERS
***
*/

OP.getExpectedValue = () =>
{
	// FUNCTION: returns the correct answer
	return OP.results.latest.expected
}

/*
***
** ACTUAL LOGIC
***
*/

OP.RNG = (min, max) =>
{
	// FUNCTION: generates a random number between min and max
	var generated = Math.round(Math.random() * (max - min) + min)

	if (OP.debug) {console.log("called OP:RNG(); {generated: " + generated + "}")}
	return generated
}

OP.generate = () =>
{
	// FUNCTION: generates an operation and registers it in OP.results
	var round      = Game.getCurrentRound()
	var difficulty = Game.getDifficulty()

	// SOMETHING AS ALREADY BEEN GENERATED FOR THIS ROUND
	if ((round in OP.results))  {console.error("called OP:generate(); {round: " + round + ", generate: false}"); return false}

	// RANDOM GENERATION
	var integer_1 = OP.RNG(difficulty.range[0], difficulty.range[1])
	var integer_2 = OP.RNG(difficulty.range[0], difficulty.range[1])
	var operation = settings.operations[OP.RNG(difficulty.operations[0], difficulty.operations[1])]

	// ASAP DEBUG
	if (OP.debug) {console.log("called OP:generate(); {integer_1:" + integer_1 + ", operation:" + operation + ", integer_2:" + integer_2)}
	
	// SAVE IN OP.results, DIFFERENT DEPENDING ON THE OPERATION
	if (operation === "+") {hasMemoryGenerated = OP.save(round, integer_1,               integer_2, operation, integer_1 + integer_2)}
	if (operation === "-") {hasMemoryGenerated = OP.save(round, integer_1,               integer_2, operation, integer_1 - integer_2)}
	if (operation === "x") {hasMemoryGenerated = OP.save(round, integer_1,               integer_2, operation, integer_1 * integer_2)}
	if (operation === "/") {hasMemoryGenerated = OP.save(round, (integer_1 * integer_2), integer_2, operation, (integer_1 * integer_2) / integer_2)}

	return hasMemoryGenerated?true:false	
}

OP.save = (round, integer_1, integer_2, operation, expected) =>
{
	// FUNCTION: Register the operation in OP.results

	// WE ALREADY HAVE AN OPERATION FOR THAT ROUND
	if (round in OP.results) {return false}

	// SO WE HAVE A FULL LIST OF PREVIOUS OPERATIONS
	OP.results[round] =
	{
		operation: operation,
		integer_1: integer_1,
		integer_2: integer_2,
		expected: expected
	}

	// SO WE KNOW WHAT WAS THE LASTEST GENERATED
	OP.results["latest"] = OP.results[round] 

	if (OP.debug) {console.log("called OP:save(); round:", round + "; ", integer_1, operation, integer_2, "=", expected)}
	return true
}

OP.clear = () =>
{
	// FUNCTION: clears OP.results
	OP.results = {}

	if (OP.debug) {console.log("called OP:clear();")}
	return true
}