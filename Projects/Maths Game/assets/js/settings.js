settings =  
{
	operations: ["+", "-", "x", "/"],

	easy:
	{
		lives: 3,
		chance: 1/5,
		timer: 10,
		range: [1, 5],
		operations: [0, 1]
	},

	normal:
	{
		lives: 2,
		chance: 1/20,
		timer: 7.5,
		range: [1, 10],
		operations: [1, 3]
	},

	hard:
	{
		lives: 1,
		chance: 1/50,
		timer: 5,
		range: [5, 10],
		operations: [2, 3]
	},

	konami:
	{
		lives: 1,
		chance: 1/100,
		timer: 5,
		range: [5, 10],
		operations: [2, 3]
	}
}