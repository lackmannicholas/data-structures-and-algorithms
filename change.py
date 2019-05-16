# Uses python3

def get_change(m):
    coins = 0
    while m >= 10:
        coins += 1
        m -= 10

    while m >= 5:
        coins += 1
        m -= 5

    while m >= 1:
        coins += 1
        m -= 1

    return coins

if __name__ == '__main__':
    m = int(input())
    print(get_change(m))
