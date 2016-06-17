#!/bin/bash

#/
# Copyright 2015-2016 IBM Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#/

set -e
set -x

echo Installing Watson IoT Platform Package \

$WSK_CLI --apihost "$APIHOST" action update --auth "$AUTH" --shared yes iot \
    -a description "Watson IoT Platform Service Package" \
    -a parameters '[ {"name":"apiKey", "required": false, "bindTime": false}, {"name":"authToken", "required": false, "bindTime": false}, {"name":"orgId", "required": false, "bindTime": false}]'

$WSK_CLI --apihost "$APIHOST" action update --auth "$AUTH" --shared yes iot/create_device_type "iot/create_device_type.js" \
    -a description 'Create new device Type in Watson IoT platform' \
    -a parameters '[{ "name": "apiKey", "required": true, "bindTime": true }, { "name": "authToken", "required": true, "bindTime": true }, { "name": "orgId", "required": true, "bindTime": true }, { "name": "typeId", "required": true, "bindTime": true }, { "name": "serialNumber", "required": false, "bindTime": false }, { "name": "manufacturer", "required": false, "bindTime": false }, { "name": "model", "required": false, "bindTime": false }, { "name": "deviceClass", "required": false, "bindTime": false },{ "name": "description", "required": false, "bindTime": false },{ "name": "fwVersion", "required": false, "bindTime": false },{ "name": "hwVersion", "required": false, "bindTime": false },{ "name": "descriptiveLocation", "required": false, "bindTime": false },{ "name": "metadata", "required": false, "bindTime": false }]' \
    -a sampleInput '{ "apiKey": "XXXXXX", "authToken": "YYYYYY", "orgId": "ZZZZ", "typeId": "Raspberry_Pi" }'
    -a sampleOutput '{"classId":"Device","createdDateTime":"2016-06-16T10:27:43+00:00","deviceInfo":{},"id":"Raspberry_Pi","updatedDateTime":"2016-06-16T10:27:43+00:00"}'

$WSK_CLI --apihost "$APIHOST" action update --auth "$AUTH" --shared yes iot/register_device "iot/register_device.js" \
    -a description 'Register new device to Watson IoT platform' \
    -a parameters '[{"name":"apiKey","required":true,"bindTime":true},{"name":"authToken","required":true,"bindTime":true},{"name":"orgId","required":true,"bindTime":true},{"name":"deviceId","required":true,"bindTime":true},{"name":"typeId","required":true,"bindTime":true},{"name":"deviceAuthToken","required":false,"bindTime":false},{"name":"sn","required":false,"bindTime":false},{"name":"manufacturer","required":false,"bindTime":false},{"name":"model","required":false,"bindTime":false},{"name":"deviceClass","required":false,"bindTime":false},{"name":"description","required":false,"bindTime":false},{"name":"fwVersion","required":false,"bindTime":false},{"name":"hwVersion","required":false,"bindTime":false},{"name":"descriptiveLocation","required":false,"bindTime":false},{"name":"long","required":false,"bindTime":false},{"name":"lat","required":false,"bindTime":false},{"name":"elev","required":false,"bindTime":false},{"name":"accuracy","required":false,"bindTime":false},{"name":"measuredDateTime","required":false,"bindTime":false},{"name":"metadata","required":false,"bindTime":false}]' \
    -a sampleInput '{ "apiKey": "XXXXXX", "authToken": "YYYYYY", "orgId": "ZZZZ", "typeId": "Raspberry_Pi" ,"deviceId":"deviceId" }'
    -a sampleOutput '{"authToken":"xxxxxxxxx","clientId":"d:orgId:Raspberry_Pi:deviceId","deviceId":"deviceId","deviceInfo":{},"refs":{"diag":{"errorCodes":"/api/v0002/device/types/Raspberry_Pi/devices/deviceId/diag/errorCodes/","logs":"/api/v0002/device/types/Raspberry_Pi/devices/deviceId/diag/logs/"},"location":"/api/v0002/device/types/Raspberry_Pi/devices/deviceId/location/"},"registration":{"auth":{"id":"apiKey","type":"app"},"date":"2016-06-16T10:46:08.000Z"},"status":{"alert":{"enabled":false,"timestamp":"2016-06-16T10:46:08.965Z"}},"typeId":"Raspberry_Pi"}'

$WSK_CLI --apihost "$APIHOST" action update --auth "$AUTH" --shared yes iot/delete_device "iot/delete_device.js" \
    -a description 'Delete a registered device.' \
    -a parameters '[{ "name": "apiKey", "required": true, "bindTime": true }, { "name": "authToken", "required": true, "bindTime": true }, { "name": "orgId", "required": true, "bindTime": true }, { "name": "typeId", "required": true, "bindTime": true }, { "name": "deviceId", "required": true, "bindTime": true }]' \
    -a sampleInput '{ "apiKey": "XXXXXX", "authToken": "YYYYYY", "orgId": "ZZZZ", "typeId": "Raspberry_Pi", "deviceId":"deviceId"}'
    -a sampleOutput '{"success":"device deleted"}'

$WSK_CLI --apihost "$APIHOST" action update --auth "$AUTH" --shared yes iot/send_event "iot/send_event.js" \
    -a description 'Send events on behalf of a device (simplatuing a device) to Watson iot Platform.' \
    -a parameters '[{"name":"apiKey","required":true,"bindTime":true},{"name":"authToken","required":true,"bindTime":true},{"name":"orgId","required":true,"bindTime":true},{"name":"typeId","required":true,"bindTime":true},{"name":"deviceId","required":true,"bindTime":true},{"name":"eventName","required":true,"bindTime":true},{"name":"eventBody","required":true,"bindTime":true}]' \
    -a sampleInput '{"apiKey":"XXXXXX","authToken":"YYYYYY","orgId":"ZZZZ","typeId":"Raspberry_Pi","deviceId":"deviceId","eventName":"temperature","{value:42}"}'
    -a sampleOutput '{"success":"device deleted"}'
