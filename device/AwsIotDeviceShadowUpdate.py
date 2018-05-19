
# coding: utf-8

# In[1]:


certificate_folder = "C:/Users/Tomonobu/Documents/home/Keyence/RaspPiIot/証明書_TestVirtualMachine/"


# In[2]:


filepath_route_ca    = certificate_folder + "VeriSign-Class 3-Public-Primary-Certification-Authority-G5.pem"
filepath_private_key = certificate_folder + "0f19545793-private.pem.key"
filepath_certificate = certificate_folder + "0f19545793-certificate.pem.crt"


# In[3]:


aws_deviceid = "test_vm_ubuntu2"
endpoint = "a3i29lc4oae1iw.iot.ap-northeast-1.amazonaws.com"

from enum import Enum
class Signal_State(Enum):
    R_STOP = 1
    YY_WARNING = 2
    Y_CAUTION = 3
    YG_DECEL = 4
    Y_GO = 5


# In[4]:


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


# In[5]:


Ctrl_Values = {
    'Ctrl_Val0':0, 
    'Ctrl_Val1':1,
    'Ctrl_Val2':2,
    'Ctrl_Val3':3}

State_Values = {
    'State_Val0':0, 
    'State_Val1':1,
    'State_Val2':2,
    'State_Val3':3}    

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

    for k, v in payloadDict["state"].items():
        Ctrl_Values[k] = int(v)
    


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
JSONPayload = '{"state":{"desired":{"Ctrl_Val0":' + str(Ctrl_Values['Ctrl_Val0']) + ','                                     + '"Ctrl_Val1":' + str(Ctrl_Values['Ctrl_Val1']) + ','                                     + '"Ctrl_Val2":' + str(Ctrl_Values['Ctrl_Val2']) + ','                                     + '"Ctrl_Val3":' + str(Ctrl_Values['Ctrl_Val3'])                 + '}}}'
deviceShadowHandler.shadowUpdate(JSONPayload, customShadowCallback_Update, 5)


# Update shadow in a loop
loopCount = 0
while True:
    JSONPayload = '{"state":{"reported":{"Ctrl_Val0":' + str(Ctrl_Values['Ctrl_Val0']) + ','                                         + '"Ctrl_Val1":' + str(Ctrl_Values['Ctrl_Val1']) + ','                                         + '"Ctrl_Val2":' + str(Ctrl_Values['Ctrl_Val2']) + ','                                         + '"Ctrl_Val3":' + str(Ctrl_Values['Ctrl_Val3']) + ','                                         + '"State_Val0":' + str(State_Values['State_Val0']) + ','                                         + '"State_Val1":' + str(State_Values['State_Val1']) + ','                                         + '"State_Val2":' + str(State_Values['State_Val2']) + ','                                         + '"State_Val3":' + str(State_Values['State_Val3'])                     + '}}}'
    print(JSONPayload)
    deviceShadowHandler.shadowUpdate(JSONPayload, customShadowCallback_Update, 5)
    State_Values['State_Val0'] += 1
    State_Values['State_Val2'] += 2
    time.sleep(1)

