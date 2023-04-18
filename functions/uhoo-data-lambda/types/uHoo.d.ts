export interface IDevice {
  deviceName: string;
  macAddress: string;
  serialNumber: string;
  floorNumber: number;
  roomName: string;
  timezone: string;
  utcOffset: string;
}

export interface IDeviceData {
  data: {
    virusIndex: number;
    temperature: number;
    humidity: number;
    pm25: number;
    tvoc: number;
    co2: number;
    co: number;
    airPressure: number;
    ozone: number;
    no2: number;
    timestamp: number;
  }[];
  usersettings: {
    temperature: string;
    humidity: string;
    pm1: string;
    pm25: string;
    pm4: string;
    pm10: string;
    ch2o: string;
    tvoc: string;
    co: string;
    co2: string;
    no2: string;
    ozone: string;
    light: string;
    sound: string;
    airPressure: string;
  };
  count: number;
}

export type Mode = "minute" | "hour" | "day";
