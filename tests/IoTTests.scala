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

package packages

import common._
import org.junit.runner.RunWith
import org.scalatest.Matchers
import org.scalatest.junit.JUnitRunner
import spray.json._
import spray.json.DefaultJsonProtocol.StringJsonFormat
import scala.collection.immutable.HashMap
import org.scalatest.Sequential
import org.scalatest.FlatSpecLike

@RunWith(classOf[JUnitRunner])
class IoTTests extends TestHelpers with WskTestHelpers with Matchers {

  implicit val wskprops = WskProps()
  val wsk = new Wsk()

  val credentials = TestUtils.getVCAPcredentials("iot")
  val apiKey = credentials.get("apiKey")
  val apiToken = credentials.get("apiToken")
  val orgId = credentials.get("org")

  val typeId = "OWTestDeviceType"
  val deviceId = "OWTestDeviceId"
  behavior of "Watson IoT Platform Service Package"

  Sequential

  "create device type action" should "create an IoT Platform device type and return information about the created device type" in {

    val actionName = "/whisk.system/iot/create_device_type"
    val params = HashMap("apiKey" -> apiKey.toJson, "apiToken" -> apiToken.toJson, "orgId" -> orgId.toJson, "typeId" -> typeId.toJson);

    withActivation(wsk.activation, wsk.action.invoke(actionName, params)) {
      _.fields("response").toString should include(""""id":"OWTestDeviceType"""")
    }
  }

  "register device action" should "register a new device and return information about the registered device" in {

    val actionName = "/whisk.system/iot/register_device"
    val params = HashMap("apiKey" -> apiKey.toJson, "apiToken" -> apiToken.toJson, "orgId" -> orgId.toJson, "typeId" -> typeId.toJson, "deviceId" -> deviceId.toJson);

    withActivation(wsk.activation, wsk.action.invoke(actionName, params)) {
      _.fields("response").toString should include(""""deviceId":"OWTestDeviceId"""")
    }
  }

  "send event action" should "send an event and return success" in {

    val actionName = "/whisk.system/iot/send_event"
    val params = HashMap(
      "apiKey" -> apiKey.toJson,
      "apiToken" -> apiToken.toJson,
      "orgId" -> orgId.toJson,
      "typeId" -> typeId.toJson,
      "deviceId" -> deviceId.toJson,
      "eventName" -> "OWTestEventName".toJson,
      "eventBody" -> "{test: 10}".toJson);

    withActivation(wsk.activation, wsk.action.invoke(actionName, params)) {
      _.fields("response").toString should include(""""success":"event is sent"""")
    }
  }

  "delete device action" should "delete a registered device and return success" in {

    val actionName = "/whisk.system/iot/delete_device"
    val params = HashMap(
      "apiKey" -> apiKey.toJson,
      "apiToken" -> apiToken.toJson,
      "orgId" -> orgId.toJson,
      "typeId" -> typeId.toJson,
      "deviceId" -> deviceId.toJson);

    withActivation(wsk.activation, wsk.action.invoke(actionName, params)) {
      _.fields("response").toString should include(""""success":"device deleted"""")
    }
  }

  "delete device type action" should "delete an existing device type and return success" in {

    val actionName = "/whisk.system/iot/delete_device_type"
    val params = HashMap(
      "apiKey" -> apiKey.toJson,
      "apiToken" -> apiToken.toJson,
      "orgId" -> orgId.toJson,
      "typeId" -> typeId.toJson);

    withActivation(wsk.activation, wsk.action.invoke(actionName, params)) {
      _.fields("response").toString should include(""""success":"device type deleted"""")
    }
  }

}
