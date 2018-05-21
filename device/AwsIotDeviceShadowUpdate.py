
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

switch_list = ["11", "12", "21", "22"]
signal_list = ["1R", "2R", "3R", "1L", "2L", "3L"]

def makeSwitchObject(id, name, position):
    switch = {
        "id"       : id,
        "name"     : name,
        "position" : position
    }
    return switch

def makeSignalObject(id, name):
    signal = {
        "id"         : id,
        "name"       : name,
        "position"   : 0,
        "indication" : 0
    }
    return signal


def initObject():
    global State_Values
    switches = []
    signals  = []
    id = 0
    for switch_name in switch_list:
        switches.append(makeSwitchObject(id, switch_name, 0))
        id += 1
    for signal_name in signal_list:
        signals.append(makeSignalObject(id, signal_name))
        id += 1
    State_Values = {
        "signal" : signals,
        "switch" : switches
    }
initObject()



# In[7]:


JSONPayload = '{"state":{"reported":'+json.dumps(State_Values)+'}}'


# In[ ]:



# Custom Shadow callback
def customShadowCallback_Delta(payload, responseStatus, token):
    global Ctrl_Values
    
    # payload is a JSON string ready to be parsed using json.loads(...)
    # in both Py2.x and Py3.x
    print(responseStatus)
    payloadDict = json.loads(payload)
    print(payload)
    print("++++++++DELTA++++++++++")
    print("version: " + str(payloadDict["version"]))
    print("+++++++++++++++++++++++\n\n")

    for k, v in payloadDict["state"]["switch"].items():
        Ctrl_Values["switch"][k] = int(v)
    


# In[ ]:


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
    JSONPayload = '{"state":{"reported":'+json.dumps(State_Values)+'}}'
    deviceShadowHandler.shadowUpdate(JSONPayload, customShadowCallback_Update, 5)

    
    if switch_loop_count < 20: 
        State_Values['switch'][2]['position'] = 1
        State_Values['switch'][3]['position'] = 1
    elif switch_loop_count < 40:
        State_Values['switch'][2]['position'] = 0
        State_Values['switch'][3]['position'] = 0
    else:
        switch_loop_count = 0

    if signal_loop_count < 20: 
        State_Values['signal'][0]['indication'] = 0
        State_Values['signal'][1]['indication'] = 0
    elif signal_loop_count < 40:
        State_Values['signal'][0]['indication'] = 1
        State_Values['signal'][1]['indication'] = 1
    elif signal_loop_count < 60:
        State_Values['signal'][0]['indication'] = 2
        State_Values['signal'][1]['indication'] = 2
    else:
        signal_loop_count = 0
        
        
    time.sleep(1)

