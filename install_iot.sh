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

#!/bin/bash
#
# use the command line interface to install Git package.
#
: ${WHISK_SYSTEM_AUTH:?"WHISK_SYSTEM_AUTH must be set and non-empty"}
AUTH_KEY=$WHISK_SYSTEM_AUTH

SCRIPTDIR="$(cd $(dirname "$0")/ && pwd)"
CATALOG_HOME=$SCRIPTDIR
source "$CATALOG_HOME/util.sh"

echo Installing IoT Platform and Real-Time insights .

createPackage iot \
    -a description "Package which contains actions Watson IoT Platform service"

waitForAll

install "$CATALOG_HOME/iot/create_device_type.js" \
    iot/create_device_type \
    -a description 'Create new device Type in Watson IoT platform' \
    -a parameters '[{
    "name": "apiKey",
    "required": true,
    "bindTime": true
}, {
    "name": "authToken",
    "required": true,
    "bindTime": true
}, {
    "name": "orgId",
    "required": true,
    "bindTime": true
}, {
    "name": "typeId",
    "required": true,
    "bindTime": true
},
{
    "name": "serialNumber",
    "required": false,
    "bindTime": false
}, {
    "name": "manufacturer",
    "required": false,
    "bindTime": false
}, {
    "name": "model",
    "required": false,
    "bindTime": false
}, {
    "name": "deviceClass",
    "required": false,
    "bindTime": false
},{
    "name": "description",
    "required": false,
    "bindTime": false
},{
    "name": "fwVersion",
    "required": false,
    "bindTime": false
},{
    "name": "hwVersion",
    "required": false,
    "bindTime": false
},{
    "name": "descriptiveLocation",
    "required": false,
    "bindTime": false
},{
    "name": "metadata",
    "required": false,
    "bindTime": false
}]' \
    -a sampleInput '{
    "apiKey": "XXXXXX",
    "authToken": "YYYYYY",
    "orgId": "ZZZZ",
    "typeId": "Raspberry_Pi"
}'

waitForAll

echo IoT package ERRORS = $ERRORS
exit $ERRORS
