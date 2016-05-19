 var request = require('request');

 /**
  * An action to device event (.
  * @param      {string}  apiKey                    (required)                     Watson IoT platform apiKey
  * @param      {string}  authToken                 (required)                     Authentication token of an Watson IoT platform
  * @param      {string}  orgId                     (required)                     IoT platform Organization Id
  * @param      {string}  deviceType                (required)                     Watson IoT platform apiKey
  * @param      {string}  deviceId                  (required)                     Authentication token of an Watson IoT platform
  * @param      {string}  eventName                 (required)                     IoT platform Organization Id
  * @param      {string}  eventBody                 (required)                     IoT platform Organization Id
  * @return     {Object}                                                           Done with the result of invokation
  **/
 function main(params) {

     var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

     var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.authToken).toString("base64");

     var options = {
         method: 'POST',
         url: baseUrl + '/application/types/' + params.deviceType + '/devices/' + params.deviceId + '/events/' + params.eventName,
         body: params.eventBody,
         headers: {
             'Content-Type': 'application/json',
             'Authorization': authorizationHeader
         }
     };

     request(options, function(err, res, body) {
         if (!err && res.statusCode === 200) {
             console.log("event is sent");
             whisk.done({
                 response: "Event is successfully sent"
             });
         } else {
             if (res) {
                 console.error("Status code: " + res.statusCode);
                 return whisk.error({
                     response: "Event is unsuccessfully sent"
                 });

             } else {
                 console.error(err);
                 return whisk.error({
                     response: "Event is unsuccessfully sent"
                 });
             }

         }
     });

     return whisk.async();
 }