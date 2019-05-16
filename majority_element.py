# Uses python3
import sys
import math

def get_majority_element(a, left, right):
    if left == right:
        return -1
    if left + 1 == right:
        return a[left]

    #write your code here
    # majority = math.floor(right / 2)
    # m = a[majority]
    # f = a[left]
    # if m == f:
    #     return 1
    #
    # upper_majority = majority - 1
    # m = a[upper_majority]
    # f = a[right - 1]
    # if m == f:
    #     return 1

    i = 0
    m = 0
    for j in range(len(a)):
        if i == 0:
            m = a[j]
            i += 1
        elif m == a[j]:
            i += 1
        else:
            i -= 1

    i = 0
    for j in range(len(a)):
        if a[j] == m:
            i +=1
    l = len(a)
    if i > len(a)/2:
        return m

    return -1

if __name__ == '__main__':
    input = sys.stdin.read()
    n, *a = list(map(int, input.split()))
    # i = input()
    # a = list(map(int, i.split()))
    # a.sort()
    if get_majority_element(a, 0, len(a)) != -1:
        print(1)
    else:
        print(0)
