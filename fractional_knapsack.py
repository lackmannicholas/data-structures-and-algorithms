# Uses python3
import sys

def get_optimal_value(capacity, weights, values):
    value = 0.
    i = 0
    vw = []
    # write your code here
    while i < len(weights):
        vw.append([values[i]/weights[i], weights[i]])
        i += 1
    i = 0
    vw.sort(key=lambda x: x[0], reverse=True)
    while capacity > 0 and i < len(vw):
        if vw[i][1] >= capacity:
            value += capacity * vw[i][0]
            capacity -= capacity

        elif vw[i][1] < capacity:
            value += vw[i][1] * vw[i][0]
            capacity -= vw[i][1]
        i += 1
    return value


if __name__ == "__main__":
    data = list(map(int, sys.stdin.read().split()))
    n, capacity = data[0:2]
    values = data[2:(2 * n + 2):2]
    weights = data[3:(2 * n + 2):2]
    opt_value = get_optimal_value(capacity, weights, values)
    print("{:.10f}".format(opt_value))
