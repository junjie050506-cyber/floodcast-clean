export interface Sector {
  id: string;
  name: string;
  zoneMatch: string; // matches zone property in mockCitizens
  riverName: string;
  code: string;
  description: string;
  baseCfs: number; // River water discharge speed
  baseDepth: number; // River depth level in meters
  safehouseName: string;
  maxCapacity: number;
  dangerThreshold: number; // Depth in meters causing bridge/lowland overflow
}

export const SECTORS: Sector[] = [
  { 
    id: 'rawang', 
    name: 'Rawang Hydrology Basin', 
    zoneMatch: 'Rawang', 
    riverName: 'Sungai Gong', 
    code: 'RAW-RG01', 
    description: 'Upstream mountainous flow near SMK Seri Garing headwater channels.',
    baseCfs: 1450, 
    baseDepth: 4.2, 
    safehouseName: 'SMK Seri Garing', 
    maxCapacity: 500,
    dangerThreshold: 5.5 
  },
  { 
    id: 'shahalam', 
    name: 'Shah Alam Urban Grid', 
    zoneMatch: 'Shah Alam', 
    riverName: 'Sungai Damansara', 
    code: 'SA-DM04', 
    description: 'Densely built flat urban terrain near low-lying Taman Sri Muda drainage.',
    baseCfs: 3120, 
    baseDepth: 5.8, 
    safehouseName: 'Dewan MBSA Seksyen 4', 
    maxCapacity: 800,
    dangerThreshold: 7.0 
  },
  { 
    id: 'klang', 
    name: 'Klang Estuary Delta', 
    zoneMatch: 'Klang', 
    riverName: 'Sungai Klang', 
    code: 'KLG-KL22', 
    description: 'Tidal-affected coastal outlet subject to saltwater intrusion and backing.',
    baseCfs: 4890, 
    baseDepth: 7.9, 
    safehouseName: 'MPK Klang', 
    maxCapacity: 400,
    dangerThreshold: 9.0 
  },
  { 
    id: 'huluselangor', 
    name: 'Hulu Selangor Valley', 
    zoneMatch: 'Hulu Selangor', 
    riverName: 'Sungai Selangor', 
    code: 'HS-SL02', 
    description: 'High-elevation reservoir headwaters safeguarding agricultural valleys.',
    baseCfs: 1100, 
    baseDepth: 2.9, 
    safehouseName: 'SK Bukit Beruntung', 
    maxCapacity: 600,
    dangerThreshold: 4.0 
  },
  { 
    id: 'batucaves', 
    name: 'Batu Caves Confluence', 
    zoneMatch: 'Batu Caves', 
    riverName: 'Sungai Batu', 
    code: 'BTC-BT11', 
    description: 'Urban stream confluence near Batu Caves Temple lowlands.',
    baseCfs: 2150, 
    baseDepth: 4.8, 
    safehouseName: 'Dewan Beringin', 
    maxCapacity: 350,
    dangerThreshold: 6.0 
  },
  { 
    id: 'kualalumpur', 
    name: 'Kuala Lumpur Central', 
    zoneMatch: 'Kuala Lumpur', 
    riverName: 'Sungai Gombak & Klang', 
    code: 'KL-CTR01', 
    description: 'High density metropolitan zone subject to rapid flash urban flooding.',
    baseCfs: 5500, 
    baseDepth: 6.5, 
    safehouseName: 'Dewan Komuniti KL', 
    maxCapacity: 1000,
    dangerThreshold: 8.0 
  },
  { 
    id: 'petalingjaya', 
    name: 'Petaling Jaya Sector', 
    zoneMatch: 'Petaling Jaya', 
    riverName: 'Sungai Penchala', 
    code: 'PJ-PN03', 
    description: 'Highly populated residential valleys with engineered runoff channels.',
    baseCfs: 2300, 
    baseDepth: 3.8, 
    safehouseName: 'Dewan MBPJ Seksyen 7', 
    maxCapacity: 600,
    dangerThreshold: 5.2 
  },
  { 
    id: 'subangjaya', 
    name: 'Subang Jaya Basin', 
    zoneMatch: 'Subang Jaya', 
    riverName: 'Sungai Damansara Link', 
    code: 'SJ-DL09', 
    description: 'Suburban hub with rapid pavement drainage and retention ponds.',
    baseCfs: 2800, 
    baseDepth: 4.5, 
    safehouseName: 'Dewan MPSJ SS15', 
    maxCapacity: 700,
    dangerThreshold: 5.8 
  },
  { 
    id: 'penang', 
    name: 'Penang Island Delta', 
    zoneMatch: 'Penang', 
    riverName: 'Sungai Pinang', 
    code: 'PNG-PG08', 
    description: 'Coastal urban zone with tidal backing and monsoon storm surge threat.',
    baseCfs: 3400, 
    baseDepth: 5.2, 
    safehouseName: 'Dewan JKKK George Town', 
    maxCapacity: 500,
    dangerThreshold: 6.5 
  },
  { 
    id: 'johorbahru', 
    name: 'Johor Bahru Straits', 
    zoneMatch: 'Johor Bahru', 
    riverName: 'Sungai Segget', 
    code: 'JB-SG12', 
    description: 'Southern border waterway with heavy urban drainage and coastal interaction.',
    baseCfs: 3900, 
    baseDepth: 5.6, 
    safehouseName: 'Dewan MBJB Taman Johor', 
    maxCapacity: 750,
    dangerThreshold: 7.0 
  }
];

export const MAP_NODE_CONFIGS: Record<string, {
  x: number;
  y: number;
  w: number;
  dh: number;
  color: 'gray' | 'orange' | 'green' | 'amber' | 'coral';
  rectWidth: number;
  labelOffsetY: number;
  nameX: number;
  depthX: number;
  shortName: string;
}> = {
  huluselangor: { x: 120, y: 45, w: 11, dh: 11, color: 'amber', rectWidth: 40, labelOffsetY: 21, nameX: -6, depthX: 28, shortName: 'H. SELANGOR' },
  rawang: { x: 45, y: 115, w: 11, dh: 11, color: 'coral', rectWidth: 34, labelOffsetY: 21, nameX: -8, depthX: 21, shortName: 'RAWANG' },
  batucaves: { x: 195, y: 45, w: 11, dh: 11, color: 'green', rectWidth: 34, labelOffsetY: 21, nameX: -8, depthX: 21, shortName: 'BATU CAVES' },
  shahalam: { x: 195, y: 115, w: 15, dh: 22, color: 'orange', rectWidth: 44, labelOffsetY: 36, nameX: -12, depthX: 26, shortName: 'SHAH ALAM' },
  klang: { x: 120, y: 180, w: 11, dh: 11, color: 'amber', rectWidth: 30, labelOffsetY: 21, nameX: -8, depthX: 18, shortName: 'KLANG' },
  kualalumpur: { x: 270, y: 45, w: 11, dh: 11, color: 'coral', rectWidth: 42, labelOffsetY: 21, nameX: -8, depthX: 29, shortName: 'K. LUMPUR' },
  petalingjaya: { x: 120, y: 115, w: 11, dh: 11, color: 'green', rectWidth: 40, labelOffsetY: 21, nameX: -8, depthX: 27, shortName: 'PETALING PJ' },
  subangjaya: { x: 270, y: 115, w: 11, dh: 11, color: 'amber', rectWidth: 40, labelOffsetY: 21, nameX: -8, depthX: 27, shortName: 'SUBANG JAYA' },
  penang: { x: 45, y: 45, w: 11, dh: 11, color: 'coral', rectWidth: 32, labelOffsetY: 21, nameX: -6, depthX: 20, shortName: 'PENANG' },
  johorbahru: { x: 195, y: 180, w: 11, dh: 11, color: 'green', rectWidth: 42, labelOffsetY: 21, nameX: -8, depthX: 29, shortName: 'JOHOR BAHRU' }
};

// Interactive local reactive citizen replica to directly handle EOC dispatches & updates
export interface IncidentCitizen {
  id: string;
  name: string;
  phone: string;
  zone: string;
  status: 'SAFE' | 'EVACUATED' | 'SOS PENDING' | 'RESCUED' | 'TEAM DISPATCHED';
  ping: string;
  healthNeeds?: string;
}

// Interactive shelter resource allocation model
export interface ShelterSupply {
  id: string;
  waterBoxes: number;
  foodRations: number;
  medicalKits: number;
  sandbags: number;
}

// Active local emergency aid requests (directly relational to Selangor zones)
export interface LocalAidRequest {
  id: string;
  zone: string;
  item: string;
  description: string;
  reporter: string;
  status: 'OPEN' | 'SQUAD_DEPLOYED' | 'RESOLVED';
}
