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
    -a description "Package which contains actions and a feed for IoT IoT Platform and Real-Time insights services"

waitForAll

install "$CATALOG_HOME/iot/rti_webhook.js" \
    github/webhook \
    -a feed true \
    -a description 'Creates a rule and an RTI action to get messages whenever the condition is met' \

waitForAll

echo IoT package ERRORS = $ERRORS
exit $ERRORS
