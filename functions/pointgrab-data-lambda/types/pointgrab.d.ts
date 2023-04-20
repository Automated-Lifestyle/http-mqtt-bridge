export interface Site {
  id: string;
  timestamp: number;
  name: string;
  customerId: string;
}

export interface Building {
  id: string;
  timestamp: number;
  name: string;
  siteId: string;
  type: string;
  location: {
    houseNo: string;
    street: string;
    city: string;
    county: string;
    state: string;
    country: string;
    zip: string;
    geoPosition: {
      latitude: number;
      longitude: number;
    };
  };
}

interface Floor {
  id: string;
  timestamp: number;
  name: string;
  buildingId: string;
  siteId: string;
  floorNumber: number;
  floorPlanURL: string;
  widthDistance: number;
  lengthDistance: number;
  referencePoints: {
    x: number;
    y: number;
    latitude: number;
    longitude: number;
  }[];
}

interface Device {
  id: string;
  timestamp: number;
  attachmentState: string;
  connectionStatus: string;
  name: string;
  floorId: string;
  buildingId: string;
  siteId: string;
  height: number;
  rotation: number;
  linked: boolean;
  serialNo: string;
  fwVersion: string;
  model: string;
  geoPosition: null;
  position: {
    posX: number;
    posY: number;
  };
  ip: string;
  macAddress: string;
  activationDate: number;
  lastReportingDate: number;
  pairedEnvironmentalSensor: null;
  availableEnvironmentalSensors: {
    [key: string]: unknown;
  }[];
  detectionArea: {
    x: number;
    y: number;
    latitude: number;
    longitude: number;
  }[];
  linkedAreas: {
    areaId: string;
  }[];
}

interface DeviceData {
  id: string;
  timestamp: number;
  attachmentState: string;
  connectionStatus: string;
  name: string;
  floorId: string;
  buildingId: string;
  siteId: string;
  height: number;
  rotation: number;
  linked: boolean;
  serialNo: string;
  fwVersion: string;
  model: string;
  geoPosition: any;
  position: {
    posX: number;
    posY: number;
  };
  ip: string;
  macAddress: string;
  activationDate: number;
  lastReportingDate: number;
  pairedEnvironmentalSensor: any;
  availableEnvironmentalSensors: {
    macAddress: string;
    proximity: string;
    paired: boolean;
    lastSeenInSec: number;
  }[];
  detectionArea: {
    x: number;
    y: number;
  }[];
  linkedAreas: {
    id: string;
    name: string;
  }[];
}

interface Occupancy {
  areaId: string;
  count: number;
  status: string;
  occupancyInPercent: number | null;
}
