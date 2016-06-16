OpenWhisk Service Enablement
============================
This repository is intended to include all actions and feeds of Watson IoT Platform.

##IBM Watson IoT Platform:

[Watson IoT Platform API](https://docs.internetofthings.ibmcloud.com/swagger/v0002.html)

| Entity | Type | Parameters | Description |
| --- | --- | --- | --- |
| `/whisk.system/iot` | package | orgId, apiKey, authToken | Watson IoT Platform Package |
| `/whisk.system/iot/create_device_type` | action | see action [details](#create-device-type) | an action to create a new device  type to the IoT platform |
| `/whisk.system/iot/register_device` | action | see action [details](#register-device) | an action to add a new device to the IoT platform |
| `/whisk.system/iot/delete_device` | action | see action [details](#delete-device) | an action to delete a registered device |
| `/whisk.system/iot/send_event` | action | see action [details](#send-device-event) | an action to send device event |

###Actions:
####Create New Device Type
An action to create a new device type to the IoT platform.

#####Parameters

| **Parameter** | **Type** | **Required** | **Description**| **Options** | **Default** | **Example** |
| ------------- | ---- | -------- | ------------ | ------- | ------- |------- |
| apiKey | *string* | yes |  Watson IoT platform apiKey | - | - | "XXXXX" |
| authToken | *string* | yes |  Watson IoT platform authonToken | - | - | "XXXXXXXXX" |
| orgId | *string* | yes |  Watson IoT platform organization ID | - | - | "xvfrw1" |
| typeId | *string* | yes | Device Type ID | - | - |"sampleType" |
| serialNumber | *string* | no | The serial number of the device | - | - | "10211002XYZ" |
| manufacturer | *string* | no | The manufacturer of the device | - | - | "Texas Instruments |
| model | *string* | no | The model of the device | - | - | "HGI500" |
| deviceClass | *string* | no | The class of the device | false,true | false | false |
| description | *string* | no | The descriptive name of the device | - | - | - |
| fwVersion | *string* | no | The firmware version currently known to be on the device | - | - | "1.0" |
| hwVersion | *string* | no | The hardware version of the device | - | false | "1.0" |
| descriptiveLocation | *string* | no | A descriptive location, such as a room or building number, or a geographical region | - | - | "Office 220, building 16" |
| metadata | *object* | no | Metadata of the device | - | - | {"customField1": "customValue1","customField2": "customValue2"} |

#####Usage
To use this action, you need to pass the needed parameters (see the table above)
```bash
wsk action invoke /whisk.system/iot/create_device_type -p orgId 'xxxxx' -p apiKey 'yyyyyy' -p authToken 'zzzzzzzz' -p typeId 'Raspberry_Pi' --blocking
```
**orgId**, **apiKey** as well as **authToken** parameters can be ignored if it is already passed to the package at binding time.

Example of success reponse:
```javascript
{
     "classId": "Device",
     "createdDateTime": "2016-06-16T10:27:43+00:00",
     "deviceInfo": {},
     "id": "Raspberry_Pi",
     "updatedDateTime": "2016-06-16T10:27:43+00:00"
}
```

####Register Device
An action to register new device to Watson IoT platform.

#####Parameters

| **Parameter** | **Type** | **Required** | **Description**| **Options** | **Default** | **Example** |
| ------------- | ---- | -------- | ------------ | ------- | ------- |------- |
| apiKey | *string* | yes |  Watson IoT platform apiKey | - | - | "XXXXX" |
| authToken | *string* | yes |  Watson IoT platform authonToken | - | - | "XXXXXXXXX" |
| orgId | *string* | yes |  Watson IoT platform organization ID | - | - | "xvfrw1" |
| deviceId | *string* | yes | Device ID | - | - | "newDevice" |
| typeId | *string* | yes | Device Type ID | - | - |"sampleType" |
| deviceAuthToken | *string* | no | Device authentication token, will be generated if not supplied | - | - | "an_unhackable_token" |
| sn | *string* | no | The serial number of the device | - | - | "10211002XYZ" |
| manufacturer | *string* | no | The manufacturer of the device | - | - | "Texas Instruments |
| model | *string* | no | The model of the device | - | - | "HGI500" |
| deviceClass | *string* | no | The class of the device | false,true | false | false |
| description | *string* | no | The descriptive name of the device | - | - | - |
| fwVersion | *string* | no | The firmware version currently known to be on the device | - | - | "1.0" |
| hwVersion | *string* | no | The hardware version of the device | - | false | "1.0" |
| descriptiveLocation | *string* | no | A descriptive location, such as a room or building number, or a geographical region | - | - | "Office 220, building 16" |
| long | *decimal* | no | Longitude in decimal degrees using the WGS84 system | - | - | 9.038550 |
| lat | *decimal* | no | Latitude in decimal degrees using the WGS84 system | - | - | 48.665390 |
| elev | *decimal* | no |  Elevation in meters using the WGS84 system | - | - | 507 |
| accuracy | *decimal* | no | Accuracy of the position in meters | false,true | - | 5 |
| measuredDateTime | *string* | no | Date and time of location measurement (ISO8601) | - | - | "2016-05-19T11:36:42.825Z" |
| metadata | *object* | no | Metadata of the device | - | - | {"customField1": "customValue1","customField2": "customValue2"} |

#####Usage
To use this action, you need to pass the needed parameters (see the table above)
```bash
wsk action invoke /whisk.system/iot/register_device -p orgId 'xxxxx' -p apiKey 'yyyyyy' -p authToken 'zzzzzzzz' -p typeId 'Raspberry_Pi' -p deviceId "deviceId" --blocking
```
**orgId**, **apiKey** as well as **authToken** parameters can be ignored if it is already passed to the package at binding time.

Example of success reponse:
```javascript
{
  "authToken": "xxxxxxxxx",
  "clientId": "d:orgId:Raspberry_Pi:deviceId",
  "deviceId": "deviceId",
  "deviceInfo": {
    
  },
  "refs": {
    "diag": {
      "errorCodes": "/api/v0002/device/types/Raspberry_Pi/devices/deviceId/diag/errorCodes/",
      "logs": "/api/v0002/device/types/Raspberry_Pi/devices/deviceId/diag/logs/"
    },
    "location": "/api/v0002/device/types/Raspberry_Pi/devices/deviceId/location/"
  },
  "registration": {
    "auth": {
      "id": "apiKey",
      "type": "app"
    },
    "date": "2016-06-16T10:46:08.000Z"
  },
  "status": {
    "alert": {
      "enabled": false,
      "timestamp": "2016-06-16T10:46:08.965Z"
    }
  },
  "typeId": "Raspberry_Pi"
}
```

####Delete Device
`/whisk.system/iot/delete_device` is an action to delete a registered device.

#####Parameters:

| **Parameter** | **Type** | **Required** | **Description**| **Options** | **Default** | **Example** |
| ------------- | ---- | -------- | ------------ | ------- | ------- |------- |
| apiKey | *string* | yes |  Watson IoT platform apiKey | - | - | "XXXXX" |
| authToken | *string* | yes |  Watson IoT platform authonToken | - | - | "XXXXXXXXX" |
| orgId | *string* | yes |  Watson IoT platform organization ID | - | - | "xvfrw1" |
| deviceId | *string* | yes | Device ID | - | - | "newDevice" |
| typeId | *string* | yes | Device Type ID | - | - |"sampleType" |

#####Usage 
```bash 
wsk action invoke /whisk.system/iot/delete_device -p orgId 'xxxxxxxx' -p apiKey 'yyyyyyyy' -p authToken 'zzzzzz' -p typeId 'Raspberry_Pi' -p deviceId "deviceId" --blocking

```
**orgId**, **apiKey** as well as **authToken** parameters can be ignored if it is already passed to the package at binding time.

Example of success reponse:
```javascript
{
  "success": "device deleted"
}
```

####Send Device Event
`/whisk.system/iot/send_event` is an action to send events on behalf of a device ( simplatuing a device) to Watson iot Platform.

#####Parameters

| **Parameter** | **Type** | **Required** | **Description**| **Options** | **Default** | **Example** |
| ------------- | ---- | -------- | ------------ | ------- | ------- |------- |
| apiKey | *string* | yes |  Watson IoT platform apiKey | - | - | "XXXXX" |
| authToken | *string* | yes |  Watson IoT platform authonToken | - | - | "XXXXXXXXX" |
| orgId | *string* | yes |  Watson IoT platform organization ID | - | - | "xvfrw1" |
| deviceId | *string* | yes | Device ID | - | - | "newDevice" |
| typeId | *string* | yes | Device Type ID | - | - |"sampleType" |
| eventName | *string* | yes | Event name | - | - | "temperature" |
| eventBody | *string* | yes | Event Data | - | - |"{'temperature':'42'}" |

#####Usage
```bash 

wsk action invoke /whisk.system/iot/delete_device -p orgId 'xxxxx' -p apiKey 'yyyyyyyyy' -p authToken 'zzzzzzz' -p typeId 'sampleiot' -p deviceId "TareqDevice44" --blocking
```
**orgId**, **apiKey** as well as **authToken** parameters can be ignored if it is already passed to the package at binding time.

Example of success reponse:
```javascript
{
  "success":"event is sent"
}
```
