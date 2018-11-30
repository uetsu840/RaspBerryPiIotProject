
# coding: utf-8

# In[1]:


import json
from enum import Enum




# In[2]:


certificate_folder = "C:/Users/Tomonobu/Documents/home/Keyence/RaspPiIot/証明書_TestVirtualMachine/"


# In[3]:


filepath_route_ca    = certificate_folder + "VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem"
filepath_private_key = certificate_folder + "0f19545793-private.pem.key"
filepath_certificate = certificate_folder + "0f19545793-certificate.pem.crt"


# In[4]:


aws_deviceid = "test_vm_ubuntu2"
endpoint = "a3i29lc4oae1iw.iot.ap-northeast-1.amazonaws.com"


class Signal_State(Enum):
    R_STOP = 1
    YY_WARNING = 2
    Y_CAUTION = 3
    YG_DECEL = 4
    Y_GO = 5


# In[5]:


# Custom Shadow callback
def customShadowCallback_Update(payload, responseStatus, token):
    # payload is a JSON string ready to be parsed using json.loads(...)
    # in both Py2.x and Py3.x
    if responseStatus == "timeout":
        print("Update request " + token + " time out!")
    if responseStatus == "accepted":
        payloadDict = json.loads(payload)
    if responseStatus == "rejected":
        print("Update request " + token + " rejected!")

def customShadowCallback_Delete(payload, responseStatus, token):
    if responseStatus == "timeout":
        print("Delete request " + token + " time out!")
    if responseStatus == "accepted":
        print("~~~~~~~~~~~~~~~~~~~~~~~")
        print("Delete request with token: " + token + " accepted!")
        print("~~~~~~~~~~~~~~~~~~~~~~~\n\n")
    if responseStatus == "rejected":
        print("Delete request " + token + " rejected!")


# In[6]:


# 定位・反位(英語)
# normal position･reverse position

switch_list = [["31", "1-2番線幡生方"],
               ["21", "1-2番線京都方"]]
signal_list = [["2R", "1番上り場内"],
               ["3R", "2番上り出発"],
               ["4R", "1番上り場内"],
               ["5R", "2番上り出発"],
               ["2L", "1番下り場内"],
               ["3L", "2番下り出発"],
               ["4L", "1番下り場内"],
               ["5L", "2番下り出発"]]
section_list = [["31T", "分岐器31"],
                ["21T", "分岐器21"],
                ["2R", "2番線"],
                ["5R", "1番線"]]

def makeSwitchStateObject(id, switch, position):
    switch = {
        "id"          : id,
        "name"        : switch[0],
        "description" : switch[1],
        "position"    : position,
    }
    return switch

def makeSignalStateObject(id, signal):
    signal = {
        "id"          : id,
        "name"        : signal[0],
        "description" : signal[1],
        "position"    : 0,
        "indication"  : 0
    }
    return signal

def makeSectionStateObject(id, section, state):
    section = {
        "id"          : id,
        "name"        : section[0],
        "description" : section[1],
        "state"       : state
    }
    return section

def makeSwitchControlObject(switch, turndir):
    switch = {
        "name"        : switch[0] + turndir,
        "lever_pos"   : 0,
    }
    return switch

def makeSignalControlObject(signal):
    signal = {
        "name"        : signal[0],
        "lever_pos"   : 0,
    }
    return signal


def initObject():
    global State_Values
    switch_state = []
    signal_state  = []
    section_state = []
    switch_ctrl = []
    signal_ctrl = []
    id = 0
    for switch_name in switch_list:
        switch_state.append(makeSwitchStateObject(id, switch_name, 0))
        switch_ctrl.append(makeSwitchControlObject(switch_name, "Nml"))
        switch_ctrl.append(makeSwitchControlObject(switch_name, "Rev"))
        id += 1
    for signal_name in signal_list:
        signal_state.append(makeSignalStateObject(id, signal_name))
        signal_ctrl.append(makeSignalControlObject(signal_name))
        id += 1
    for section_info in section_list:
        section_state.append(makeSectionStateObject(id, section_info, 0))
        id += 1
    State_Values = {
        "signal_state" : signal_state,
        "signal_ctrl"  : signal_ctrl,
        "switch_state" : switch_state,
        "switch_ctrl"  : switch_ctrl,
        "section_state": section_state
    }
initObject()



# In[7]:


JSONPayload = '{"state":{"reported":'+json.dumps(State_Values)+'}}'


# In[8]:


from updateStationStatus import UpdateStationStatus
CodesysStationStatus = UpdateStationStatus('127.0.0.1', 1202, 1)

def setSwitchStatusByName(state_val, name, pos):
    for switch_status in state_val['switch_state']:
        if switch_status["name"] == name:
            switch_status["position"] = pos

def setSignalStatusByName(state_val, name, pos):
    for signal_status in state_val["signal_state"]:
        if signal_status["name"] == name:
            signal_status["position"] = pos

def setSectionStatusByName(state_val, section_name, state):
    for section_status in state_val["section_state"]:
        if section_status["name"] == section_name:
            section_status["state"] = state
        
            
def updateStationStatus():
    global State_Values
    global CodesysStationStatus
    
    CodesysStationStatus.update()
    setSignalStatusByName(State_Values, "2R", CodesysStationStatus.signal_status[0])
    setSignalStatusByName(State_Values, "3R", CodesysStationStatus.signal_status[1])
    setSignalStatusByName(State_Values, "4R", CodesysStationStatus.signal_status[2])
    setSignalStatusByName(State_Values, "5R", CodesysStationStatus.signal_status[3])
    setSignalStatusByName(State_Values, "2L", CodesysStationStatus.signal_status[4])
    setSignalStatusByName(State_Values, "3L", CodesysStationStatus.signal_status[5])
    setSignalStatusByName(State_Values, "4L", CodesysStationStatus.signal_status[6])
    setSignalStatusByName(State_Values, "5L", CodesysStationStatus.signal_status[7])

    setSwitchStatusByName(State_Values, "31", CodesysStationStatus.switch_status[0])
    setSwitchStatusByName(State_Values, "21", CodesysStationStatus.switch_status[1])
    
    setSectionStatusByName(State_Values, "31T", CodesysStationStatus.section_status[0])
    setSectionStatusByName(State_Values, "21T", CodesysStationStatus.section_status[1])
    setSectionStatusByName(State_Values, "2R", CodesysStationStatus.section_status[2])
    setSectionStatusByName(State_Values, "5R", CodesysStationStatus.section_status[3])
    


# In[9]:


# CODESYS との IF

from updateStationControl import UpdateStationControl

CodesysControlStatus = UpdateStationControl('127.255.255.255', 1203, 2)

def searchSwitchLeverPosByName(state_val, name):
    for switch_ctrl in state_val['switch_ctrl']:
        if switch_ctrl["name"] == name:
            return switch_ctrl["lever_pos"]
    return None

def searchSignalLeverPosByName(state_val, name):
    for signal_ctrl in state_val["signal_ctrl"]:
        if signal_ctrl["name"] == name:
            return signal_ctrl["lever_pos"]
    return None
    

def updateCtrlStatus():
    global State_Values
    global CodesysControlStatus

    signal_lever_status = [0 for i in range(16)]
    switch_lever_nml = [0 for i in range(16)]
    switch_lever_rev = [0 for i in range(16)]
    
    signal_lever_status[0] = searchSignalLeverPosByName(State_Values, "2R")
    signal_lever_status[1] = searchSignalLeverPosByName(State_Values, "3R")
    signal_lever_status[2] = searchSignalLeverPosByName(State_Values, "4R")
    signal_lever_status[3] = searchSignalLeverPosByName(State_Values, "5R")
    signal_lever_status[4] = searchSignalLeverPosByName(State_Values, "2L")
    signal_lever_status[5] = searchSignalLeverPosByName(State_Values, "3L")
    signal_lever_status[6] = searchSignalLeverPosByName(State_Values, "4L")
    signal_lever_status[7] = searchSignalLeverPosByName(State_Values, "5L")
        
    switch_lever_nml[0] = searchSwitchLeverPosByName(State_Values, "31Nml")
    switch_lever_nml[1] = searchSwitchLeverPosByName(State_Values, "21Nml")
    switch_lever_rev[0] = searchSwitchLeverPosByName(State_Values, "31Rev")
    switch_lever_rev[1] = searchSwitchLeverPosByName(State_Values, "21Rev")
    
    CodesysControlStatus.update(signal_lever_status, switch_lever_nml, switch_lever_rev)
    


# In[10]:


# Custom Shadow callback
def customShadowCallback_Delta(payload, responseStatus, token):
    global State_Values
    
    # payload is a JSON string ready to be parsed using json.loads(...)
    # in both Py2.x and Py3.x
    payloadDict = json.loads(payload)
    
    if "signal_ctrl" in payloadDict["state"]:
        State_Values["signal_ctrl"] = payloadDict["state"]["signal_ctrl"]
    if "switch_ctrl" in payloadDict["state"]:
        State_Values["switch_ctrl"] = payloadDict["state"]["switch_ctrl"]
    
    updateCtrlStatus()
    


# In[11]:


from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTShadowClient
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient

import logging
import time
import json
import argparse

myAWSIoTMQTTShadowClient = AWSIoTMQTTShadowClient(aws_deviceid)
myAWSIoTMQTTShadowClient.configureEndpoint(endpoint, 8883)
myAWSIoTMQTTShadowClient.configureCredentials(filepath_route_ca, filepath_private_key, filepath_certificate)

# AWSIoTMQTTShadowClient configuration
myAWSIoTMQTTShadowClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTShadowClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTShadowClient.configureMQTTOperationTimeout(5)  # 5 sec

# Connect to AWS IoT
myAWSIoTMQTTShadowClient.connect()

# MQTTClient = myAWSIoTMQTTShadowClient.getMQTTConnection()
# MQTTClient.configureOfflinePublishQueueing(yourQueueSize, yourDropBehavior)

# Create a deviceShadow with persistent subscription
deviceShadowHandler = myAWSIoTMQTTShadowClient.createShadowHandlerWithName("test_vm_ubuntu_2", True)

# Delete shadow JSON doc
deviceShadowHandler.shadowDelete(customShadowCallback_Delete, 5)

# Create a deviceShadow with persistent subscription
# deviceShadowHandler = myAWSIoTMQTTShadowClient.createShadowHandlerWithName("MyBot", True)

# Listen on deltas
deviceShadowHandler.shadowRegisterDeltaCallback(customShadowCallback_Delta)

# Update shadow desired init state
JSONPayload = '{"state":{"reported":'+json.dumps(State_Values)+'}}'
deviceShadowHandler.shadowUpdate(JSONPayload, customShadowCallback_Update, 5)


# Update shadow in a loop
switch_loop_count = 0
signal_loop_count = 0
while True:
    switch_loop_count += 1
    signal_loop_count += 1
    updateStationStatus()

    JSONPayload = '{"state":{"reported":'+json.dumps(State_Values)+'}}'
    deviceShadowHandler.shadowUpdate(JSONPayload, customShadowCallback_Update, 5)
    updateCtrlStatus()

    time.sleep(0.5)

