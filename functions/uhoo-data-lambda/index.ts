import {
  getDeviceData,
  getDeviceList,
  getToken as getUHooToken,
} from "./api/uHoo";
import { CLIENT_ID } from "./constants/temp-secrets";
import { publish } from "./utils/mqtt.util";
import { transformData } from "./utils/transform.util";

export const handler = async (event: any) => {
  console.log("[uHoo] lambda started");

  // get token
  console.log("[uHoo] retrieving token");
  const token = await getUHooToken(CLIENT_ID);

  if (!token) {
    return {
      statusCode: 500,
      body: "failed to retrieve token",
    };
  }

  console.log("[uHoo] retrieved token");

  // get device list
  console.log("[uHoo] getting device list");
  const devices = await getDeviceList(token);
  console.log(`[uHoo] retrieved ${devices.length} records`);

  // get all device data
  let count = 0;

  console.log("[uHoo] pushing to mqtt");
  devices.forEach(async (device) => {
    const deviceData = await getDeviceData(token, device.macAddress, "minute");
    await publish(transformData(deviceData.data, device.deviceName));
    count++;
  });

  const response = {
    statusCode: 200,
    body: `Retrieved ${count} device data`,
  };

  return response;
};

handler({});
