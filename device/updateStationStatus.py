from __future__ import print_function
import socket
from contextlib import closing
import struct


class UpdateStationStatus():
    def __init__(self, host, port, index):
        self.CODESYS_GVL_HEADER_SIZE = 20
        self.counter = 0
        self.send_cnt = 0
        self.bufsize = 1500
        self.index = index
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        
        self.signal_display    =  [0 for i in range(16)]
        self.signal_satus      =  [0 for i in range(16)]
        self.signal_locked_nml =  [0 for i in range(16)]
        self.singal_locked_rev =  [0 for i in range(16)]
        self.switch_status     =  [0 for i in range(16)]
        self.switch_locked_nml =  [0 for i in range(16)]
        self.switch_locked_rev =  [0 for i in range(16)]        
        
        self.sock.bind((self.host, self.port))

    def decode_station_statswitch_locked_revus(self):
        self.signal_display    = struct.unpack('<16H', self.data[20     :20+32*1])
        self.signal_satus      = struct.unpack('<16H', self.data[20+32*1:20+32*2])
        self.signal_locked_nml = struct.unpack('<16H', self.data[20+32*2:20+32*3])
        self.singal_locked_rev = struct.unpack('<16H', self.data[20+32*3:20+32*4])
        self.switch_status     = struct.unpack('<16H', self.data[20+32*4:20+32*5])
        self.switch_locked_nml = struct.unpack('<16H', self.data[20+32*5:20+32*6])
        self.switch_locked_rev = struct.unpack('<16H', self.data[20+32*6:20+32*7])

    def update(self):
        self.data  = self.sock.recv(self.bufsize)
        self.decode_station_statswitch_locked_revus()
 
