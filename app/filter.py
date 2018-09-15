import numpy as np
from filterpy.kalman import KalmanFilter
import copy
import pickle
import datetime

#3D output through UDP
import socket
addr=('localhost', 5110)
s=socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

#The Kalman-Filter
class Filter:
    def __init__(self):
       
        self.kfilter = KalmanFilter(dim_x=4, dim_z=2)

        #Transform matrix
        self.kfilter.F = np.array([[1, 0, 1, 0],
                                   [0, 1, 0, 1],
                                   [0, 0, 1, 0],
                                   [0, 0, 0, 1]])
        self.kfilter.R = np.array([[16, 0],
                                   [0, 16]])
        #Observation matrix
        #for state vector [x, y, vx, vy] mesure [x, y]
        self.kfilter.H = np.array([[1, 0, 0, 0],
                                   [0, 1, 0, 0]])

   
    def setstate(self,x,y):
        self.kfilter.x = np.array([[x],
                                   [y],
                                   [0],
                                   [0]])

    def getstate(self):
        return np.copy(self.kfilter.x)

    def update(self, x,y):
        self.kfilter.predict()
        self.kfilter.update(np.array([[x],
                                      [y]]))

class Tracer:
    # tracerlist = list()
    # history = list()
    def __init__(self, firsttarget:dict):
        self.filter = Filter()
        self.filter.setstate(firsttarget['x'],firsttarget['y'])
       
        self.targetlist = list()
        #firsttarget.filtered_pos=copy.copy(firsttarget.transformed_pos)
        #self.add(self.filter.getstate(), firsttarget.device)
        self.targetlist.append(firsttarget)
        #self.id=len(Tracer.tracerlist)
        self.id=-1

    def trianglefix(self):
        if len(self.targetlist)>3:
            t=self.targetlist[-3:]
            x=[ts['x'] for ts in t]
            y=[ts['y'] for ts in t]
            d1=(y[2]-y[0])**2+(x[2]-x[0])**2
            d2=(y[1]-y[0])**2+(x[1]-x[0])**2
            d3=(y[2]-y[1])**2+(x[2]-x[1])**2
            if d1<0.5 and d1<d2+d3+(d2*d3)**0.5 or d1 < 0.2:
                self.targetlist.remove(self.targetlist[-2])

    def filt(self, target):
        x = target['x']
        y = target['y']
        self.filter.update(x,y)
        state = self.filter.getstate()
        target['raw_x']=x
        target['raw_y']=y
        target['x']=state[0][0]
        target['y']=state[1][0]
        #target.filtered_pos = {'x':state[0][0], 'y':state[1][0]}
        self.targetlist.append(target)
        self.trianglefix()


class TracerList:
    def __init__(self):
        self.tracerlist=list()

    def tracetarget(self, target, maxdistance=1., time_weight=0.04):
        nearestTracer = None
        nearestDistance2 = maxdistance ** 2
        for tracer in self.tracerlist:
            distance2 = (target['x'] - tracer.targetlist[-1]['x']) ** 2 \
                      + (target['y'] - tracer.targetlist[-1]['y']) ** 2 \
                      + (target['time']-tracer.targetlist[-1]['time']).total_seconds()**2*time_weight

            if distance2 < nearestDistance2:
                nearestDistance2 = distance2
                nearestTracer = tracer

        #Kalman filtering
        if(nearestTracer != None):
            nearestTracer.filt(target)

        else:
            nearestTracer = Tracer(target)
            nearestTracer.id=len(self.tracerlist)
            self.tracerlist.append(nearestTracer)

