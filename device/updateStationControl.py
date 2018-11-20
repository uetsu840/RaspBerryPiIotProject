from __future__ import print_function
import socket
from contextlib import closing

import struct


class UpdateStationControl():
    def __init__(self, host, port, index):
        self.CODESYS_GVL_HEADER_SIZE = 20
        self.counter = 0
        self.send_cnt = 0
        self.index = index
        self.host = host
        self.port = port
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def generate_codesys_gvl_packet(self,  
                                    signal_lever_status,
                                    switch_lever_nml,
                                    switch_lever_rev):
        item_num = 48
        length = self.CODESYS_GVL_HEADER_SIZE + 96
        packet = struct.pack('b', 0) + \
                    struct.pack('3s', '-S3'.encode('utf-8')) + \
                    struct.pack('<I', 0) + \
                    struct.pack('<HH', self.index, 0) + \
                    struct.pack('<HHH', item_num, length, self.counter) + \
                    struct.pack('<bb', 0, 0) + \
                    struct.pack('<16H', *signal_lever_status) + \
                    struct.pack('<16H', *switch_lever_nml) + \
                    struct.pack('<16H', *switch_lever_rev) 
        return packet

    def update(self, signal_lever_status, switch_lever_nml, switch_lever_rev):
        senddata = self.generate_codesys_gvl_packet( 
            signal_lever_status,
            switch_lever_nml,
            switch_lever_rev);
        self.counter = self.counter + 1

        self.sock.sendto(senddata, (self.host, self.port))


