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

package packages;

import static common.Pair.make;
import static org.junit.Assert.assertTrue;

import java.util.Map;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.google.code.tempusfugit.concurrency.ParallelRunner;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import common.Pair;
import common.TestUtils;
import common.WskCli;

@RunWith(ParallelRunner.class)
public class IoTTests {

    private final WskCli wsk = new WskCli();

    @BeforeClass
    public static void setUp() throws Exception {
    }

    @Test
    public void testCreateDeviceType() throws Exception {
        String action = "/whisk.system/iot/create_device_type";

        Map<String, String> credentials = TestUtils.getVCAPcredentials("iot");
        String apiKey = credentials.get("apiKey");
        String authToken = credentials.get("authToken");
        String orgId = credentials.get("orgId");

        Map<String, String> params = TestUtils.makeParameter(make("apiKey", apiKey), make("authToken", authToken),
                make("typeId", "OWTestDeviceType"), make("orgId", orgId));

        Pair<String, String> reponse = wsk.invokeBlocking(action, params);

        JsonObject parsedResponse = new JsonParser().parse(reponse.snd).getAsJsonObject();
        JsonObject result = parsedResponse.getAsJsonObject("result");
        assertTrue("Response should contains information of the created device type",
                result.has("typeId") && (result.get("typeId").getAsString().equals(params.get("typeId"))));
    }

    @Test
    public void testRegisterDevice() throws Exception {
        String action = "/whisk.system/iot/register_device";

        Map<String, String> credentials = TestUtils.getVCAPcredentials("iot");
        String apiKey = credentials.get("apiKey");
        String authToken = credentials.get("authToken");
        String orgId = credentials.get("orgId");
        String testDeviceType = credentials.get("deviceType");

        Map<String, String> params = TestUtils.makeParameter(make("apiKey", apiKey), make("authToken", authToken),
                make("orgId", orgId), make("typeId", testDeviceType), make("deviceId", "OWTestDevice"));

        Pair<String, String> reponse = wsk.invokeBlocking(action, params);

        JsonObject parsedResponse = new JsonParser().parse(reponse.snd).getAsJsonObject();
        JsonObject result = parsedResponse.getAsJsonObject("result");
        assertTrue("Response should contains information of the registered device",
                result.has("deviceId") && (result.get("deviceId").getAsString().equals(params.get("deviceId"))));
    }

    @Test
    public void testSendEvent() throws Exception {
        String action = "/whisk.system/iot/send_event";

        Map<String, String> credentials = TestUtils.getVCAPcredentials("iot");
        String apiKey = credentials.get("apiKey");
        String authToken = credentials.get("authToken");
        String orgId = credentials.get("orgId");
        String testDeviceType = credentials.get("deviceType");
        String testDeviceId = credentials.get("deviceId");

        Map<String, String> params = TestUtils.makeParameter(make("apiKey", apiKey), make("authToken", authToken),
                make("orgId", orgId), make("typeId", testDeviceType), make("deviceId", testDeviceId),
                make("eventName", "temprature"), make("eventBody", "{temperature: 42}"));

        Pair<String, String> reponse = wsk.invokeBlocking(action, params);

        JsonObject parsedResponse = new JsonParser().parse(reponse.snd).getAsJsonObject();
        JsonObject result = parsedResponse.getAsJsonObject("result");
        assertTrue("Response should contains information of the registered device",
                result.has("success") && (result.get("deviceId").getAsString().equals("event is sent")));
    }

    @Test
    public void testDeleteDevice() throws Exception {
        String action = "/whisk.system/iot/delete_device";

        Map<String, String> credentials = TestUtils.getVCAPcredentials("iot");
        String apiKey = credentials.get("apiKey");
        String authToken = credentials.get("authToken");
        String orgId = credentials.get("orgId");
        String testDeviceType = credentials.get("deviceType");
        String testDeviceId = credentials.get("deviceId");

        Map<String, String> params = TestUtils.makeParameter(make("apiKey", apiKey), make("authToken", authToken),
                make("orgId", orgId), make("typeId", testDeviceType), make("deviceId", testDeviceId),
                make("eventName", "temprature"), make("eventBody", "{temperature: 42}"));

        Pair<String, String> reponse = wsk.invokeBlocking(action, params);

        JsonObject parsedResponse = new JsonParser().parse(reponse.snd).getAsJsonObject();
        JsonObject result = parsedResponse.getAsJsonObject("result");
        assertTrue("Response should contains information of the registered device",
                result.has("success") && (result.get("deviceId").getAsString().equals("device deleted")));
    }

}
