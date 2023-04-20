import {
  getBuildings,
  getDevices,
  getFloors,
  getPeopleCount,
  getSites,
  getToken,
} from "./api/pointgrab";
import { APPLICATION_ID, APPLICATION_KEY } from "./constants/temp-secrets";
import {
  Building,
  Device,
  DeviceData,
  Floor,
  Occupancy,
} from "./types/pointgrab";

export const handler = async (event: any) => {
  console.log("[PointGrab] lambda started");

  // get token
  console.log("[PointGrab] retrieving token");
  const code = Buffer.from(APPLICATION_ID + ":" + APPLICATION_KEY).toString(
    "base64"
  );
  const token = await getToken(code);

  if (!token) {
    return {
      statusCode: 500,
      body: "failed to retrieve token",
    };
  }

  console.log("[PointGrab] retrieved token");

  // get sites
  console.log("[PointGrab] retrieving sites");
  const sites = await getSites(token);
  console.log("[PointGrab] retrieved sites - count:", sites.length);

  // get buildings
  console.log("[PointGrab] retrieving buildings");
  const buildings: Building[] = [];

  for (const site of sites) {
    const response = await getBuildings(token, site.id);
    buildings.push(...response);
  }
  console.log("[PointGrab] retrieved buildings - count", buildings.length);

  // get floors
  console.log("[PointGrab] retrieving floors");
  const floors: Floor[] = [];

  for (const building of buildings) {
    const response = await getFloors(token, building.siteId, building.id);
    floors.push(...response);
  }
  console.log("[PointGrab] retrieved floors - count", floors.length);

  // get devices
  console.log("[PointGrab] retrieving devices");
  const occupancy: Occupancy[] = [];

  for (const floor of floors) {
    const response = await getPeopleCount(token, floor.id);
    occupancy.push(...response);
  }
  console.log("[PointGrab] retrieved occupancy - count", occupancy.length);

  const response = {
    statusCode: 200,
    body: occupancy,
  };

  return response;
};

handler({});
