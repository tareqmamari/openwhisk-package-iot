 var request = require('request');

 /**
  * Delete a registered device in Watson IoT Platform
  * @param      {string}  apiKey    (required)  Watson IoT platform apiKey
  * @param      {string}  authToken (required)  Authentication token of an Watson IoT platform
  * @param      {string}  orgId     (required)  IoT platform Organization Id
  * @param      {string}  typeId    (required)  Watson IoT platform apiKey
  * @param      {string}  deviceId  (required)  Authentication token of an Watson IoT platform
  * @return     {Object}                        Done with the result of invokation
  **/
 function main(params) {

     var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

     var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.authToken).toString("base64");

     var options = {
         method: 'DELETE',
         url: baseUrl + '/device/types/' + params.typeId + '/devices/' + params.deviceId,
         headers: {
             'Authorization': authorizationHeader
         }
     };

     request(options, function(err, res, body) {
         if (!err && res.statusCode === 204) {
             console.log("Device is successfully deleted");
             whisk.done({
                 response: "Device is successfully deleted"
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