export const BASE_URL = "https://cpms.pointgrab.com/be/cp";

export const ENDPOINTS = {
  authenticate: () => "oauth2/token",
  sites: () => "v3/sites",
  buildings: (sitesId: string) => `v3/sites/${sitesId}/buildings`,
  floors: (sitesId: string, buildingId: string) =>
    `v3/sites/${sitesId}/buildings/${buildingId}/floors`,
  devices: (sitesId: string, buildingId: string, floorId: string) =>
    `v3/sites/${sitesId}/buildings/${buildingId}/floors/${floorId}/devices`,
  peopleCount: () => `v3/analytics/peopleCount`,
};
