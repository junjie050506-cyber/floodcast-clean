export interface Shelter {
  id: string;
  name: string;
  zone: string;
  distance: string;
  time: string;
  address: string;
  maxCapacity: number;
  x: number;
  y: number;
}

export interface Citizen {
  id: string;
  name: string;
  phone: string;
  zone: string;
  status: string;
  ping: string;
}

export interface CommunityPost {
  id: string;
  text?: string;
  image?: string | null;
  authorId: string;
  authorName: string;
  timestamp: any;
  zone: string;
}

export interface SosRequest {
  id: string;
  zone: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  status: string;
  userId: string;
  volunteerId?: string;
  acceptedAt?: any;
  timestamp: any;
}

export interface Hazard {
  id: string;
  zone: string;
  type: string;
  severity: string;
  description: string;
  x: number;
  y: number;
  timestamp: any;
  reporter_id: string;
}

export interface Alert {
  id: string;
  zone: string;
  type: string;
  message: string;
  timestamp: any;
  status: string;
  admin_id: string;
}

export interface ChecklistItem {
  id: number;
  key: string;
  checked: boolean;
}
