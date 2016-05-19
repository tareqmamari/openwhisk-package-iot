 var request = require('request');

 /**
  * An action to delete a device.
  * @param      {string}  apiKey                    (required)                     Watson IoT platform apiKey
  * @param      {string}  authToken                 (required)                     Authentication token of an Watson IoT platform
  * @param      {string}  orgId                     (required)                     IoT platform Organization Id
  * @param      {string}  deviceType                (required)                     Watson IoT platform apiKey
  * @param      {string}  deviceId                  (required)                     Authentication token of an Watson IoT platform
  * @return     {Object}                                                           Done with the result of invokation
  **/
 function main(params) {

     var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

     var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.authToken).toString("base64");

     var options = {
         method: 'DELETE',
         url: baseUrl + '/device/types/' + params.deviceType + '/devices/' + params.deviceId,
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
             if (res) {
                 console.error("Status code: " + res.statusCode);
                 return whisk.error({
                     response: "Device is unsuccessfully deleted"
                 });
             } else {
                 console.error(err);
                 return whisk.error({
                     response: "Device is unsuccessfully deleted"
                 });
             }

         }
     });

     return whisk.async();
 }