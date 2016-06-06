 var request = require('request');

 /**
  * Send an event from an application simulating a device.
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
             console.log("event is sent");
             whisk.done({
                 response: "Event is successfully sent"
             });
         } else {
             console.error('http status code:', (res || {}).statusCode);
             console.error('error:', err);
             console.error('body:', body);
             console.error('response',res);
             whisk.error({
                 statusCode: (res || {}).statusCode,
                 error: err,
                 body: body
             });
         }
     });

     return whisk.async();
 }