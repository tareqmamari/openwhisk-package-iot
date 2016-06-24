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
 * An action to register new device to Watson IoT platform.
 * @param      {string}  apiKey                    (required)  Watson IoT platform apiKey
 * @param      {string}  apiToken                  (required)  Authentication token of an Watson IoT platform
 * @param      {string}  orgId                     (required)  IoT platform Organization Id
 * @param      {string}  deviceId                  (required)  Device Name/Id
 * @param      {string}  typeId                    (required)  Device Type Id
 * @param      {string}  deviceAuthToken           (optional)  Device authentication token, default: system will generate one
 * @param      {string}  serialNumber              (optional)  Serial number of the device
 * @param      {string}  manufacturer              (optional)  Manufacturer of the device
 * @param      {string}  model                     (optional)  Model of the device
 * @param      {string}  deviceClass               (optional)  Class of the device
 * @param      {string}  description               (optional)  Descriptive name of the device
 * @param      {string}  fwVersion                 (optional)  Firmware version currently known to be on the device
 * @param      {string}  hwVersion                 (optional)  Hardware version of the device
 * @param      {string}  descriptiveLocation       (optional)  Descriptive location, such as a room or building number, or a geographical region
 * @param      {decimal} long                      (optional)  Longitude in decimal degrees using the WGS84 system
 * @param      {decimal} lat                       (optional)  Latitude in decimal degrees using the WGS84 system
 * @param      {decimal} elev                      (optional)  Elevation in meters using the WGS84 system
 * @param      {decimal} accuracy                  (optional)  Accuracy of the position in meters
 * @param      {string}  measuredDateTime          (optional)  Date and time of location measurement (ISO8601)
 * @param      {object}  metadata                  (optional)  Metadata of the device
 * @return     {Object}                                        Done with the result of invokation
 **/
function main(params) {

    var requiredParams = ["apiKey", "apiToken", 'orgId', 'typeId', 'deviceId'];

    checkParameters(params, requiredParams, function(missingParams) {
        if (missingParams != "") {
            console.error("Missing required parameters: " + missingParams);
            return whisk.error("Missing required parameters: " + missingParams);
        } else {
            var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

            var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.apiToken).toString("base64");

            var deviceInfo = {
                "serialNumber": params.serialNumber,
                "manufacturer": params.manufacturer,
                "model": params.model,
                "deviceClass": params.deviceClass,
                "description": params.description,
                "fwVersion": params.fwVersion,
                "hwVersion": params.hwVersion,
                "descriptiveLocation": params.descriptiveLocation
            };

            var location = {
                "longitude": params.long,
                "latitude": params.lat,
                "elevation": params.elev,
                "accuracy": params.accuracy,
                "measuredDateTime": params.measuredDateTime
            };

            var body = {
                "deviceId": params.deviceId,
                "apiToken": params.deviceAuthToken,
                "deviceInfo": deviceInfo,
                "location": location,
                "metadata": params.metadata
            };

            var options = {
                method: 'POST',
                url: baseUrl + '/device/types/' + params.typeId + '/devices',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorizationHeader
                }
            };

            request(options, function(err, res, body) {
                if (!err && res.statusCode === 201) {
                    var b = JSON.parse(body);
                    whisk.done(b);
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
