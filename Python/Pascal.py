"""
* PASCAL'S TRIANGLE, 12/01/2017
* Shows PASCAL'S TRIANGE until n, an integer you selected.

* PASCAL
* [1]
* [1, 1]
* [1, 2, 1]
* [1, 3, 3, 1]
* [1, 4, 6, 4, 1]
* [1, 5, 10, 10, 5, 1]
* [1, 6, 15, 20, 15, 6, 1]
* [1, 7, 21, 35, 35, 21, 7, 1]
* [1, 8, 28, 56, 70, 56, 28, 8, 1]
* [1, 9, 36, 84, 126, 126, 84, 36, 9, 1]

"""

print("We will show PASCAL'S TRIANGLE until n, an integer you selected.")
n = int(input("How many lines? : "))

array = [[0 for i in range(n)]for i in range(n)] # 2D ARRAY, n*n containing 0


# FIRST COLUMN & DIAGONAL: SET 1
for i in range(n):
	array[i][0] = 1
	array[i][i] = 1

# TRIANGLE'S COEFFICIENT
for i in range(1, n):
	for j in range(1, i):
		array[i][j] = array[i-1][j-1] + array[i-1][j]
# DEBUG
print()
for i in array:
	print(i)

# DIPLAY RESULTS AS A TRIANGLE
print("\nFINAL:")
print("     ", end="")
for i in range(1, n+1):
	ch="%5d" %(i)
	print(ch, end="")
print()

for i in range(n):
	ch="%5d" % (i+1)
	for j in range(i+1):
		ch=ch+"%5d" %array[i][j]
	print(ch)