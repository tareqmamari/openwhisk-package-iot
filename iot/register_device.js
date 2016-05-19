 var request = require('request');

/**
* An action to register new device to Watson IoT platform.
* @param      {string}  apiKey                    (required)                     Watson IoT platform apiKey
* @param      {string}  authToken                 (required)                     Authentication token of an Watson IoT platform
* @param      {string}  orgId                     (required)                     IoT platform Organization Id
* @param      {string}  deviceId                  (required)                     Device Name/Id
* @param      {string}  typeId                    (required)                     Device Type Id
* @param      {string}  deviceAuthToken           (optional)                     Device authentication token, default: system will generate one
* @param      {string}  sn                        (optional)                     The serial number of the device
* @param      {string}  manufacturer              (optional)                     The manufacturer of the device
* @param      {string}  model                     (optional)                     The model of the device
* @param      {string}  deviceClass               (optional)                     The class of the device
* @param      {string}  description               (optional)                     The descriptive name of the device
* @param      {string}  fwVersion                 (optional)                     The firmware version currently known to be on the device
* @param      {string}  hwVersion                 (optional)                     The hardware version of the device
* @param      {string}  descriptiveLocation       (optional)                     A descriptive location, such as a room or building number, or a geographical region 
* @param      {decimal} long                      (optional)                     Longitude in decimal degrees using the WGS84 system
* @param      {decimal} lat                       (optional)                     Latitude in decimal degrees using the WGS84 system
* @param      {decimal} elev                      (optional)                     Elevation in meters using the WGS84 system
* @param      {decimal} accuracy                  (optional)                     Accuracy of the position in meters
* @param      {string}  measuredDateTime          (optional)                     Date and time of location measurement (ISO8601) 
* @param      {object}  metadata                  (optional)                     Metadata of the device
* @return     {Object}                                                           Done with the result of invokation
**/ 
function main(params) {

     var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

     var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.authToken).toString("base64");

     var deviceInfo = {
         "serialNumber": params.sn,
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
         "authToken": params.deviceAuthToken,
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
             console.log(JSON.parse(body));
             whisk.done({
                 response: "Device is successfully registered"
             });
         } else {
             if (res) {
                 console.log("Status code: " + res.statusCode);
                 whisk.error({
                     response: JSON.parse(body)
                 });
             } else {
                 console.error(err);
                 whisk.error(err);
             }
         }
     });

     return whisk.async();
 }