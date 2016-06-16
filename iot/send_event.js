/*
 * Copyright 2015-2016 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var request = require('request');

/**
 * Send an event simulating a device.
 * @param      {string}  apiKey    (required)  Watson IoT platform apiKey
 * @param      {string}  authToken (required)  Authentication token of an Watson IoT platform
 * @param      {string}  orgId     (required)  IoT platform Organization Id
 * @param      {string}  typeId    (required)  Watson IoT platform apiKey
 * @param      {string}  deviceId  (required)  Authentication token of an Watson IoT platform
 * @param      {string}  eventName (required)  Event Name
 * @param      {string}  eventBody (required)  Event Data
 * @return     {Object}                        Done with the result of invokation
 **/
function main(params) {
    var requiredParams = ["apiKey", "authToken", 'orgId', 'typeId', 'deviceId', 'eventName', 'eventBody'];

    checkParameters(params, requiredParams, function (missingParams) {
        if (missingParams != "") {
            console.error("Missing required parameters: " + missingParams);
            return whisk.error("Missing required parameters: " + missingParams);
        } else {
            var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

            var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.authToken).toString("base64");

            var options = {
                method: 'POST',
                url: baseUrl + '/application/types/' + params.typeId + '/devices/' + params.deviceId + '/events/' + params.eventName,
                body: params.eventBody,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationHeader
                }
            };

            request(options, function(err, res, body) {
                if (!err && res.statusCode === 200) {
                  console.log(body);
                    whisk.done({"success":"event is sent"});
                } else {
                    whisk.error({
                        statusCode: (res || {}).statusCode,
                        error: err,
                        body: body
                    });
                }
            });
        }
    });
    return whisk.async();
}

/**
 *  A function that check whether the parameters passed are required or not
 *
 * @param      {object}    params    An object contains the parameter required
 *                                   in order to check it and generate a string
 *                                   that contains a list of missing parameters
 * @param      {Function}  callback  the callback function has the generated
 *                                   array or an empyt one if the params is
 *                                   empty or nothing is missing
 */
function checkParameters(params, requiredParams, callback) {
    console.log("Checking Existiance of Required Parameters");
    var missingParams = [];
    for (var i = requiredParams.length - 1; i >= 0; i--) {
      console.log(requiredParams[i]);
        if (!params.hasOwnProperty(requiredParams[i])) {
            missingParams.push(requiredParams[i]);
        }
        if (i == 0)
            return callback(missingParams);
    }
}