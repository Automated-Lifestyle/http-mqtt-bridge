import { IDevice, Mode, IDeviceData } from "../types/uHoo";

export const getToken = async (code: string): Promise<string> => {
  try {
    const response = await fetch("https://api.uhooinc.com/v1/generatetoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
      }),
    });
    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getDeviceList = async (token: string): Promise<IDevice[]> => {
  try {
    const response = await fetch("https://api.uhooinc.com/v1/devicelist", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getDeviceData = async (
  token: string,
  macAddress: string,
  mode: Mode
): Promise<IDeviceData> => {
  try {
    const response = await fetch("https://api.uhooinc.com/v1/devicedata", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        macAddress,
        mode,
      }),
    });
    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
