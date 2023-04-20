import { BASE_URL, ENDPOINTS } from "../constants/api.constants";
import { Building, Device, Floor, Occupancy, Site } from "../types/pointgrab";

export const getToken = async (token: string): Promise<string> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Basic ${token}`);

    const response = await fetch(`${BASE_URL}/${ENDPOINTS.authenticate()}`, {
      method: "POST",
      headers,
    });
    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getSites = async (token: string): Promise<Site[]> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/${ENDPOINTS.sites()}`, {
      method: "GET",
      headers,
    });

    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getBuildings = async (
  token: string,
  siteId: string
): Promise<Building[]> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(`${BASE_URL}/${ENDPOINTS.buildings(siteId)}`, {
      method: "GET",
      headers,
    });
    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getFloors = async (
  token: string,
  siteId: string,
  buildingId: string
): Promise<Floor[]> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${BASE_URL}/${ENDPOINTS.floors(siteId, buildingId)}`,
      {
        method: "GET",
        headers,
      }
    );

    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getDevices = async (
  token: string,
  siteId: string,
  buildingId: string,
  floorId: string
): Promise<Device[]> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);

    const response = await fetch(
      `${BASE_URL}/${ENDPOINTS.devices(siteId, buildingId, floorId)}`,
      {
        method: "GET",
        headers,
      }
    );

    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getPeopleCount = async (
  token: string,
  floorId: string
): Promise<Occupancy[]> => {
  try {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    const requestBody = {
      floorId,
      isLive: true,
    };

    const response = await fetch(`${BASE_URL}/${ENDPOINTS.peopleCount()}`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
