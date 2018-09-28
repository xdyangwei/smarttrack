import socket
import pickle
import time

import math
import random


class Reporter:
    def __init__(self, ip, port):
        self.sock = socket.socket()
        self.sock.connect((ip, port))

    def report(self, data: dict):
        if type(data) != dict:
            raise TypeError('require dict')
        self.sock.send(pickle.dumps(data))


remote_ip = '120.78.71.220'
# remote_ip = 'localhost'

if __name__ == "__main__":
    rp = Reporter(remote_ip, 9090)
    rp.report({'data': 'AUTH', 'auth': {'name': 'emu', 'auth': '123456'}})
    time.sleep(0.05)
    rp.report({'x': 0, 'y': 0})
    time.sleep(0.05)
    rp.report({'x': 1, 'y': 1})
    time.sleep(0.05)
    rp.report({'x': 2, 'y': 2})

    i = 0
    while True:
        x = math.sin(i*0.01)*3+4+random.random()*2-1
        y = -(math.cos(i*0.01)*4+5+random.random()*2-1)
        time.sleep(0.05)
        print(x, y)
        rp.report({'x': x, 'y': y})
        i += 1
