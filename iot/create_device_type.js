var request = require('request');

function main(params) {

    var baseUrl = 'https://' + params.orgId + '.internetofthings.ibmcloud.com:443/api/v0002';

    var authorizationHeader = "Basic " + new Buffer(params.apiKey + ":" + params.authToken).toString("base64");


    var deviceInfo = {
        "serialNumber": params.serialNumber, //optional
        "manufacturer": params.manufacturer, //optional
        "model": params.model, //optional
        "deviceClass": params.deviceClass, //optional
        "description": params.description, //optional
        "fwVersion": params.fwVersion, //optional
        "hwVersion": params.hwVersion, //optional
        "descriptiveLocation": params.descriptiveLocation //optional
    };

    var metadata = params.metadata;
    var body = {
        "id": params.id, //required
        "description": params.description, //optional
        "classId": "Device",
        "deviceInfo": deviceInfo,
        "metadata": metadata
    };

    var options = {
        method: 'POST',
        url: baseUrl + "/device/types",
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
                response: JSON.parse(body)
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