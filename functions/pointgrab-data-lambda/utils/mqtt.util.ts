import * as MQTT from "mqtt";
import {
  MQTT_URL,
  MQTT_PORT,
  MQTT_USER,
  MQTT_PASS,
  MQTT_TOPIC,
} from "../constants/temp-secrets";

export const snooze = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const publish = async (data: any) => {
  console.info("[Mqtt] Connecting to client...");
  let client = MQTT.connect(`tls://${MQTT_URL}}:${MQTT_PORT}`, {
    username: MQTT_USER,
    password: MQTT_PASS,
  });

  let tries = 0;
  await snooze(100);
  while (!client.connected && tries < 10) {
    tries++;
    await snooze(100);
  }

  if (!client.connected) {
    console.error("[Mqtt] Error connecting to MQTT client");
    throw new Error("Error connecting to MQTT client");
  }

  console.info("[Mqtt] Publishing message...");
  client.publish(
    MQTT_TOPIC,
    JSON.stringify({ name: "uhoo_temperature", value: data })
  );
  console.info("[Mqtt] Published message");
};
