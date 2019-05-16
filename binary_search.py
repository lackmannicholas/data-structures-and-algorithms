# Uses python3
import sys
import math

def binary_search(a, left, right, x):
    #left, right = 0, len(a)
    # write your code here
    if right < left:
        return -1

    mid = math.floor(left + ((right-left)/2))

    if x == a[mid]:
        return mid
    elif x < a[mid]:
        return binary_search(a, left, mid-1, x)
    else:
        return binary_search(a, mid+1, right, x)


def linear_search(a, x):
    for i in range(len(a)):
        if a[i] == x:
            return i
    return -1

if __name__ == '__main__':
    i = sys.stdin.read()
    data = list(map(int, i.split()))
    n = data[0]
    m = data[n + 1]
    a = data[1 : n + 1]
    for x in data[n + 2:]:
        # replace with the call to binary_search when implemented
        print(binary_search(a, 0, len(a) - 1, x), end = ' ')
