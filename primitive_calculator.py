# Uses python3
import sys

def get_matrix():
    matrix = []



    return matrix


def optimal_sequence(n):
    v = [0] * (n + 1)  # so that v[n] is there
    v[1] = 1  # length of the sequence to 1 is 1
    for i in range(1, n + 1):
        if not v[i]: continue
        if v[i + 1] == 0 or v[i + 1] > v[i] + 1:
            v[i + 1] = v[i] + 1
        if v[i + 1] == 0 or v[i + 1] > v[i] * 2:
                v[i + 1] = v[i] * 2
        if v[i + 1] == 0 or v[i + 1] > v[i] * 3:
                    v[i + 1] = v[i] * 3
        # Similar for i*2 and i*3

    solution = []
    while n > 1:
        solution.append(n)
        if v[n - 1] == v[n] - 1: n = n - 1
        if n % 2 == 0 and v[n // 2] == v[n] - 1: n = n // 2
        # Likewise for n//3
    solution.append(1)


    # sequence = []
    # ops = []
    # ops[0] = 0
    # for m in range(1, n):
    #     ops[m] = 0
    #     for i in range(1, 3):
    #         if m * 3 <= n:
    #             val =

    # while n >= 1:
    #     sequence.append(n)
    #     if n % 3 == 0:
    #         n = n // 3
    #     elif n % 2 == 0:
    #         n = n // 2
    #     else:
    #         n = n - 1
    # return reversed(sequence)

#input = sys.stdin.read()
n = int(input())
sequence = list(optimal_sequence(n))
print(len(sequence) - 1)
for x in sequence:
    print(x, end=' ')
