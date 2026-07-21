import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapPin, Sun, Moon, CloudRain, Waves, Shield, Home, Map as MapIcon,
  Bell, Settings, Search, Navigation, AlertTriangle,
  CheckCircle, HelpCircle, LogOut, ChevronRight, ChevronLeft, BookOpen, Trophy, Compass, Droplet, Mail, Lock, User,
  CloudLightning, LayoutDashboard, ShieldAlert, Users,
  Activity, Radio, MapPinned, Info, Download, Signal, Wifi, Battery,
  Loader2, Sparkles, AlertOctagon, Cloud, Crosshair, LifeBuoy, UserCheck,
  Tent, BarChart3, Clock, FileText, X, Database, ShieldCheck,
  LockKeyhole, Key, Camera, Image as ImageIcon, HeartHandshake, Heart, Truck,
  MessageSquare, Globe, Sliders, GraduationCap, Footprints, ChevronDown, Menu, Trash2, ChevronUp, ArrowUpRight, Edit, Save,
  Minus, Plus, ArrowLeft, Share2, Phone, Bookmark
} from 'lucide-react';

import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  increment,
  deleteDoc
} from 'firebase/firestore';

import firebaseConfig from '../firebase-applet-config.json';
import { FigmaWeatherLayout } from './components/FigmaWeatherLayout';
import { SciFiCommandCenter, IncidentCitizen } from './components/SciFiCommandCenter';
import { DashboardOverview } from './components/desktop/DashboardOverview';
import { ResidentDirectory } from './components/desktop/ResidentDirectory';
import { MobileHomePage } from './components/mobile/MobileHomePage';
import { MobileMapPage } from './components/mobile/MobileMapPage';
import { MobileCommunityPage } from './components/mobile/MobileCommunityPage';
import { MobileAlertsPage } from './components/mobile/MobileAlertsPage';
import { MobileSettingsPage } from './components/mobile/MobileSettingsPage';

// ============================================================================
// IMAGE CONFIGURATION (Option B: Website Links)
// ----------------------------------------------------------------------------
// You can easily change any of the photos in this app yourself! 
// To change a photo, simply find the corresponding variable below and replace the
// URL inside the single quotes with any public image address (from Unsplash, Imgur, 
// or any image hosting website).
// ============================================================================

// --- General Community Posts / Feeds ---
// Image displayed in general community update posts
const regeneratedImagePost1 = '/flood pictures.jpg';
// Image displayed for the regional community seeds/initiatives feed
const regeneratedImageSeed1 = '/flood pictures 2.jpg';

// --- Community Card Background Banners ---
// Background banner image for the "Rescue Ops Community"
const regeneratedImageRescueBg = '/flood pictures 3.jpg';
// Background banner image for the "Hydro-monitoring Group"
const regeneratedImageHydroBg = '/flood pictures 4.jpg';
// Background banner image for the "Storm Chasers & Weather Watchers"
const regeneratedImageStormBg = '/flood pictures 5.jpg';
// Background banner image for the "Sandbagging Network"
const regeneratedImageSandBg = '/flood pictures 8.jpg';

// --- Rescue Ops Activity Grid Images ---
// First photo in the Rescue Ops community gallery/grid
const regeneratedImageRescueGrid1 = '/flood pictures 15.jpg';
// Second photo in the Rescue Ops community gallery/grid
const regeneratedImageRescueGrid2 = '/flood pictures 16.jpg';
// Third photo in the Rescue Ops community gallery/grid
const regeneratedImageRescueGrid3 = '/flood pictures 17.jpg';

// --- Hydro-monitoring Activity Grid Images ---
// First photo in the Hydro-monitoring community gallery/grid
const regeneratedImageHydroGrid1 = '/flood pictures 11.jpg';
// Second photo in the Hydro-monitoring community gallery/grid
const regeneratedImageHydroGrid2 = '/flood pictures 12.jpg';
// Third photo in the Hydro-monitoring community gallery/grid
const regeneratedImageHydroGrid3 = '/flood pictures 13.jpg';

// --- Storm Chasers Activity Grid Images ---
// First photo in the Storm Chasers community gallery/grid
const regeneratedImageStormGrid1 = '/flood pictures 18.jpg';
// Second photo in the Storm Chasers community gallery/grid
const regeneratedImageStormGrid2 = '/flood pictures 19.jpg';
// Third photo in the Storm Chasers community gallery/grid
const regeneratedImageStormGrid3 = '/flood pictures 20.jpg';

// --- Sandbagging Network Activity Grid Images ---
// First photo in the Sandbagging Network gallery/grid
const regeneratedImageSandGrid1 = '/flood pictures 7.jpg';
// Second photo in the Sandbagging Network gallery/grid
const regeneratedImageSandGrid2 = '/flood pictures 9.jpg';
// Third photo in the Sandbagging Network gallery/grid
const regeneratedImageSandGrid3 = '/flood pictures 10.jpg';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = (firebaseConfig as any).firestoreDatabaseId
  ? getFirestore(app, (firebaseConfig as any).firestoreDatabaseId)
  : getFirestore(app);
const appId = 'flood-ai-fyp';

let sharedAudioCtxApp: AudioContext | null = null;

const getAudioContextApp = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtxApp) {
    sharedAudioCtxApp = new AudioContextClass();
  }
  if (sharedAudioCtxApp.state === 'suspended') {
    sharedAudioCtxApp.resume().catch(() => { });
  }
  return sharedAudioCtxApp;
};

const OperationType = {
  HOME: 'home',
  MAP: 'map',
  COMMUNITY: 'community',
  ALERTS: 'alerts',
  SETTINGS: 'settings',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write'
};

interface FirestoreErrorInfo {
  error: string;
  operationType: any;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: any, operationType: any, path: any) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn("Firestore Notice (Offline Fallback Mode Active): ", JSON.stringify(errInfo));
}

const GoogleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AppleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor" />
  </svg>
);

const baseShelters = [
  { id: 'kotadamansara', name: 'Dewan MBPJ Kota Damansara', zone: 'SEGi University Kota Damansara', distance: '0.4 KM', time: 'Est. 1 min', address: 'Jalan Teknologi, PJU 5, Kota Damansara, PJ', maxCapacity: 550, x: 44, y: 44, tags: ['medical', 'food', 'pets', 'generator'] },
  { id: 'petalingjaya', name: 'Dewan MBPJ Seksyen 7', zone: 'Petaling Jaya', distance: '12.5 KM', time: 'Est. 16 mins', address: 'Petaling Jaya West', maxCapacity: 600, x: 35, y: 65, tags: ['pets', 'food'] },
  { id: 'subangjaya', name: 'Dewan MPSJ SS15', zone: 'Subang Jaya', distance: '14.5 KM', time: 'Est. 18 mins', address: 'Subang Jaya Sector', maxCapacity: 700, x: 32, y: 72, tags: ['generator', 'food', 'medical'] },
  { id: 'kualalumpur', name: 'Dewan Komuniti KL', zone: 'Kuala Lumpur', distance: '20.2 KM', time: 'Est. 25 mins', address: 'Kuala Lumpur Central', maxCapacity: 1000, x: 55, y: 55, tags: ['medical', 'food'] },
  { id: 'shahalam', name: 'Dewan MBSA Seksyen 4', zone: 'Shah Alam', distance: '20.8 KM', time: 'Est. 24 mins', address: 'Dewan MBSA Seksyen 4, Shah Alam', maxCapacity: 800, x: 30, y: 70, tags: ['generator', 'food'] },
  { id: 'batucaves', name: 'Dewan Beringin', zone: 'Batu Caves', distance: '21.5 KM', time: 'Est. 22 mins', address: 'Batu Caves, Selangor', maxCapacity: 350, x: 50, y: 50, tags: ['medical', 'pets'] },
  { id: 'klang', name: 'MPK Klang', zone: 'Klang', distance: '29.2 KM', time: 'Est. 32 mins', address: 'Klang, Selangor', maxCapacity: 400, x: 15, y: 85, tags: ['medical', 'generator'] },
  { id: 'rawang', name: 'SMK Seri Garing', zone: 'Rawang', distance: '30.5 KM', time: 'Est. 30 mins', address: 'SMK Seri Garing, Rawang', maxCapacity: 500, x: 45, y: 40, tags: ['medical', 'food', 'pets'] },
  { id: 'huluselangor', name: 'SK Bukit Beruntung', zone: 'Hulu Selangor', distance: '43.5 KM', time: 'Est. 38 mins', address: 'Bukit Beruntung', maxCapacity: 600, x: 40, y: 25, tags: ['pets', 'food'] },
  { id: 'johorbahru', name: 'Dewan MBJB Taman Johor', zone: 'Johor Bahru', distance: '340 KM', time: 'Est. 3 hrs 35 mins', address: 'Johor Bahru Straits', maxCapacity: 750, x: 75, y: 90, tags: ['food', 'pets'] },
  { id: 'penang', name: 'Dewan JKKK George Town', zone: 'Penang', distance: '348 KM', time: 'Est. 3 hrs 45 mins', address: 'Penang Island Delta', maxCapacity: 500, x: 25, y: 15, tags: ['medical', 'generator'] }
];

const getShelterPhotos = (id: string) => {
  const photosMap: Record<string, string[]> = {
    rawang: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
    ],
    batucaves: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80"
    ],
    shahalam: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"
    ]
  };
  return photosMap[id] || [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"
  ];
};

const mockCitizens: IncidentCitizen[] = [
  { id: 'UID-001', name: 'Ahmad bin Yusuf', phone: '+60 12-345 6789', zone: 'Rawang', status: 'SAFE', ping: '2 mins ago', healthNeeds: 'None' },
  { id: 'UID-002', name: 'Mei Ling', phone: '+60 17-987 6543', zone: 'Shah Alam', status: 'SOS PENDING', ping: '1 hr ago', healthNeeds: 'Requires wheelchair accessibility' },
  { id: 'UID-003', name: 'Siti Nurhaliza', phone: '+60 11-112 2334', zone: 'Rawang', status: 'SOS PENDING', ping: 'Just now', healthNeeds: 'Elderly assistance, insulin storage' },
  { id: 'UID-004', name: 'John Doe', phone: '+60 19-888 7777', zone: 'Klang', status: 'SAFE', ping: '5 mins ago', healthNeeds: 'None' },
  { id: 'UID-005', name: 'Ali Rahman', phone: '+60 13-444 5555', zone: 'Hulu Selangor', status: 'SAFE', ping: '10 mins ago', healthNeeds: 'None' },
  { id: 'UID-006', name: 'Wong Kah Wei', phone: '+60 16-222 3333', zone: 'Klang', status: 'SOS PENDING', ping: '15 mins ago', healthNeeds: 'Asthma inhaler supply empty' },
  { id: 'UID-007', name: 'Raju Subramaniam', phone: '+60 14-999 8888', zone: 'Batu Caves', status: 'EVACUATED', ping: '2 hrs ago', healthNeeds: 'None' },
  { id: 'UID-008', name: 'Fatimah Awang', phone: '+60 19-383 4901', zone: 'Shah Alam', status: 'SAFE', ping: 'Just now', healthNeeds: 'None' },
  { id: 'UID-009', name: 'Tan Kah Kee', phone: '+60 11-2345 6789', zone: 'Kuala Lumpur', status: 'SAFE', ping: '8 mins ago', healthNeeds: 'None' },
  { id: 'UID-010', name: 'Lim Goh Tong', phone: '+60 17-555 4433', zone: 'Petaling Jaya', status: 'SAFE', ping: '12 mins ago', healthNeeds: 'None' },
  { id: 'UID-011', name: 'Aswad bin Bakri', phone: '+60 19-223 4455', zone: 'Subang Jaya', status: 'SAFE', ping: '14 mins ago', healthNeeds: 'None' },
  { id: 'UID-012', name: 'Lee Chong Wei', phone: '+60 12-888 9999', zone: 'Penang', status: 'SAFE', ping: '20 mins ago', healthNeeds: 'None' },
  { id: 'UID-013', name: 'Siti Saleha', phone: '+60 13-777 6655', zone: 'Johor Bahru', status: 'SAFE', ping: '30 mins ago', healthNeeds: 'None' }
];

const mockAlerts = [
  {
    id: 'alert-1',
    zone: 'Rawang',
    type: 'Evacuation Order',
    message: 'CRITICAL WATER OVERFLOW detected at Sungai Rawang. Residents in Low-Lying areas are instructed to evacuate immediately to SMK Seri Garing shelter.',
    timestamp: { toMillis: () => Date.now() - 300000 },
    status: 'CRITICAL',
    admin_id: 'admin_sys'
  },
  {
    id: 'alert-2',
    zone: 'Klang',
    type: 'Flood Warning',
    message: 'High tide peak expected at 11:30 PM. River levels are elevated. Please secure belongings and move vehicles to elevated ground.',
    timestamp: { toMillis: () => Date.now() - 1800000 },
    status: 'WARNING',
    admin_id: 'admin_sys'
  },
  {
    id: 'alert-3',
    zone: 'Shah Alam',
    type: 'Weather Alert',
    message: 'Continuous heavy rainfall of more than 50mm/hour expected over the next 3 hours. Stay alert for siren warnings.',
    timestamp: { toMillis: () => Date.now() - 7200000 },
    status: 'WARNING',
    admin_id: 'admin_sys'
  }
];

const mockHazards = [
  {
    id: 'hz-1',
    zone: 'Rawang',
    type: 'Flooded Road',
    severity: 'High',
    description: 'Jalan Besar flooded. Water depth exceeds 30cm. Sedans and light vehicles cannot pass.',
    x: 48,
    y: 42,
    reporter_id: 'vol-01'
  },
  {
    id: 'hz-2',
    zone: 'Batu Caves',
    type: 'Landslide',
    severity: 'Medium',
    description: 'Minor landslide near the temple bypass. Lane blocked, traffic diverted.',
    x: 52,
    y: 48,
    reporter_id: 'vol-02'
  },
  {
    id: 'hz-3',
    zone: 'Klang',
    type: 'Fallen Tree',
    severity: 'Low',
    description: 'Fallen branch partially blocking the left lane on Jalan Pantai. Drive with caution.',
    x: 18,
    y: 82,
    reporter_id: 'vol-03'
  }
];

const mockCommunityPosts = [
  {
    id: 'post-1',
    text: 'Just checked Sungai Rawang water level at the main bridge. It is rising fast, currently touching the yellow caution marker. Keep safe everyone!',
    authorId: 'user-ahmad',
    authorName: 'Ahmad bin Yusuf',
    zone: 'Rawang',
    timestamp: { toMillis: () => Date.now() - 600000 },
    image: regeneratedImagePost1
  },
  {
    id: 'post-2',
    text: 'SMK Seri Garing shelter has plenty of clean drinking water and food rations. The medical team is also on standby. Huge thanks to the volunteers!',
    authorId: 'user-fatimah',
    authorName: 'Fatimah Awang',
    zone: 'Rawang',
    timestamp: { toMillis: () => Date.now() - 3600000 },
    image: null
  }
];

const mockSosRequests = [
  {
    id: 'sos-1',
    zone: 'Shah Alam',
    lat: 3.0738,
    lon: 101.5183,
    status: 'PENDING',
    userId: 'UID-002',
    name: 'Mei Ling',
    phone: '+60 17-987 6543',
    message: 'Water rising up to porch level. Need boat evacuation for elderly mother.',
    timestamp: { toMillis: () => Date.now() - 1200000 }
  },
  {
    id: 'sos-2',
    zone: 'Rawang',
    lat: 3.3224,
    lon: 101.5739,
    status: 'ACCEPTED',
    userId: 'UID-003',
    name: 'Siti Nurhaliza',
    phone: '+60 11-112 2334',
    message: 'Asthma patient needing medical assistance and evacuation.',
    volunteerId: 'vol-01',
    volunteerName: 'Volunteer Responder',
    timestamp: { toMillis: () => Date.now() - 3600000 }
  }
];

const i18n = {
  en: {
    appTitle: "Project FloodCast", subtitle: "Advanced Risk Mitigation Pipeline",
    home: "Home", map: "Map", community: "Community", alerts: "Alerts", settings: "Settings",
    safe: "SECURE", warning: "WARNING", critical: "CRITICAL",
    safeDesc: "Normal conditions. No flood risk detected.",
    warnDesc: "Water levels rising. Prepare for potential alerts.",
    critDesc: "LEVEL 3: IMMINENT EVACUATION. PROCEED TO SHELTER IMMEDIATELY.",
    radarSys: "Evac Radar System", navTo: "Nav to", sos: "S.O.S EMERGENCY", sosSent: "SIGNAL BROADCASTED", sosDispatched: "RESCUE IS ON THE WAY!",
    demoMode: "Student Project Controls (SEGi FYP)", simStorm: "Simulate Storm", simRecovery: "Simulate Recovery Phase", fetchLoc: "Location",
    prefs: "Preferences", darkMode: "Dark Mode", pushAlerts: "Push Alerts", lang: "Language", logout: "Log Out",
    themeLabel: "Appearance", themeLight: "Light", themeDark: "Dark", themeAuto: "Auto",
    latency: "Latency", rawDepth: "Raw Depth", hardwareStatus: "Hardware Telemetry",
    evacNow: "EVACUATE NOW.", criticalMsg: "Critical overflow in", proceedShelter: "Proceed immediately to designated shelters.",
    volunteerMode: "Volunteer Responder Mode", activeMissions: "Active Rescue Missions", acceptTask: "Accept & Navigate",
    shelterFull: "SHELTER FULL", rerouting: "Rerouting to nearest available shelter...",
    checklistTitle: "Go-Bag", checkDoc: "ID & Docs", checkMed: "Meds & Care", checkPower: "Powerbank", checkFlash: "Flashlight", checkWater: "Water & Food", packed: "Packed",
    rainLabel: "Rainfall", riverLabel: "River Level", evacNotReq: "Evac Not Required", viewRoutes: "View Safe Routes",
    postCommunity: "Share an update with your zone...", postBtn: "Post"
  },
  ms: {
    appTitle: "Sistem FloodCast", subtitle: "Sistem Amaran Kedalaman Banjir",
    home: "Utama", map: "Peta", community: "Komuniti", alerts: "Amaran", settings: "Tetapan",
    safe: "SELAMAT", warning: "WASPADA", critical: "BAHAYA",
    safeDesc: "Keadaan normal. Tiada risiko banjir dikesan.",
    warnDesc: "Paras air meningkat. Bersedia untuk amaran.",
    critDesc: "TAHAP 3: PEMINDAHAN SEGERA. PERGI KE PUSAT PEMINDAHAN.",
    radarSys: "Sistem Radar Pemindahan", navTo: "Navigasi", sos: "KECEMASAN S.O.S", sosSent: "ISYARAT DIHANTAR", sosDispatched: "BANTUAN DALAM PERJALANAN!",
    demoMode: "Slaid Papan Kawalan (SEGi FYP)", simStorm: "Simulasi Ribut", simRecovery: "Simulasi Fasa Pemulihan", fetchLoc: "Lokasi",
    prefs: "Tetapan", darkMode: "Mod Gelap", pushAlerts: "Notifikasi Amaran", lang: "Bahasa", logout: "Log Keluar",
    themeLabel: "Penampilan", themeLight: "Cerah", themeDark: "Gelap", themeAuto: "Auto",
    latency: "Kependaman", rawDepth: "Kedalaman", hardwareStatus: "Telemetri Perkakasan",
    evacNow: "PINDAH SEKARANG.", criticalMsg: "Banjir kritikal dalam", proceedShelter: "Pergi ke pusat pemindahan segera.",
    volunteerMode: "Mod Sukarelawan", activeMissions: "Misi Menyelamat Aktif", acceptTask: "Terima & Arah Bantuan",
    shelterFull: "PUSAT PENUH", rerouting: "Mencari pusat pemindahan alternatif...",
    checklistTitle: "Beg Kecemasan", checkDoc: "Pasport & IC", checkMed: "Ubat & Peti", checkPower: "Powerbank", checkFlash: "Lampu Suluh", checkWater: "Air & Makanan", packed: "Selesai",
    rainLabel: "Hujan", riverLabel: "Paras Air", evacNotReq: "Selamat", viewRoutes: "Lihat Laluan",
    postCommunity: "Kongsi maklumat dengan zon anda...", postBtn: "Hantar"
  },
  cn: {
    appTitle: "Project FloodCast", subtitle: "高频气候监测系统",
    home: "主页", map: "地图", community: "社区", alerts: "警报", settings: "设置",
    safe: "安全", warning: "警告", critical: "危险",
    safeDesc: "状况正常。未检测到洪水风险。",
    warnDesc: "水位上升。请为潜在警报做好准备。",
    critDesc: "3级：即将撤离。请立即前往避难所。",
    radarSys: "撤离雷达系统", navTo: "导航至", sos: "S.O.S 紧急情况", sosSent: "信号已发送", sosDispatched: "救援已在路上！",
    demoMode: "系统覆盖 (FYP 演示)", simStorm: "模拟风暴", simRecovery: "模拟恢复阶段", fetchLoc: "位置",
    prefs: "偏好设置", darkMode: "深色模式", pushAlerts: "推送警报", lang: "语言", logout: "登出",
    themeLabel: "外观", themeLight: "浅色", themeDark: "深色", themeAuto: "自动",
    latency: "延迟", rawDepth: "原始深度", hardwareStatus: "硬件遥测",
    evacNow: "立即撤离。", criticalMsg: "严重溢出剩余", proceedShelter: "请立即前往指定的避难所。",
    volunteerMode: "志愿者响应模式", activeMissions: "活跃的救援任务", acceptTask: "接受并导航",
    shelterFull: "避难所已满", rerouting: "正在重新规划至最近的可用避难所...",
    checklistTitle: "应急包", checkDoc: "证件与文档", checkMed: "急救药品", checkPower: "充电宝", checkFlash: "手电筒", checkWater: "饮水食物", packed: "已打包",
    rainLabel: "降雨量", riverLabel: "水位", evacNotReq: "无需撤离", viewRoutes: "查看安全路线",
    postCommunity: "与您所在区域分享更新...", postBtn: "发布"
  }
};

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

function pcmToWav(pcm16Array, sampleRate) {
  const buffer = new ArrayBuffer(44 + pcm16Array.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcm16Array.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, pcm16Array.length * 2, true);

  for (let i = 0; i < pcm16Array.length; i++) {
    view.setInt16(44 + i * 2, pcm16Array[i], true);
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

const LiquidGlassFluidEngine = ({ value, maxValue, color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let angle = 0;
    const fillPercentage = Math.min(100, Math.max(10, (value / maxValue) * 100));

    // Dynamic rising bubbles array
    const bubbles = Array.from({ length: 15 }).map(() => ({
      xRatio: Math.random(), // relative width fraction
      y: canvas.height * (0.5 + Math.random() * 0.5),
      radius: 1 + Math.random() * 2.5,
      speed: 0.3 + Math.random() * 0.6,
      sinOffset: Math.random() * 100,
      sinSpeed: 0.01 + Math.random() * 0.02,
      wobble: 1 + Math.random() * 3
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetHeight = canvas.height * (1 - fillPercentage / 100);
      angle += 0.04;

      // Wave 1 - Ambient base layer
      ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.12)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.12)' : 'rgba(255, 69, 58, 0.12)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.sin(x * 0.02 + angle) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Rising micro-bubbles (under the wave surface)
      bubbles.forEach(b => {
        // update bubble vertical position
        b.y -= b.speed;
        const xOffset = Math.sin(angle * 1.5 + b.sinOffset) * b.wobble;
        const bubbleX = b.xRatio * canvas.width + xOffset;

        // Find local water line height at bubbleX
        const waterY = targetHeight + Math.cos(bubbleX * 0.015 + angle + 1.5) * 8;

        // respawn if bubble breaches surface or goes off screen
        if (b.y < waterY || b.y < 0) {
          b.y = canvas.height + Math.random() * 20;
          b.xRatio = Math.random();
        }

        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubbleX, b.y, b.radius, 0, Math.PI * 2);
        // Soft white bubble overlay
        ctx.fillStyle = color === '#32D74B' ? 'rgba(50, 215, 75, 0.45)' : color === '#FF9F0A' ? 'rgba(255, 159, 10, 0.45)' : 'rgba(255, 69, 58, 0.45)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Wave 2 - Foreground deeper layer with gloss gradient
      const waveGrad = ctx.createLinearGradient(0, targetHeight, 0, canvas.height);
      if (color === '#32D74B') {
        waveGrad.addColorStop(0, 'rgba(50, 215, 75, 0.28)');
        waveGrad.addColorStop(1, 'rgba(50, 215, 75, 0.04)');
      } else if (color === '#FF9F0A') {
        waveGrad.addColorStop(0, 'rgba(255, 159, 10, 0.28)');
        waveGrad.addColorStop(1, 'rgba(255, 159, 10, 0.04)');
      } else {
        waveGrad.addColorStop(0, 'rgba(255, 69, 58, 0.28)');
        waveGrad.addColorStop(1, 'rgba(255, 69, 58, 0.04)');
      }

      ctx.fillStyle = waveGrad;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x++) {
        const y = targetHeight + Math.cos(x * 0.015 + angle + 1.5) * 8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Mirror gloss highlighting crest of wave
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += 3) {
        const y = targetHeight + Math.cos(x * 0.015 + angle + 1.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, maxValue, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

declare const __initial_auth_token: any;

const manualLocations = [
  { name: 'SEGi University Kota Damansara', lat: 3.1492, lon: 101.5791 },
  { name: 'Rawang', lat: 3.3213, lon: 101.5822 },
  { name: 'Shah Alam', lat: 3.0738, lon: 101.5183 },
  { name: 'Klang', lat: 3.0367, lon: 101.4433 },
  { name: 'Hulu Selangor', lat: 3.4288, lon: 101.6500 },
  { name: 'Batu Caves', lat: 3.2379, lon: 101.6811 },
  { name: 'Kuala Lumpur', lat: 3.1390, lon: 101.6869 },
  { name: 'Petaling Jaya', lat: 3.1073, lon: 101.6067 },
  { name: 'Subang Jaya', lat: 3.0567, lon: 101.5855 },
  { name: 'Penang', lat: 5.4141, lon: 100.3288 },
  { name: 'Johor Bahru', lat: 1.4927, lon: 103.7414 }
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const renderAvatar = (avatarValue: string, name: string, sizeClass = "w-16 h-16 text-xl", shrink = true) => {
  if (avatarValue?.startsWith('custom:')) {
    const src = avatarValue.substring(7);
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden border border-white/10 dark:border-white/20 shadow-lg ${shrink ? 'shrink-0' : ''} bg-black/5 flex items-center justify-center`}>
        <img src={src} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
      </div>
    );
  }

  if (avatarValue?.startsWith('emoji:')) {
    const textCode = avatarValue.substring(6);
    const EMOJI_MAP: Record<string, string> = {
      'AT': '👨‍🚀',
      'RS': '👷',
      'MD': '🧑‍⚕️',
      'OB': '👁️',
      'KL': '🐨',
      'CT': '🐱'
    };
    const emojiToShow = EMOJI_MAP[textCode] || textCode;
    const isRealEmoji = !!EMOJI_MAP[textCode];
    const customGradients = [
      'from-orange-400 to-red-500',
      'from-pink-500 to-rose-600',
      'from-teal-400 to-emerald-600',
      'from-amber-400 to-orange-600',
      'from-fuchsia-500 to-purple-700',
      'from-blue-400 to-indigo-500',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const bgGrad = customGradients[hash % customGradients.length];
    return (
      <div className={`${sizeClass} rounded-full bg-gradient-to-tr ${bgGrad} flex items-center justify-center shadow-lg ${shrink ? 'shrink-0' : ''}`}>
        <span className={`select-none leading-none ${isRealEmoji ? 'text-2xl' : 'text-xs font-black text-white'}`}>{emojiToShow}</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-tr from-[#0A84FF] to-[#5E5CE6] flex items-center justify-center shadow-lg ${shrink ? 'shrink-0' : ''}`}>
      <span className="text-white font-black">{getInitials(name)}</span>
    </div>
  );
};

const LiveClock = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase();

  return (
    <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl border select-none transition-all ${isDarkMode ? 'bg-black/30 border-white/5 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-800'} shadow-sm`}>
      <div className="relative flex items-center justify-center">
        <Clock className="text-[#0a84ff]" size={14} />
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
      </div>
      <div className="flex flex-col text-left leading-none font-mono">
        <span className="text-[7.5px] font-black text-zinc-500 dark:text-zinc-400 tracking-widest leading-none mb-0.5">{dateStr}</span>
        <span className="text-[11px] font-black tracking-wider leading-none">
          {time.toLocaleTimeString([], { hour12: false })} MYT
        </span>
      </div>
    </div>
  );
};

const ALL_COMMUNITIES = [
  {
    id: "river-rescue",
    name: "River Rescue & Safety",
    shortName: "Rescue",
    badge: "Hot",
    desc: "Swift water survival techniques, community boat patrols, and sandbag coordinates.",
    tagline: "Swift water survival skills, emergency kayak drills, and safe evacuation paths.",
    rating: "4.9",
    members: "12K+",
    bgImage: regeneratedImageRescueBg,
    welcome: "Welcome to River Rescue & Safety",
    about: "This is a supportive space where residents and professional emergency responders come together to share live rescue updates, boat route coordinates, and flood safety checklists. Together, we ensure every neighborhood is safe, informed, and swiftly assisted.",
    gridImages: [
      regeneratedImageRescueGrid1,
      regeneratedImageRescueGrid2,
      regeneratedImageRescueGrid3
    ],
    challenges: [
      {
        id: "throw-bag",
        title: "Swift Water Throw-Bag Mastery",
        slots: "3 slots left",
        img: regeneratedImageRescueGrid1,
        desc: "Learn to deploy a rescue throw-bag accurately in moving currents. Record a video of your practice dry-run and earn safety points!",
        reward: "500 Coins"
      }
    ],
    sessions: [
      {
        id: "survival-l1",
        title: "Live Swift Water Survival Level 1",
        badge: "50% Off",
        rating: "4.8",
        img: regeneratedImageRescueGrid2,
        desc: "Join our live video class led by veteran coast guards. Learn self-rescue positions, identifying hydraulic traps, and current speed estimation.",
        enrolledText: "250+ residents enrolled"
      }
    ]
  },
  {
    id: "hydrology",
    name: "Hydrology & Telemetry",
    shortName: "Telemetry",
    badge: "Active",
    desc: "Live stream depths, telemetry science, and local river level charts.",
    tagline: "Tracking live water levels, barometric curves, and localized precipitation datasets.",
    rating: "4.8",
    members: "8.5K+",
    bgImage: regeneratedImageHydroBg,
    welcome: "Welcome to Hydrology & Telemetry",
    about: "A community designed for weather enthusiasts, hydro-tech researchers, and citizens tracking real-time sensor streams. We read data grids, translate precipitation percentiles, and exchange sensor telemetry notes to build early alert indicators.",
    gridImages: [
      regeneratedImageHydroGrid1,
      regeneratedImageHydroGrid2,
      regeneratedImageHydroGrid3
    ],
    challenges: [
      {
        id: "calibration",
        title: "Sensor Calibration Sandbox",
        slots: "5 slots left",
        img: regeneratedImageHydroGrid1,
        desc: "Calibrate your smart DIY home rainfall container and synch API streaming with the Telemetry tab.",
        reward: "250 Coins"
      }
    ],
    sessions: [
      {
        id: "decode-streams",
        title: "Decoding Sensor Streams 101",
        badge: "Free",
        rating: "4.9",
        img: regeneratedImageHydroGrid2,
        desc: "An interactive code-along webinar using Python and IoT sensors to graph rapid run-off patterns.",
        enrolledText: "180+ tech-residents registered"
      }
    ]
  },
  {
    id: "storm-spotters",
    name: "Storm Spotters & Climate",
    shortName: "Storms",
    badge: "Live",
    desc: "Tracking supercells, downpour maps, and local atmospheric indicators.",
    tagline: "Recognizing high-density cloud masses, downpour timelines, and cyclone structures.",
    rating: "4.7",
    members: "9.3K+",
    bgImage: regeneratedImageStormBg,
    welcome: "Welcome to Storm Spotters & Climate",
    about: "For dedicated sky watchers and cloud recorders. We share real-time barometric readings, photograph storm fronts, and post immediate flood-hazard spots during major monsoons or tropical cyclones.",
    gridImages: [
      regeneratedImageStormGrid1,
      regeneratedImageStormGrid2,
      regeneratedImageStormGrid3
    ],
    challenges: [
      {
        id: "cloud-height",
        title: "Cyclone Cloud Height Logging",
        slots: "8 slots left",
        img: regeneratedImageStormGrid1,
        desc: "Log three separate barometer readings and cloud altitude observations during the storm simulator peak.",
        reward: "300 Coins"
      }
    ],
    sessions: [
      {
        id: "meteorology-brief",
        title: "Meteorology Standard Briefing",
        badge: "Free",
        rating: "4.6",
        img: regeneratedImageStormGrid2,
        desc: "Understand barometric pressure drops, thermal gradients, and how to spot safe microclimates in real-time.",
        enrolledText: "120+ weather-residents joined"
      }
    ]
  },
  {
    id: "care-sandbags",
    name: "Sandbag Brigade & Care",
    shortName: "Sandbags",
    badge: "Care",
    desc: "Sandbag filling hubs, relief volunteering, and physical protection resources.",
    tagline: "Coordinating sandbag depots, neighborhood physical defense, and temporary aid.",
    rating: "4.9",
    members: "15K+",
    bgImage: regeneratedImageSandBg,
    welcome: "Welcome to Sandbag Brigade & Care",
    about: "The operational muscle of neighborhood flood relief. We post physical sandbag distribution schedules, track physical barriers along low-elevation riverbanks, and map home evacuation assist channels for vulnerable or elderly residents.",
    gridImages: [
      regeneratedImageSandGrid1,
      regeneratedImageSandGrid2,
      regeneratedImageSandGrid3
    ],
    challenges: [
      {
        id: "sandbag-prep",
        title: "5-Day Sandbag Prep Practice",
        slots: "12 slots left",
        img: regeneratedImageSandGrid1,
        desc: "Pack and secure ten sandbag structures or local sacks around low elevation doorframes. Upload proof to join the safe barrier grid.",
        reward: "600 Coins"
      }
    ],
    sessions: [
      {
        id: "sandbag-pyramid",
        title: "Fast-filling Sandbag Standard",
        badge: "Free",
        rating: "4.9",
        img: regeneratedImageSandGrid2,
        desc: "A localized safety video teaching the 'staggered pyramid stacking rule' to resist high hydrodynamic river speeds.",
        enrolledText: "410+ residents certified"
      }
    ]
  }
];

const SEED_POSTS = [
  {
    id: "seed-1",
    authorName: "Elena Rostova",
    zone: "Sector 4 Hydrology",
    timestamp: {
      toMillis: () => Date.now() - 3600000,
      seconds: Math.floor(Date.now() / 1000) - 3600,
      nanoseconds: 0
    } as any,
    text: "Critical water levels exceeded in Sector 4 residential zones. Aerial imagery confirms extensive flooding across suburban streets with water surrounding residential gables. Our telemetry models are updating flow patterns live.",
    image: regeneratedImageSeed1,
    communityId: "hydrology",
    upvotes: 42,
    isVerified: true
  }
];

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminView, setAdminView] = useState('overview');
  const [commandCenterTab, setCommandCenterTab] = useState<'standard' | 'tactical'>('tactical');
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [citizenSearch, setCitizenSearch] = useState('');
  const [citizenStatusFilter, setCitizenStatusFilter] = useState('ALL');
  const [citizens, _setCitizens] = useState(mockCitizens);
  const [selectedCitizenId, setSelectedCitizenId] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  // EOC command center shared real-time states
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [isLeveeDamDeployed, setIsLeveeDamDeployed] = useState(false);
  const [shelterSupplies, setShelterSupplies] = useState<any>({
    rawang: { id: 'rawang', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 },
    shahalam: { id: 'shahalam', waterBoxes: 60, foodRations: 45, medicalKits: 20, sandbags: 220 },
    klang: { id: 'klang', waterBoxes: 250, foodRations: 240, medicalKits: 110, sandbags: 400 },
    huluselangor: { id: 'huluselangor', waterBoxes: 90, foodRations: 85, medicalKits: 50, sandbags: 80 },
    batucaves: { id: 'batucaves', waterBoxes: 110, foodRations: 95, medicalKits: 60, sandbags: 150 },
    kualalumpur: { id: 'kualalumpur', waterBoxes: 300, foodRations: 280, medicalKits: 150, sandbags: 500 },
    petalingjaya: { id: 'petalingjaya', waterBoxes: 180, foodRations: 160, medicalKits: 90, sandbags: 200 },
    subangjaya: { id: 'subangjaya', waterBoxes: 210, foodRations: 190, medicalKits: 100, sandbags: 240 },
    penang: { id: 'penang', waterBoxes: 160, foodRations: 140, medicalKits: 70, sandbags: 190 },
    johorbahru: { id: 'johorbahru', waterBoxes: 230, foodRations: 210, medicalKits: 105, sandbags: 260 }
  });

  const syncCitizensToFirestore = async (newCitizensList: IncidentCitizen[]) => {
    if (db && user) {
      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
      if (!isRealFirebaseUser) return;
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'citizens_state'), {
          list: newCitizensList
        });

        // Resolve Firestore SOS requests for evacuated/safe citizens
        for (const c of newCitizensList) {
          if (c.status === 'EVACUATED' || c.status === 'SAFE') {
            const activeSos = sosRequests.find(s =>
              s.status !== 'RESOLVED' &&
              (s.userId === c.id || s.phone === c.phone || s.name === c.name)
            );
            if (activeSos) {
              await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', activeSos.id), {
                status: 'RESOLVED',
                resolvedAt: serverTimestamp()
              });
              addLog(`[SYSTEM] Auto-resolved Firestore SOS request ${activeSos.id} for evacuated/safe resident ${c.name}.`);
            }
          }
        }
      } catch (err) {
        console.error("Error syncing citizens to firestore", err);
      }
    }
  };

  const setCitizens = (value: any) => {
    _setCitizens(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncCitizensToFirestore(next);
      return next;
    });
  };

  const syncShelterSuppliesToFirestore = async (newSupplies: any) => {
    if (db && user) {
      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
      if (!isRealFirebaseUser) return;
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'shelter_supplies'), newSupplies);
      } catch (err) {
        console.error("Error syncing supplies to firestore", err);
      }
    }
  };

  const setShelterSuppliesWithSync = (value: any) => {
    setShelterSupplies((prev: any) => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncShelterSuppliesToFirestore(next);
      return next;
    });
  };

  const syncEocStateToFirestore = async (siren: boolean, levee: boolean) => {
    if (db && user) {
      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
      if (!isRealFirebaseUser) return;
      try {
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'eoc_state'), {
          isSirenActive: siren,
          isLeveeDamDeployed: levee
        });
      } catch (err) {
        console.error("Error syncing EOC state to firestore", err);
      }
    }
  };

  const setIsSirenActiveWithSync = (value: any) => {
    setIsSirenActive(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncEocStateToFirestore(next, isLeveeDamDeployed);
      return next;
    });
  };

  const setIsLeveeDamDeployedWithSync = (value: any) => {
    setIsLeveeDamDeployed(prev => {
      const next = typeof value === 'function' ? value(prev) : value;
      syncEocStateToFirestore(isSirenActive, next);
      return next;
    });
  };

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'auto'>('dark');

  // Sync themeMode with isDarkMode dynamically
  useEffect(() => {
    if (themeMode === 'light') {
      setIsDarkMode(false);
    } else if (themeMode === 'dark') {
      setIsDarkMode(true);
    } else if (themeMode === 'auto') {
      const checkAutoTheme = () => {
        const hour = new Date().getHours();
        // 7:00 AM (07:00) to 7:00 PM (19:00) is Light Mode, otherwise Dark Mode
        const shouldBeDark = hour < 7 || hour >= 19;
        setIsDarkMode(shouldBeDark);
      };
      checkAutoTheme();
      // Dynamic updates watch transitions in background
      const timer = setInterval(checkAutoTheme, 15000);
      return () => clearInterval(timer);
    }
  }, [themeMode]);
  const [activeTab, setActiveTab] = useState('home');
  const [visualTab, setVisualTab] = useState('home');
  const currentVisualTabRef = useRef('home');
  const tabSequenceTimeoutRef = useRef<any>(null);
  const activeTabUpdateTimeoutRef = useRef<any>(null);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const isSlidingRef = useRef(false);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    return () => {
      if (tabSequenceTimeoutRef.current) {
        clearInterval(tabSequenceTimeoutRef.current);
      }
      if (activeTabUpdateTimeoutRef.current) {
        clearTimeout(activeTabUpdateTimeoutRef.current);
      }
    };
  }, []);
  const [subTab, setSubTab] = useState<'today' | 'tomorrow' | 'next3'>('today');
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showLangModal, setShowLangModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showJkmModal, setShowJkmModal] = useState(false);
  const [isJkmSyncing, setIsJkmSyncing] = useState(false);
  const [jkmSyncSteps, setJkmSyncSteps] = useState<string[]>([]);
  const [jkmSearchQuery, setJkmSearchQuery] = useState('');
  const [jkmActiveCenterDetail, setJkmActiveCenterDetail] = useState<string | null>(null);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profileName') || 'Lim Jun Jie');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profileEmail') || 'SCKD2400208@segi4u.my');
  const [profileCountry, setProfileCountry] = useState(() => localStorage.getItem('profileCountry') || 'Malaysia');
  const [profilePhone, setProfilePhone] = useState(() => localStorage.getItem('profilePhone') || '+60 12-345 6789');
  const [profileAvatar, setProfileAvatar] = useState(() => localStorage.getItem('profileAvatar') || 'initials');

  const [tempProfileName, setTempProfileName] = useState('Lim Jun Jie');
  const [tempProfileEmail, setTempProfileEmail] = useState('SCKD2400208@segi4u.my');
  const [tempProfileCountry, setTempProfileCountry] = useState('Malaysia');
  const [tempProfilePhone, setTempProfilePhone] = useState('+60 12-345 6789');
  const [tempProfileAvatar, setTempProfileAvatar] = useState('initials');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isVolunteerMode, setIsVolunteerMode] = useState(false);
  const [appPhase, setAppPhase] = useState('monitoring');

  const [currentLocation, _setCurrentLocation] = useState('SEGi University Kota Damansara');
  const [locationMode, setLocationMode] = useState<'auto' | 'manual'>('manual');
  const [currentCoords, _setCurrentCoords] = useState({ lat: 3.1492, lon: 101.5791 });

  // Custom locked setter to ensure the location is always SEGi University
  const setCurrentLocation = (loc: any) => {
    _setCurrentLocation('SEGi University Kota Damansara');
  };

  // Custom locked setter to ensure coordinates are always SEGi University
  const setCurrentCoords = (coords: any) => {
    _setCurrentCoords({ lat: 3.1492, lon: 101.5791 });
  };
  const [mapZoom, setMapZoom] = useState(12);
  const [selectedRouteShelter, setSelectedRouteShelter] = useState<any | null>(null);
  const [selectedShelterDetail, setSelectedShelterDetail] = useState<any | null>(null);
  const [showRouteActive, setShowRouteActive] = useState<boolean>(false);
  const [adminMapZoom, setAdminMapZoom] = useState<number>(13);
  const [adminMapType, setAdminMapType] = useState<string>('terrain');
  const [adminMapSearch, setAdminMapSearch] = useState<string>('');
  const [isMapSweeping, setIsMapSweeping] = useState<boolean>(false);
  const [sweepTelemetry, setSweepTelemetry] = useState<{ signal: string; coords: string; wind: string }>({
    signal: '99.8% Strong',
    coords: '3.3214° N, 101.5768° E',
    wind: '14 km/h West'
  });
  const [bookmarkedShelters, setBookmarkedShelters] = useState<string[]>([]);
  const [isRadarScanning, setIsRadarScanning] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState('');
  const [mapSearchResults, setMapSearchResults] = useState([]);
  const [isSearchingMap, setIsSearchingMap] = useState(false);
  const [simulateStorm, setSimulateStorm] = useState(false);
  const [showCycloneOverlay, setShowCycloneOverlay] = useState(false);
  const [showAllShelters, setShowAllShelters] = useState(false);
  const [selectedSectorId, setSelectedSectorId] = useState<string>('shahalam');
  const [editingShelter, setEditingShelter] = useState<any>(null);
  const [editShelterName, setEditShelterName] = useState('');
  const [editShelterAddress, setEditShelterAddress] = useState('');
  const [editShelterMaxCapacity, setEditShelterMaxCapacity] = useState(500);
  const [editShelterCapacity, setEditShelterCapacity] = useState(200);
  const [editShelterSupervisor, setEditShelterSupervisor] = useState('');
  const [editShelterIsFull, setEditShelterIsFull] = useState(false);

  const startEditingShelter = (shelter: any) => {
    const statusObj = shelterStatus[shelter.id];
    const occ = getShelterOccupancy(shelter);
    setEditingShelter(shelter);
    setEditShelterName(statusObj?.name || shelter.name);
    setEditShelterAddress(statusObj?.address || shelter.address);
    setEditShelterMaxCapacity(statusObj?.maxCapacity || shelter.maxCapacity);
    setEditShelterCapacity(statusObj?.capacity !== undefined ? statusObj.capacity : occ.cap);
    setEditShelterSupervisor(statusObj?.supervisor || "Ramli A.");
    setEditShelterIsFull(statusObj?.isFull || false);
  };

  const handleGoToShelterPage = (shelter: any) => {
    const sectorMap: Record<string, string> = {
      rawang: 'rawang',
      gombak: 'gombak',
      shahalam: 'shahalam',
      klang: 'klang',
      huluselangor: 'huluselangor',
      ampang: 'shahalam',
      selayang: 'gombak',
      puchong: 'shahalam',
      kajang: 'shahalam',
      sjkt_klang: 'klang',
      sepang: 'shahalam',
      kuala_langat: 'klang'
    };

    const sectorId = sectorMap[shelter.id] || 'shahalam';
    setSelectedSectorId(sectorId);
    setAdminView('shelter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Navigating to the dedicated Logistics page for ${shelter.name}...`, 'success');
  };

  const handleOpenShelterEditModal = (shelterId: string) => {
    const shelter = baseShelters.find(s => s.id === shelterId);
    if (shelter) {
      startEditingShelter(shelter);
    }
  };

  const handleLocateSosOnMap = (sos: any) => {
    setCurrentCoords({ lat: sos.lat, lon: sos.lon });
    setMapZoom(15);
    setShowAllCentersOnMap(false);
    setTimeout(() => {
      document.getElementById('admin-incident-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    showToast(`Centering incident map on beacon #SR-${sos.id.slice(-4).toUpperCase()}`, 'info');
  };

  const playRadarScanSound = () => {
    try {
      const audioCtx = getAudioContextApp();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 1.2);

      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.log('AudioContext blocked or unsupported', e);
    }
  };

  const saveShelterPatch = async () => {
    if (!editingShelter) return;
    const path = `artifacts/${appId}/public/data/shelters/${editingShelter.id}`;
    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', editingShelter.id), {
        name: editShelterName,
        address: editShelterAddress,
        maxCapacity: Number(editShelterMaxCapacity),
        capacity: Number(editShelterCapacity),
        supervisor: editShelterSupervisor,
        isFull: editShelterIsFull
      }, { merge: true });
      showToast(`Shelter details updated for ${editShelterName}`, 'success');
      addLog(`[ADMIN] Shelter details patched for ${editingShelter.id}.`);
      setEditingShelter(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const [rainfall, setRainfall] = useState(0);
  const [riverLevel, setRiverLevel] = useState(1.30);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [chartData, setChartData] = useState({ h1: 0, h2: 0, h3: 0, now: 0, f1: 0 });
  const [scrubHour, setScrubHour] = useState(0);

  const [hourlyRainList, setHourlyRainList] = useState([]);
  const [hourlyProbList, setHourlyProbList] = useState([]);

  // Real-time meteorological telemetry trackers
  const [liveTemp, setLiveTemp] = useState<number>(25);
  const [liveHumidity, setLiveHumidity] = useState<number>(80);
  const [liveWindSpeed, setLiveWindSpeed] = useState<number>(10);
  const [liveWeatherCode, setLiveWeatherCode] = useState<number>(3); // WMO Code (3 = Cloudy / Overcast)
  const [hourlyTempList, setHourlyTempList] = useState<number[]>([]);
  const [hourlyWeatherCodeList, setHourlyWeatherCodeList] = useState<number[]>([]);

  const [globalAlerts, setGlobalAlerts] = useState<any[]>(mockAlerts);
  const [globalHazards, setGlobalHazards] = useState<any[]>(mockHazards);
  const [communityPosts, setCommunityPosts] = useState<any[]>(mockCommunityPosts);
  const [deletedPostIds, setDeletedPostIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('deletedPostIds') || '[]');
    } catch {
      return [];
    }
  });

  const [dismissedAlertIds, setDismissedAlertIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('dismissedAlertIds') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dismissedAlertIds', JSON.stringify(dismissedAlertIds));
  }, [dismissedAlertIds]);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const communityImageRef = useRef(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedDetailTab, setSelectedDetailTab] = useState<'about' | 'feed' | 'flood-hq' | 'sessions' | 'challenges'>('about');
  const [myCommunitiesSubTab, setMyCommunitiesSubTab] = useState<'feed' | 'communities'>('feed');
  const [enrolledSessions, setEnrolledSessions] = useState<string[]>([]);
  const [takenChallenges, setTakenChallenges] = useState<string[]>([]);
  const [communityDetailsAccordionOpen, setCommunityDetailsAccordionOpen] = useState(true);
  const [composerCommunityId, setComposerCommunityId] = useState('river-rescue');

  // Interactive Flood Mutual Aid Ledger State
  const [mutualAidLedger, setMutualAidLedger] = useState<any[]>([
    {
      id: "aid-1",
      communityId: "river-rescue",
      type: "request",
      item: "4 Child Life Jackets",
      description: "Need life jackets for young children near flooded street Sector 4. Our current ones are only adult-size.",
      location: "Sector 4 Hydrology (Main Street near Bridge)",
      author: "Sarah Tan",
      timestamp: new Date(Date.now() - 7200000),
      status: "open"
    },
    {
      id: "aid-2",
      communityId: "river-rescue",
      type: "offer",
      item: "Emergency Heavy Rope & Throw-Bags",
      description: "Have several commercial-grade floating rescue lines, throwbags, and metal carabiners. Can drop them off to boat patrols.",
      location: "Sector 2 Swift Patrol (Boat ramp)",
      author: "Marcus Thorne",
      timestamp: new Date(Date.now() - 3600000),
      status: "open"
    },
    {
      id: "aid-3",
      communityId: "hydrology",
      type: "offer",
      item: "DIY Sensor Power Bank Supply",
      description: "Offering portable lithium battery units to help keep DIY storm water sensors online while power grids are down.",
      location: "Tech Hub Sector 3",
      author: "Elena Rostova",
      timestamp: new Date(Date.now() - 10800000),
      status: "open"
    },
    {
      id: "aid-4",
      communityId: "care-sandbags",
      type: "request",
      item: "Coarse Dry Sand (Truckload)",
      description: "Desperately need more dry sand at block 8. Sacks are filled but sand heap is running low. Fast-flowing stream threatens lower doors.",
      location: "Sector 1 Sandbag Depot (South Ridge Gate)",
      author: "Aarav Connor",
      timestamp: new Date(Date.now() - 14400000),
      status: "open"
    },
    {
      id: "aid-5",
      communityId: "storm-spotters",
      type: "request",
      item: "Handheld Barometer/Anemometer",
      description: "Any spotter in Sector 9 have a spare weather station reader? The automatic telemetry gauge got lightning struck.",
      location: "North Ridge Crest",
      author: "Aarav Storm Watcher",
      timestamp: new Date(Date.now() - 5400000),
      status: "open"
    }
  ]);

  // Check-in numbers per community: { [communityId: string]: { safe: number, evac: number, sos: number } }
  const [communityCheckinStats, setCommunityCheckinStats] = useState<any>({
    "river-rescue": { safe: 243, evac: 86, sos: 8 },
    "hydrology": { safe: 154, evac: 32, sos: 1 },
    "storm-spotters": { safe: 98, evac: 64, sos: 3 },
    "care-sandbags": { safe: 310, evac: 121, sos: 12 }
  });

  // User's own check-in status per community: { [communityId: string]: 'safe' | 'evac' | 'sos' | null }
  const [userCheckinStates, setUserCheckinStates] = useState<any>({});

  // Local state for the new mutual aid item form
  const [newAidType, setNewAidType] = useState<'request' | 'offer'>('request');
  const [newAidItem, setNewAidItem] = useState('');
  const [newAidDesc, setNewAidDesc] = useState('');
  const [newAidLoc, setNewAidLoc] = useState('');
  const [sosRequests, setSosRequests] = useState<any[]>(mockSosRequests);
  const [myActiveSos, setMyActiveSos] = useState(null);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const [shelterStatus, setShelterStatus] = useState({});
  const [interactiveMapShelterId, setInteractiveMapShelterId] = useState(null);
  const [travelMode, setTravelMode] = useState('drive'); // 'drive' | 'walk'
  const [mapViewType, setMapViewType] = useState('roadmap');
  const [showSheltersOverlay, setShowSheltersOverlay] = useState(true);
  const [showHazardsOverlay, setShowHazardsOverlay] = useState(true);
  const [showAllCentersOnMap, setShowAllCentersOnMap] = useState(false);

  const [broadcastZone, setBroadcastZone] = useState('ALL ZONES');
  const [broadcastType, setBroadcastType] = useState('Evacuation Order');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [residentActionPlan, setResidentActionPlan] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPreparingVoice, setIsPreparingVoice] = useState(false);
  const audioRef = useRef(null);
  const activeAudioSourceRef = useRef<any>(null);
  const activeAudioCtxRef = useRef<any>(null);
  const speechUtteranceRef = useRef<any>(null);

  // New highly interactive feature states
  const [chartDisplayMode, setChartDisplayMode] = useState('river'); // 'river' | 'rainfall'
  const [shelterTagFilter, setShelterTagFilter] = useState('all'); // 'all' | 'medical' | 'generator' | 'food' | 'pets'
  const [simulationPreset, setSimulationPreset] = useState('none'); // 'none' | 'normal' | 'monsoon' | 'critical' | 'extreme' | 'recovery'
  const [upvotedPostIds, setUpvotedPostIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('upvotedPostIds') || '[]');
    } catch {
      return [];
    }
  });

  const [showHazardModal, setShowHazardModal] = useState(false);
  const [showRouteSteps, setShowRouteSteps] = useState(false);
  const [hazardForm, setHazardForm] = useState({ type: 'Flooded Road', severity: 'Medium', description: '' });
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  const [checklist, setChecklist] = useState([
    { id: 1, key: 'checkDoc', checked: false },
    { id: 2, key: 'checkMed', checked: false },
    { id: 3, key: 'checkPower', checked: false },
    { id: 4, key: 'checkFlash', checked: false },
    { id: 5, key: 'checkWater', checked: false }
  ]);
  const checkedCount = checklist.filter(i => i.checked).length;

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [officialReport, setOfficialReport] = useState(null);
  const [activePushNotification, setActivePushNotification] = useState(null);
  const previousAlertsCount = useRef(0);

  const [systemLogs, setSystemLogs] = useState([]);
  const [islandExpanded, setIslandExpanded] = useState(false);
  const [islandMessage, setIslandMessage] = useState('');

  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const pushTimerRef = useRef(null);
  const logsContainerRef = useRef(null);

  const t = i18n[language];

  const addLog = (msg) => setSystemLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-50));

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  };

  const showPushNotification = (alert) => {
    if (!notificationsEnabled) return;
    setActivePushNotification(alert);
    if (pushTimerRef.current) clearTimeout(pushTimerRef.current);
    pushTimerRef.current = setTimeout(() => setActivePushNotification(null), 5000);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  useEffect(() => {
    if (logsContainerRef.current) logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  }, [systemLogs]);

  const callSatLinkForecast = async (prompt) => {
    let retries = 4;
    let delay = 1000;

    for (let i = 0; i < retries; i++) {
      try {
        const serverRes = await fetch("/api/satlink/forecast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });

        if (serverRes.ok) {
          const serverData = await serverRes.json();
          if (serverData.text) return serverData.text;
        } else {
          const errorText = await serverRes.text();
          console.warn(`Server API attempt ${i + 1} failed: ${serverRes.status} - ${errorText}`);
        }
      } catch (serverErr) {
        console.warn(`Server API attempt ${i + 1} experienced connectivity error:`, serverErr);
      }

      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }

    return "Failed to generate safety advice due to temporary connectivity issues. Please proceed to designated high ground or consult live radio broadcasts.";
  };

  const handleListenToSatLinkVoice = async () => {
    if (!residentActionPlan) return;

    if (isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (activeAudioSourceRef.current) {
        try {
          activeAudioSourceRef.current.stop();
        } catch (e) { }
        activeAudioSourceRef.current = null;
      }
      if (activeAudioCtxRef.current) {
        try {
          activeAudioCtxRef.current.close();
        } catch (e) { }
        activeAudioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
      setIsPreparingVoice(false);
      return;
    }

    setIsPreparingVoice(true);
    const cleanAdviceText = residentActionPlan.replace(/•/g, "").replace(/\n/g, ". ");

    try {
      addLog(`[SYSTEM] Requesting Live Sat-Link Native Audio generation...`);
      const res = await fetch("/api/satlink/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanAdviceText })
      });
      if (!res.ok) throw new Error(`TTS server responded with status ${res.status}`);
      const data = await res.json();
      if (!data.audioData) throw new Error("No audio data returned from server");

      // Convert base64 PCM to audio buffer
      const binaryString = window.atob(data.audioData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const numSamples = len / 2;
      const floatData = new Float32Array(numSamples);
      const dataView = new DataView(bytes.buffer);

      for (let i = 0; i < numSamples; i++) {
        const sample = dataView.getInt16(i * 2, true);
        floatData[i] = sample / 32768;
      }

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      activeAudioCtxRef.current = audioCtx;

      const buffer = audioCtx.createBuffer(1, numSamples, 24000);
      buffer.copyToChannel(floatData, 0);

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      activeAudioSourceRef.current = source;

      source.onended = () => {
        setIsPlayingAudio(false);
        setIsPreparingVoice(false);
        addLog(`[SYSTEM] Sat-Link audio broadcast completed.`);
      };

      source.start(0);
      setIsPlayingAudio(true);
      setIsPreparingVoice(false);
      showToast("Broadcasting Live Sat-Link safety voice...", "success");
      addLog(`[SYSTEM] Sat-Link vocalization broadcasting dynamically...`);
    } catch (err) {
      console.warn("Sat-Link TTS play failed, falling back to local synthesis:", err);
      showToast("Live Sat-Link cloud engine busy. Activating local synthesis backup...", "info");

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel(); // Cancel any current broadcasting

          const utterance = new SpeechSynthesisUtterance(cleanAdviceText);
          speechUtteranceRef.current = utterance;
          utterance.lang = language === 'ms' ? 'ms-MY' : language === 'cn' ? 'zh-CN' : 'en-US';

          const voices = window.speechSynthesis.getVoices();
          const targetLang = utterance.lang.toLowerCase();
          const matchingVoices = voices.filter(v =>
            v.lang.toLowerCase().includes(targetLang) ||
            v.lang.toLowerCase().startsWith(targetLang.split('-')[0])
          );

          // Specifically prioritize high-quality natural female voices
          const femaleVoice = matchingVoices.find(v => {
            const name = v.name.toLowerCase();
            return name.includes('samantha') ||
              name.includes('zira') ||
              name.includes('karen') ||
              name.includes('victoria') ||
              name.includes('moira') ||
              name.includes('hazel') ||
              name.includes('female') ||
              name.includes('girl') ||
              name.includes('google us english') ||
              name.includes('premium') ||
              name.includes('natural');
          }) || matchingVoices[0];

          if (femaleVoice) {
            utterance.voice = femaleVoice;
          }

          utterance.rate = 1.0;

          utterance.onend = () => {
            setIsPlayingAudio(false);
            setIsPreparingVoice(false);
            addLog(`[SYSTEM] Sat-Link audio broadcast completed (Local Backup).`);
          };

          utterance.onerror = (e) => {
            console.warn("Local SpeechSynthesis experienced a playback warning:", e);
            setIsPlayingAudio(false);
            setIsPreparingVoice(false);
          };

          setIsPlayingAudio(true);
          setIsPreparingVoice(false);
          window.speechSynthesis.speak(utterance);
          addLog(`[SYSTEM] Sat-Link vocalization broadcasting dynamically (Local Backup)...`);
        } catch (localErr) {
          console.warn("Local SpeechSynthesis error:", localErr);
          setIsPlayingAudio(false);
          setIsPreparingVoice(false);
          showToast("Failed to initiate fallback audio broadcast.", "error");
        }
      } else {
        showToast("Speech output is unsupported in this web browser context.", "warning");
        setIsPlayingAudio(false);
        setIsPreparingVoice(false);
      }
    }
  };

  const calculateLinearRegression = (historicalDataArray) => {
    const n = historicalDataArray.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (let i = 0; i < n; i++) {
      sumX += i; sumY += historicalDataArray[i]; sumXY += i * historicalDataArray[i]; sumXX += i * i;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return Math.max(0, +((slope * 4) + intercept).toFixed(2));
  };

  useEffect(() => {
    setTimeout(() => setIsBooting(false), 1800);
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (err: any) {
        if (err?.code === 'auth/admin-restricted-operation' || err?.message?.includes('admin-restricted-operation')) {
          console.warn("Anonymous sign-in is disabled/restricted in the Firebase project settings. Proceeding in offline mock-auth fallback mode.");
        } else {
          console.warn("Firebase Auth Notice:", err);
        }
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
    let unsubProfile = () => { };
    if (isRealFirebaseUser) {
      const userProfileRef = doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data');
      unsubProfile = onSnapshot(userProfileRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.checklist) setChecklist(data.checklist);
          if (data.language) setLanguage(data.language);
          if (data.profileName) setProfileName(data.profileName);
          if (data.profileEmail) setProfileEmail(data.profileEmail);
          if (data.profileCountry) setProfileCountry(data.profileCountry);
          if (data.profilePhone) setProfilePhone(data.profilePhone);
          if (data.profileAvatar) setProfileAvatar(data.profileAvatar);
          if (data.themeMode !== undefined) {
            setThemeMode(data.themeMode);
          } else if (data.isDarkMode !== undefined) {
            setThemeMode(data.isDarkMode ? 'dark' : 'light');
          }
        }
      }, (err) => handleFirestoreError(err, OperationType.GET, `artifacts/${appId}/users/${user.uid}/profile/data`));
    }

    const alertsRef = collection(db, 'artifacts', appId, 'public', 'data', 'broadcast_alerts');
    const unsubAlerts = onSnapshot(alertsRef, (snapshot) => {
      const fetchedAlerts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)).sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      setGlobalAlerts(fetchedAlerts.length > 0 ? fetchedAlerts : mockAlerts);

      if (fetchedAlerts.length > previousAlertsCount.current && previousAlertsCount.current > 0 && !isAdmin) {
        showPushNotification(fetchedAlerts[0] || mockAlerts[0]);
        setHasUnreadAlerts(true);
      }
      previousAlertsCount.current = fetchedAlerts.length;
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/broadcast_alerts`);
      setGlobalAlerts(mockAlerts);
    });

    const hazardsRef = collection(db, 'artifacts', appId, 'public', 'data', 'hazards');
    const unsubHazards = onSnapshot(hazardsRef, (snapshot) => {
      const fetchedHazards = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setGlobalHazards(fetchedHazards.length > 0 ? fetchedHazards : mockHazards);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/hazards`);
      setGlobalHazards(mockHazards);
    });

    const postsRef = collection(db, 'artifacts', appId, 'public', 'data', 'community_posts');
    const unsubPosts = onSnapshot(postsRef, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)).sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      setCommunityPosts(fetchedPosts.length > 0 ? fetchedPosts : mockCommunityPosts);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/community_posts`);
      setCommunityPosts(mockCommunityPosts);
    });

    const sosRef = collection(db, 'artifacts', appId, 'public', 'data', 'sos_requests');
    const unsubSos = onSnapshot(sosRef, (snapshot) => {
      const fetchedSos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any)).sort((a, b) => {
        const timeA = a.timestamp?.toMillis() || 0;
        const timeB = b.timestamp?.toMillis() || 0;
        return timeB - timeA;
      });
      const finalSos = fetchedSos.length > 0 ? fetchedSos : mockSosRequests;
      setSosRequests(finalSos);

      const activeMission = finalSos.find(s =>
        (s.userId === (user?.uid || 'guest_resident') && ['PENDING', 'ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status)) ||
        (s.volunteerId === (user?.uid || 'guest_volunteer') && ['ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status))
      );
      setMyActiveSos(activeMission || null);

      // 2-way sync: Update local citizens array if there are active SOS requests
      _setCitizens(prev => {
        let changed = false;
        const updated = prev.map(c => {
          const activeSos = finalSos.find(s =>
            s.status !== 'RESOLVED' &&
            (s.userId === c.id || s.phone === c.phone || s.name === c.name || (c.id === 'cit-self' && s.userId === (user?.uid || 'guest_resident')))
          );

          if (activeSos && c.status !== 'SOS PENDING') {
            changed = true;
            return { ...c, status: 'SOS PENDING' as const };
          } else if (!activeSos && c.status === 'SOS PENDING') {
            changed = true;
            return { ...c, status: 'SAFE' as const };
          }
          return c;
        });

        if (changed) {
          const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user?.uid);
          if (isRealFirebaseUser) {
            setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'citizens_state'), {
              list: updated
            });
          }
          return updated;
        }
        return prev;
      });
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/sos_requests`);
      setSosRequests(mockSosRequests);
    });

    const sheltersRef = collection(db, 'artifacts', appId, 'public', 'data', 'shelters');
    const unsubShelters = onSnapshot(sheltersRef, (snapshot) => {
      const statuses = {}; snapshot.docs.forEach(doc => { (statuses as any)[doc.id] = doc.data(); }); setShelterStatus(statuses);

      const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user?.uid);

      // Sync citizens list
      if (statuses['citizens_state']?.list) {
        _setCitizens(statuses['citizens_state'].list);
      } else if (isRealFirebaseUser) {
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'citizens_state'), {
          list: mockCitizens
        });
      }

      // Sync shelter supplies
      if (statuses['shelter_supplies']) {
        setShelterSupplies(statuses['shelter_supplies']);
      } else if (isRealFirebaseUser) {
        const defaultSupplies = {
          rawang: { id: 'rawang', waterBoxes: 120, foodRations: 110, medicalKits: 45, sandbags: 100 },
          shahalam: { id: 'shahalam', waterBoxes: 60, foodRations: 45, medicalKits: 20, sandbags: 220 },
          klang: { id: 'klang', waterBoxes: 250, foodRations: 240, medicalKits: 110, sandbags: 400 },
          huluselangor: { id: 'huluselangor', waterBoxes: 90, foodRations: 85, medicalKits: 50, sandbags: 80 },
          batucaves: { id: 'batucaves', waterBoxes: 110, foodRations: 95, medicalKits: 60, sandbags: 150 },
          kualalumpur: { id: 'kualalumpur', waterBoxes: 300, foodRations: 280, medicalKits: 150, sandbags: 500 },
          petalingjaya: { id: 'petalingjaya', waterBoxes: 180, foodRations: 160, medicalKits: 90, sandbags: 200 },
          subangjaya: { id: 'subangjaya', waterBoxes: 210, foodRations: 190, medicalKits: 100, sandbags: 240 },
          penang: { id: 'penang', waterBoxes: 160, foodRations: 140, medicalKits: 70, sandbags: 190 },
          johorbahru: { id: 'johorbahru', waterBoxes: 230, foodRations: 210, medicalKits: 105, sandbags: 260 }
        };
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'shelter_supplies'), defaultSupplies);
      }

      // Sync siren & levee dam EOC state
      if (statuses['eoc_state']) {
        setIsSirenActive(!!statuses['eoc_state'].isSirenActive);
        setIsLeveeDamDeployed(!!statuses['eoc_state'].isLeveeDamDeployed);
      } else if (isRealFirebaseUser) {
        setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', 'eoc_state'), {
          isSirenActive: false,
          isLeveeDamDeployed: false
        });
      }
    }, (err) => handleFirestoreError(err, OperationType.LIST, `artifacts/${appId}/public/data/shelters`));

    return () => { unsubProfile(); unsubAlerts(); unsubHazards(); unsubPosts(); unsubSos(); unsubShelters(); };
  }, [user, isAdmin, notificationsEnabled]);

  useEffect(() => {
    const fetchRealWeather = async () => {
      setIsLoadingApi(true);
      addLog(`[API] Fetching meteorological data for ${currentLocation}...`);
      try {
        if (simulationPreset === 'normal') {
          addLog(`[SYSTEM] PRESET MODE: Switched to sunny nominal baseline parameters.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(0.1); setRiverLevel(1.25);
          setHourlyRainList(Array.from({ length: 120 }, () => 0.1));
          setHourlyProbList(Array.from({ length: 120 }, () => 10));
          setChartData({ h1: 0.1, h2: 0.2, h3: 0.1, now: 0.1, f1: 0.2 });

          setLiveTemp(28);
          setLiveHumidity(65);
          setLiveWindSpeed(8);
          setLiveWeatherCode(0); // Clear Sky
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 24 + 4 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 0));

        } else if (simulationPreset === 'monsoon') {
          addLog(`[SYSTEM] PRESET MODE: Overriding API with simulated Type 2 Monsoon rainfall.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(4.5); setRiverLevel(2.45);
          const mockRain = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 1.5 + index * 0.5;
            if (index === 3) return 4.5;
            const futureHour = index - 3;
            if (futureHour <= 6) return 4.5 + futureHour * 0.5;
            return Math.max(0, 7.5 - (futureHour - 6) * 0.2);
          });
          const mockProb = Array.from({ length: 120 }, () => 85);
          setHourlyRainList(mockRain);
          setHourlyProbList(mockProb);
          setChartData({ h1: 1.5, h2: 2.2, h3: 3.5, now: 4.5, f1: 5.0 });

          setLiveTemp(22);
          setLiveHumidity(95);
          setLiveWindSpeed(16);
          setLiveWeatherCode(61); // Rain Showers
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 19 + 3 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, (_, idx) => idx % 8 === 0 ? 95 : 61));

        } else if (simulationPreset === 'critical' || simulateStorm) {
          addLog(`[SYSTEM] PRESET MODE: Overriding API with Level 3 storm telemetry.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(45.5); setRiverLevel(2.85);

          const mockRain = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 10 + index * 5;
            if (index === 3) return 45.5;
            const futureHour = index - 3;
            if (futureHour <= 6) return 45.5 + futureHour * 3;
            return Math.max(0, 63.5 - (futureHour - 6) * 1.5);
          });
          const mockProb = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 80;
            if (index === 3) return 95;
            const futureHour = index - 3;
            if (futureHour <= 12) return Math.min(100, 95 + futureHour);
            return Math.max(20, 100 - (futureHour - 12) * 2);
          });
          setHourlyRainList(mockRain);
          setHourlyProbList(mockProb);
          setChartData({ h1: 12, h2: 18, h3: 28, now: 45.5, f1: 48.5 });
          addLog(`[FORECAST] Linear Regression predicted next hour rainfall: 48.5 mm/hr.`);

          setLiveTemp(18);
          setLiveHumidity(100);
          setLiveWindSpeed(24);
          setLiveWeatherCode(95); // Thunderstorm
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 15 + 3 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 95));

        } else if (simulationPreset === 'extreme') {
          addLog(`[SYSTEM] PRESET MODE: Overriding API with extreme catastrophic peak flood values.`);
          await new Promise(r => setTimeout(r, 400));
          setRainfall(85.0); setRiverLevel(3.95);

          const mockRain = Array.from({ length: 120 }, (_, index) => {
            if (index < 3) return 40 + index * 10;
            if (index === 3) return 85.0;
            const futureHour = index - 3;
            if (futureHour <= 6) return 85.0 + futureHour * 2;
            return Math.max(0, 97.0 - (futureHour - 6) * 2);
          });
          const mockProb = Array.from({ length: 120 }, () => 100);
          setHourlyRainList(mockRain);
          setHourlyProbList(mockProb);
          setChartData({ h1: 40, h2: 60, h3: 75, now: 85.0, f1: 89.0 });
          addLog(`[FORECAST] Linear Regression predicted peak rainfall forecast: 89.0 mm/hr.`);

          setLiveTemp(14);
          setLiveHumidity(100);
          setLiveWindSpeed(32);
          setLiveWeatherCode(99); // Heavy Thunderstorm
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 12 + 2 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 99));

        } else if (simulationPreset === 'recovery' || appPhase === 'recovery') {
          setRainfall(0);
          setRiverLevel(1.15);
          setHourlyRainList(Array.from({ length: 120 }, () => 0));
          setHourlyProbList(Array.from({ length: 120 }, () => 0));
          setChartData({ h1: 0, h2: 0, h3: 0, now: 0, f1: 0 });

          setLiveTemp(24);
          setLiveHumidity(85);
          setLiveWindSpeed(10);
          setLiveWeatherCode(2); // Cloudy
          setHourlyTempList(Array.from({ length: 120 }, (_, idx) => 22 + 3 * Math.sin((idx + 8) * Math.PI / 12)));
          setHourlyWeatherCodeList(Array.from({ length: 120 }, (_, idx) => idx % 10 === 0 ? 1 : 2));

        } else {
          const { lat, lon } = currentCoords;
          try {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,precipitation,precipitation_probability,weather_code&past_hours=3&timezone=Asia%2FSingapore`);
            if (!response.ok) throw new Error("API request failed");
            const data = await response.json();

            const currentRain = data.current?.precipitation || 0;
            setRainfall(currentRain);
            setRiverLevel(+(1.30 + (currentRain * 0.06)).toFixed(2));

            const currentTemp = data.current?.temperature_2m !== undefined ? data.current.temperature_2m : 25;
            const currentHumidity = data.current?.relative_humidity_2m !== undefined ? data.current.relative_humidity_2m : 80;
            const currentWind = data.current?.wind_speed_10m !== undefined ? data.current.wind_speed_10m : 10;
            const currentWeatherCode = data.current?.weather_code !== undefined ? data.current.weather_code : 3;

            setLiveTemp(currentTemp);
            setLiveHumidity(currentHumidity);
            setLiveWindSpeed(currentWind);
            setLiveWeatherCode(currentWeatherCode);

            const hourlyRain = data.hourly?.precipitation || [];
            const hourlyProb = data.hourly?.precipitation_probability || [];
            const tempList = data.hourly?.temperature_2m || [];
            const weatherCodeList = data.hourly?.weather_code || [];

            setHourlyRainList(hourlyRain);
            setHourlyProbList(hourlyProb);
            setHourlyTempList(tempList);
            setHourlyWeatherCodeList(weatherCodeList);

            let past = [0, 0, 0]; let curr = currentRain;
            if (hourlyRain.length >= 4) {
              past = hourlyRain.slice(0, 3); curr = hourlyRain[3];
            }
            const ourAiPrediction = calculateLinearRegression([...past, curr]);
            addLog(`[FORECAST] Processed prediction pipeline. Next hour forecast: ${ourAiPrediction} mm/hr.`);
            setChartData({ h1: past[0], h2: past[1], h3: past[2], now: curr, f1: ourAiPrediction });
          } catch (fetchErr) {
            console.warn("Weather API fetch failed. Using fallback telemetry.", fetchErr);
            addLog(`[WARNING] External API unreachable. Switched to offline telemetry mode.`);
            setRainfall(0); setRiverLevel(1.30);
            setHourlyRainList(Array.from({ length: 120 }, () => 0));
            setHourlyProbList(Array.from({ length: 120 }, () => 0));
            setHourlyTempList(Array.from({ length: 120 }, () => 24));
            setHourlyWeatherCodeList(Array.from({ length: 120 }, () => 3));
            setChartData({ h1: 0, h2: 0, h3: 0, now: 0, f1: 0 });
          }
        }
      } catch (error) {
        console.error("Critical API Fetch Error:", error);
      } finally {
        setIsLoadingApi(false);
      }
    };
    fetchRealWeather();
    const interval = setInterval(fetchRealWeather, 180000);
    return () => clearInterval(interval);
  }, [currentCoords, simulateStorm, appPhase, simulationPreset]);

  useEffect(() => { setScrubHour(0); setResidentActionPlan(''); }, [currentLocation, simulateStorm]);

  useEffect(() => {
    if (!mapSearchQuery || mapSearchQuery.trim().length < 2) {
      setMapSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearchingMap(true);
      try {
        const localMatches = manualLocations.filter(loc =>
          loc.name.toLowerCase().includes(mapSearchQuery.toLowerCase())
        );

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(mapSearchQuery)}&format=json&limit=5&addressdetails=1`
        );
        if (response.ok) {
          const data = await response.json();
          const apiMatches = data.map((item: any) => ({
            name: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            isApi: true
          }));

          const combined = [...localMatches.map(m => ({ ...m, isApi: false }))];
          apiMatches.forEach((apiItem: any) => {
            if (!combined.some(c => c.name.toLowerCase() === apiItem.name.toLowerCase() || (Math.abs(c.lat - apiItem.lat) < 0.01 && Math.abs(c.lon - apiItem.lon) < 0.01))) {
              combined.push(apiItem);
            }
          });

          setMapSearchResults(combined);
        } else {
          setMapSearchResults(localMatches.map(m => ({ ...m, isApi: false })));
        }
      } catch (err) {
        console.warn("Geocoding fetch error:", err);
        const localMatches = manualLocations.filter(loc =>
          loc.name.toLowerCase().includes(mapSearchQuery.toLowerCase())
        );
        setMapSearchResults(localMatches.map(m => ({ ...m, isApi: false })));
      } finally {
        setIsSearchingMap(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [mapSearchQuery]);

  let aiStatus = appPhase === 'recovery' ? 'RECOVERY' : t.safe;
  let timeToCritical = '--'; let statusText = appPhase === 'recovery' ? 'Water receding. Safe to proceed with cleanup.' : t.safeDesc;
  let dynamicAccentColor = appPhase === 'recovery' ? '#0A84FF' : (isDarkMode ? '#32D74B' : '#34C759');

  if (appPhase !== 'recovery') {
    if (rainfall >= 10 || chartData.f1 >= 10) { aiStatus = t.critical; timeToCritical = '18'; statusText = t.critDesc; dynamicAccentColor = isDarkMode ? '#FF453A' : '#FF3B30'; }
    else if (rainfall >= 1.0 || chartData.f1 >= 1.0) { aiStatus = t.warning; timeToCritical = '45'; statusText = t.warnDesc; dynamicAccentColor = isDarkMode ? '#FF9F0A' : '#FF9500'; }
  }

  useEffect(() => {
    if (!isBooting && isAuthenticated && !isAdmin && !isLoadingApi && appPhase !== 'recovery') {
      if (aiStatus === t.critical) { setIslandMessage('LEVEL 3: EVACUATE NOW'); setIslandExpanded(true); setTimeout(() => setIslandExpanded(false), 4000); }
      else if (aiStatus === t.warning) { setIslandMessage('Heavy Rain Detected'); setIslandExpanded(true); setTimeout(() => setIslandExpanded(false), 3000); }
    }
  }, [aiStatus, isAuthenticated, isBooting, isAdmin, isLoadingApi, appPhase, t.critical, t.warning]);

  const getRainAtHour = (h) => {
    const idx = h + 3;
    if (hourlyRainList && hourlyRainList.length > idx && idx >= 0) {
      return hourlyRainList[idx];
    }
    if (h === -3) return chartData.h1; if (h === -2) return chartData.h2; if (h === -1) return chartData.h3; if (h === 0) return chartData.now;
    const slope = chartData.f1 - chartData.now;
    if (slope > 0) {
      const peakH = 6;
      if (h <= peakH) return chartData.now + slope * h;
      else { const peakRain = chartData.now + slope * peakH; return Math.max(0, peakRain - (h - peakH) * (peakRain / 24)); }
    } else { return Math.max(0, chartData.now + slope * h); }
  };

  const getProbAtHour = (h) => {
    const idx = h + 3;
    if (hourlyProbList && hourlyProbList.length > idx && idx >= 0) {
      return hourlyProbList[idx];
    }
    const rain = getRainAtHour(h);
    if (rain > 15) return 95;
    if (rain > 5) return 80;
    if (rain > 0.5) return 40;
    return 0;
  };

  const graphData = useMemo(() => Array.from({ length: 49 }, (_, i) => {
    const h = i;
    const rain = getRainAtHour(h); return { h, rain, depth: +(1.30 + (rain * 0.06)).toFixed(2) };
  }), [chartData, hourlyRainList]);

  const hourlyForecast = useMemo(() => Array.from({ length: 6 }).map((_, i) => {
    const forecastHour = new Date();
    // Guarantee that hours are strictly top-of-hours with exactly 0 minutes, seconds, and milliseconds
    forecastHour.setHours(forecastHour.getHours() + i + 1, 0, 0, 0);
    const hOffset = i + 1;
    const rainAtHour = getRainAtHour(hOffset);
    const probAtHour = getProbAtHour(hOffset);

    let icon = <Cloud size={20} className="text-gray-400 animate-pulse" />;
    // Map colors dynamics to icon classes based on intensity thresholds
    if (rainAtHour >= 10.0) {
      icon = <CloudLightning size={20} className="text-[#FF453A] drop-shadow-sm animate-bounce" />;
    } else if (rainAtHour >= 1.0) {
      icon = <CloudRain size={20} className="text-[#FF9F0A] drop-shadow-sm animate-pulse" />;
    } else if (rainAtHour > 0.1 || probAtHour > 20) {
      icon = <CloudRain size={20} className="text-[#0A84FF] drop-shadow-sm" />;
    } else {
      const hourVal = forecastHour.getHours();
      const isDaytime = hourVal > 6 && hourVal < 19;
      icon = isDaytime ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-200" />;
    }

    return {
      time: forecastHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rain: rainAtHour,
      prob: probAtHour,
      icon: icon
    };
  }), [hourlyRainList, hourlyProbList, chartData, simulateStorm]);

  const FIXED_MIN_DEPTH = 1.0;
  const peakDepth = Math.max(...graphData.map(d => d.depth));
  const dynamicMaxDepth = Math.max(3.2, peakDepth + 0.2);

  const peakRain = Math.max(...graphData.map(d => d.rain));
  const dynamicMaxRain = Math.max(10.0, peakRain + 5.0);

  const getGraphX = (h: number) => 6 + (h / 48) * 88;
  const getGraphY = (val: number) => {
    if (chartDisplayMode === 'rainfall') {
      const clampedRain = Math.max(0.0, Math.min(dynamicMaxRain, val));
      return 100 - (clampedRain / dynamicMaxRain) * 100;
    } else {
      const clampedDepth = Math.max(FIXED_MIN_DEPTH, Math.min(dynamicMaxDepth, val));
      return 100 - ((clampedDepth - FIXED_MIN_DEPTH) / (dynamicMaxDepth - FIXED_MIN_DEPTH)) * 100;
    }
  };

  const pastPoints = graphData.filter(d => d.h <= scrubHour);
  const dPast = pastPoints.length > 0 ? "M " + pastPoints.map(d => `${getGraphX(d.h)},${getGraphY(chartDisplayMode === 'rainfall' ? d.rain : d.depth)}`).join(" L ") : "";

  const futurePoints = graphData.filter(d => d.h >= scrubHour);
  const dFuture = futurePoints.length > 0 ? "M " + futurePoints.map(d => `${getGraphX(d.h)},${getGraphY(chartDisplayMode === 'rainfall' ? d.rain : d.depth)}`).join(" L ") : "";
  const fullCurvePath = graphData.map(d => `${getGraphX(d.h)},${getGraphY(chartDisplayMode === 'rainfall' ? d.rain : d.depth)}`).join(" L ");
  const areaGraph = `M ${getGraphX(0)},100 L ${fullCurvePath} L ${getGraphX(48)},100 Z`;

  const currentPoint = graphData.find(d => d.h === scrubHour) || graphData.find(d => d.h === 0);
  const displayRainfall = +(currentPoint.rain).toFixed(1);
  const displayRiverLevel = currentPoint.depth;

  const getImpactText = (depth) => {
    if (depth <= 2.1) return { color: '#32D74B', icon: <Shield size={16} />, title: 'Safe / Normal', text: language === 'en' ? 'Normal river flow. No immediate threat to property.' : 'Aliran sungai normal. Tiada ancaman serta-merta.' };
    if (depth <= 2.2) return { color: '#32D74B', icon: <Info size={16} />, title: 'Elevated Water', text: language === 'en' ? 'Water levels elevated. Drains may be full, but roads are clear.' : 'Paras air meningkat. Longkang mungkin penuh, jalan raya safe.' };
    if (depth <= 2.8) return { color: '#FF9F0A', icon: <AlertTriangle size={16} />, title: 'Hazard / Watch', text: language === 'en' ? 'Street pooling likely. Roads may be impassable for standard sedans. Drive with extreme caution.' : 'Air bertakung. Jalan mungkin tidak boleh dilalui sedan. Pandu dengan berhati-hati.' };
    if (depth <= 4.0) return { color: '#FF453A', icon: <Waves size={16} />, title: 'Critical Warning', text: language === 'en' ? 'Water approaching ground floor. Move vehicles to higher ground immediately.' : 'Air menghampiri tingkat bawah. Pindahkan kenderaan ke kawasan tinggi segera.' };
    return { color: '#BA1A1A', icon: <AlertOctagon size={16} />, title: 'Severe Emergency', text: language === 'en' ? 'Life-threatening conditions. Severe property submersion. Evacuate immediately.' : 'Ancaman nyawa. Harta benda tenggelam teruk. Pindah segera.' };
  };
  const currentImpact = getImpactText(displayRiverLevel);

  const handleTabChange = (targetTab) => {
    if (tabSequenceTimeoutRef.current) {
      clearInterval(tabSequenceTimeoutRef.current);
      tabSequenceTimeoutRef.current = null;
    }

    if (targetTab === 'alerts') {
      setHasUnreadAlerts(false);
    }

    // Instantly set both visual selector and active view.
    // This allows React 18 to batch both state updates in a single tick.
    // Framer Motion's GPU-accelerated spring animations naturally glide the pill smoothly
    // across all intermediate positions on-screen at a silky-smooth 120fps.
    currentVisualTabRef.current = targetTab;
    setVisualTab(targetTab);
    setActiveTab(targetTab);
  };

  const updateTabFromCoordinates = (clientX: number, forceCommit = false) => {
    if (!tabBarRef.current) return;
    const rect = tabBarRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const fraction = relativeX / rect.width;
    const tabIndex = Math.floor(Math.max(0, Math.min(0.999, fraction)) * 5);
    const tabs = ['home', 'map', 'community', 'alerts', 'settings'];
    const targetTab = tabs[tabIndex];
    if (targetTab) {
      // Avoid redundant calculations and heavy main-thread thrashes if the segment hasn't changed.
      if (targetTab === currentVisualTabRef.current && !forceCommit) {
        return;
      }

      if (tabSequenceTimeoutRef.current) {
        clearInterval(tabSequenceTimeoutRef.current);
        tabSequenceTimeoutRef.current = null;
      }
      if (targetTab === 'alerts') {
        setHasUnreadAlerts(false);
      }

      // Update visual selection instantly so the glass indicator moves at 120fps
      currentVisualTabRef.current = targetTab;
      setVisualTab(targetTab);

      if (forceCommit) {
        if (activeTabUpdateTimeoutRef.current) {
          clearTimeout(activeTabUpdateTimeoutRef.current);
          activeTabUpdateTimeoutRef.current = null;
        }
        setActiveTab(targetTab);
      } else {
        // Debounce the heavy main-thread page commit so sliding over intermediate tabs is butter-smooth
        if (activeTabUpdateTimeoutRef.current) {
          clearTimeout(activeTabUpdateTimeoutRef.current);
        }
        activeTabUpdateTimeoutRef.current = setTimeout(() => {
          setActiveTab(targetTab);
        }, 80);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isSlidingRef.current = true;
    setIsSliding(true);
    updateTabFromCoordinates(e.touches[0].clientX, true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSlidingRef.current) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    updateTabFromCoordinates(e.touches[0].clientX, false);
  };

  const handleTouchEnd = () => {
    isSlidingRef.current = false;
    setIsSliding(false);
    if (activeTabUpdateTimeoutRef.current) {
      clearTimeout(activeTabUpdateTimeoutRef.current);
      activeTabUpdateTimeoutRef.current = null;
    }
    setActiveTab(currentVisualTabRef.current);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isSlidingRef.current = true;
    setIsSliding(true);
    updateTabFromCoordinates(e.clientX, true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSlidingRef.current) return;
    updateTabFromCoordinates(e.clientX, false);
  };

  const handleMouseUpOrLeave = () => {
    if (isSlidingRef.current) {
      isSlidingRef.current = false;
      setIsSliding(false);
      if (activeTabUpdateTimeoutRef.current) {
        clearTimeout(activeTabUpdateTimeoutRef.current);
        activeTabUpdateTimeoutRef.current = null;
      }
      setActiveTab(currentVisualTabRef.current);
    }
  };

  const fetchLiveLocation = () => {
    if (!navigator.geolocation) { showToast('Geolocation is not supported by your browser', 'error'); return; }
    showToast('Acquiring Live GPS Signal...', 'info');
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude; const lon = position.coords.longitude;
      try {
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        if (!res.ok) throw new Error("Reverse geocode failed");
        const data = await res.json();
        const city = data.city || data.locality || "Current Zone";
        setCurrentCoords({ lat, lon }); setCurrentLocation(city);
        setLocationMode('auto');
        showToast(`GPS Locked: ${city}`, 'success'); addLog(`[SYSTEM] GPS locked and verified: ${city} [${lat.toFixed(4)}, ${lon.toFixed(4)}]`);
      } catch (err) {
        console.warn("Reverse geocode failed, using generic name.", err);
        setCurrentCoords({ lat, lon }); setCurrentLocation("Live Zone");
        setLocationMode('auto');
        showToast(`GPS locked, but city name unavailable`, 'warning');
      }
    }, (error) => { showToast('GPS Access Denied. Please check browser permissions.', 'error'); });
  };

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      fetchLiveLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isAdmin]);

  const updateProfilePref = async (key, val) => {
    if (!user) return;
    const isRealFirebaseUser = !!(auth.currentUser && auth.currentUser.uid === user.uid);
    if (!isRealFirebaseUser) return;
    const path = `artifacts/${appId}/users/${user.uid}/profile/data`;
    try {
      await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data'), { [key]: val }, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, path);
    }
  };

  const toggleCheck = async (id) => {
    const newList = checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setChecklist(newList);
    updateProfilePref('checklist', newList);
  };

  const toggleSimulateStorm = () => { const newState = !simulateStorm; setSimulateStorm(newState); setSimulationPreset(newState ? 'critical' : 'none'); setAppPhase('monitoring'); showToast(newState ? 'Level 3 Emergency Simulation Activated' : 'Live API Restored', newState ? 'error' : 'success'); };

  const selectSimulationPreset = (presetId) => {
    setSimulationPreset(presetId);
    if (presetId === 'none') {
      setSimulateStorm(false);
      setAppPhase('monitoring');
      showToast('Live API Restored', 'success');
      addLog(`[SYSTEM] Live real-time physical telemetry reconnected.`);
    } else if (presetId === 'normal') {
      setSimulateStorm(false);
      setAppPhase('monitoring');
      showToast('Nominal Weather Scenario Activated', 'success');
      addLog(`[SYSTEM] PRESET LOADED: Standard Nominal Sunshine context.`);
    } else if (presetId === 'monsoon') {
      setSimulateStorm(false);
      setAppPhase('monitoring');
      showToast('Monsoonal Heavy Rain Warning Activated', 'warning');
      addLog(`[SYSTEM] PRESET LOADED: Moderate Level 2 monsoon warning.`);
    } else if (presetId === 'critical') {
      setSimulateStorm(true);
      setAppPhase('monitoring');
      showToast('Level 3 Critical Storm Activated', 'error');
      addLog(`[SYSTEM] PRESET LOADED: Critical Severe Torrent (Level 3 Evac alert).`);
    } else if (presetId === 'extreme') {
      setSimulateStorm(true);
      setAppPhase('monitoring');
      showToast('Catastrophic Extreme Pulse Alert!', 'error');
      addLog(`[SYSTEM] PRESET LOADED: Maximum Overflow Emergency (Level 3 Extreme Evac).`);
    } else if (presetId === 'recovery') {
      setSimulateStorm(false);
      setAppPhase('recovery');
      showToast('Post-Flood Recovery Operations Active', 'info');
      addLog(`[SYSTEM] PRESET LOADED: Typhoon pass-by. Water receded. Recovery mode initialized.`);
    }
  };

  const toggleSimulateRecovery = () => { const newState = appPhase === 'recovery' ? 'monitoring' : 'recovery'; setAppPhase(newState); setSimulateStorm(false); setSimulationPreset(newState === 'recovery' ? 'recovery' : 'none'); showToast(newState === 'recovery' ? 'Recovery Phase Activated' : 'Monitoring Restored', 'info'); };
  const changeThemeMode = (mode: 'light' | 'dark' | 'auto') => {
    setThemeMode(mode);
    updateProfilePref('themeMode', mode);
    updateProfilePref('isDarkMode', mode === 'dark'); // maintain schema back-compat

    let msg = mode === 'light' ? 'Theme Mode: Light' : mode === 'dark' ? 'Theme Mode: Dark' : 'Theme Mode: Auto';
    if (mode === 'auto') {
      const hour = new Date().getHours();
      const current = (hour >= 7 && hour < 19) ? 'Light' : 'Dark';
      msg = `Theme Mode: Auto (${current})`;
    }
    showToast(msg, 'info');
  };

  const toggleDarkMode = () => {
    let nextMode: 'light' | 'dark' | 'auto' = 'light';
    if (themeMode === 'light') nextMode = 'dark';
    else if (themeMode === 'dark') nextMode = 'auto';
    else if (themeMode === 'auto') nextMode = 'light';
    changeThemeMode(nextMode);
  };
  const changeLanguage = (langId) => { setLanguage(langId); setShowLangModal(false); updateProfilePref('language', langId); showToast(langId === 'en' ? 'English Selected' : langId === 'ms' ? 'Bahasa Melayu Dipilih' : '已选择中文', 'info'); };
  const toggleLanguage = () => { setShowLangModal(true); };
  const toggleNotifications = () => { setNotificationsEnabled(!notificationsEnabled); showToast(!notificationsEnabled ? 'Push Alerts Enabled' : 'Push Alerts Muted', 'info'); };
  const toggleVolunteerMode = () => { setIsVolunteerMode(!isVolunteerMode); showToast(!isVolunteerMode ? 'Volunteer Responder Active' : 'Civilian Mode Active', 'info'); };

  const validatePassword = (pw) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(pw);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (!email.includes('@') || !email.includes('.')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setAuthError('Password must be 8+ chars with a number and special symbol (@$!%*#?&).');
      return;
    }

    setAuthError('');
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      setUser({
        uid: 'local_mock_user',
        displayName: 'Resident',
        email: email,
        isAnonymous: false,
      } as any);
      showToast('Login Successful', 'success');
      addLog(`[AUTH] Resident authenticated securely via email.`);
    }, 1500);
  };

  const verifyAdminAccess = (e) => {
    e.preventDefault();
    if (adminPin === 'FYP2026') {
      setShowAdminPin(false);
      setIsAuthenticating(true);
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsAuthenticated(true);
        setIsAdmin(true);
        setUser({
          uid: 'admin_mock_user',
          displayName: 'Emergency Admin',
          email: 'admin@portal.gov',
          isAnonymous: false,
        } as any);
        showToast('Admin Console Verified', 'success');
        addLog(`[AUTH] RBAC: Administrator level access granted.`);
      }, 1000);
    } else {
      setAuthError('Invalid Admin Override Code.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      showToast('Logged in via Google', 'success');
      addLog('[AUTH] User logged in via Google SSO.');
    } catch (error) {
      showToast('Preview Env: Simulating Login...', 'warning');
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsAuthenticated(true);
        setUser({
          uid: 'google_mock_user',
          displayName: 'Google User',
          email: 'user@gmail.com',
          isAnonymous: false
        } as any);
        showToast('Login Successful', 'success');
        addLog('[AUTH] User logged in via Google SSO (Simulated).');
      }, 1500);
    }
  };

  const handleAppleLogin = async () => {
    setIsAuthenticating(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      showToast('Logged in via Apple', 'success');
      addLog('[AUTH] User logged in via Apple SSO.');
    } catch (error) {
      showToast('Preview Env: Simulating Login...', 'warning');
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsAuthenticated(true);
        setUser({
          uid: 'apple_mock_user',
          displayName: 'Apple User',
          email: 'user@apple.com',
          isAnonymous: false
        } as any);
        showToast('Login Successful', 'success');
        addLog('[AUTH] User logged in via Apple SSO (Simulated).');
      }, 1500);
    }
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
    setShowAdminPin(false);
    setAdminPin('');
    setPassword('');
    setEmail('');
    setAuthError('');
    setActiveTab('home');
    setVisualTab('home');
    currentVisualTabRef.current = 'home';
    setResidentActionPlan('');
    setShowCycloneOverlay(false);
    showToast('Logged out securely', 'info');
    addLog(`[AUTH] Session terminated.`);
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Sign out error:", e);
    }
  };

  const generatePDFAdvisory = (reportText: string) => {
    try {
      addLog(`[SYSTEM] Initiating PDF report compilation...`);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // --- Header banner ---
      doc.setFillColor(10, 132, 255); // Brand blue #0a84ff
      doc.rect(0, 0, 210, 38, 'F');

      // Add a subtle tech line
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 38, 210, 2, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('FLOODCAST CIVIL DEFENSE INTELLIGENCE', 15, 16);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text('OFFICIAL INCIDENT EXECUTIVE SUMMARY & ACTION ADVISORY', 15, 24);
      doc.text('CONSOLIDATED EMERGENCY OPERATIONS CENTER (EOC) LOG', 15, 29);

      // --- Meta Data section ---
      doc.setTextColor(30, 41, 59); // slate-800
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('1. ADMINISTRATIVE METADATA', 15, 52);

      doc.setDrawColor(226, 232, 240); // border slate-200
      doc.line(15, 55, 195, 55);

      doc.setFontSize(8.5);
      // Row 1
      doc.setFont('Helvetica', 'bold');
      doc.text('Report ID:', 15, 63);
      doc.setFont('Helvetica', 'normal');
      doc.text(`FC-EOC-${Math.floor(Date.now() / 100000)}`, 45, 63);

      doc.setFont('Helvetica', 'bold');
      doc.text('Generation Date:', 110, 63);
      doc.setFont('Helvetica', 'normal');
      doc.text(new Date().toLocaleString(), 142, 63);

      // Row 2
      doc.setFont('Helvetica', 'bold');
      doc.text('Focal Sector:', 15, 69);
      doc.setFont('Helvetica', 'normal');
      doc.text(String(currentLocation).toUpperCase(), 45, 69);

      doc.setFont('Helvetica', 'bold');
      doc.text('Security Level:', 110, 69);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(239, 68, 68); // red-500
      doc.text('RESTRICTED // EMERGENCY RESPONSE ONLY', 142, 69);
      doc.setTextColor(30, 41, 59);

      // Row 3
      doc.setFont('Helvetica', 'bold');
      doc.text('System Status:', 15, 75);
      doc.setFont('Helvetica', 'normal');
      doc.text(String(aiStatus).toUpperCase(), 45, 75);

      // --- Telemetry Section ---
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('2. TELEMETRY LOGS & FLUID HYDROMETRICS', 15, 90);
      doc.line(15, 93, 195, 93);

      // Table headers
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(15, 97, 180, 8, 'F');
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('MONITORED METRIC PARAMETER', 18, 102.5);
      doc.text('LIVE TELEMETRY VALUE', 125, 102.5);

      const tableRows = [
        { key: 'Live Hourly Rainfall Intensity', val: `${rainfall} mm/hr` },
        { key: 'Precipitation Prediction (Next 1-Hour Band)', val: `${chartData.f1 || 0} mm/hr` },
        { key: 'Silt Waterways Depth Gauge Reading', val: `${displayRiverLevel} m` },
        { key: 'Active Community SOS Critical Missions', val: `${sosRequests.filter(s => s.status !== 'RESOLVED').length} Active` },
        { key: 'Pneumatic Retaining Sluice Gates', val: isLeveeDamDeployed ? 'DEPLOYED & SECURE' : 'STANDBY' },
        { key: 'EOC Emergency Siren Arrays', val: isSirenActive ? 'BROADCASTING WARNINGS' : 'STANDBY' }
      ];

      let tableY = 111.5;
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      tableRows.forEach((r, idx) => {
        if (idx % 2 === 0) {
          doc.setFillColor(241, 245, 249); // slate-100
          doc.rect(15, tableY - 5.5, 180, 7, 'F');
        }
        doc.setFont('Helvetica', 'bold');
        doc.text(r.key, 18, tableY - 0.5);
        doc.setFont('Helvetica', 'normal');
        doc.text(r.val, 125, tableY - 0.5);
        tableY += 7;
      });

      // --- AI Intelligence advisory summary ---
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('3. EMERGENCY BRIEFING & STRATEGIC RECOMMENDATIONS', 15, 163);
      doc.line(15, 166, 195, 166);

      // Draw a neat grey border-box for the report content
      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240); // slate-200

      const reportTextLines = doc.splitTextToSize(reportText, 172);
      const textBlockHeight = reportTextLines.length * 5 + 8;
      doc.rect(15, 171, 180, textBlockHeight, 'FD');

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59); // slate-800
      doc.text(reportTextLines, 19, 177);

      // --- Signature & Footer ---
      doc.setTextColor(100, 116, 139); // slate-500
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.text('SYSTEM DATA SIGNED & AUTHORIZED', 15, 276);
      doc.setFont('Helvetica', 'bold');
      doc.text('EOC AUTOMATED SUITE (FLOODCAST SYSTEM)', 15, 280);

      // Stamp-like decoration
      doc.setDrawColor(10, 132, 255);
      doc.rect(150, 269, 45, 12);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(10, 132, 255);
      doc.text('SECURE TRANSMISSION', 153.5, 274);
      doc.text('STATUS: VERIFIED', 153.5, 278);

      // Page stamp
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text('Page 1 of 1', 100, 280);

      // Trigger standard save/download
      doc.save(`FloodCast_Executive_Briefing_${Date.now()}.pdf`);
      showToast('Official PDF Advisory Downloaded', 'success');
      addLog(`[SYSTEM] Telemetry and briefing successfully compiled to PDF.`);
    } catch (err) {
      console.error(err);
      showToast('Failed to compile PDF', 'error');
    }
  };

  const generateOfficialReport = async () => {
    setIsGeneratingReport(true); showToast('Compiling Executive Report...', 'info'); addLog(`[SYSTEM] Generating official post-incident MIS report...`);
    const activeSosCount = sosRequests.filter(s => s.status !== 'RESOLVED').length;
    const prompt = `You are the Project FloodCast Early Warning System. Generate a brief, formal post-incident Executive Summary report for local government officials. 
    Current Data: Location: ${currentLocation}, Current Rainfall: ${rainfall}mm/hr, Peak Depth: ${displayRiverLevel}m, Status: ${aiStatus}, Active Rescues: ${activeSosCount}. 
    Format with a title, a short executive summary, and 3 bullet points of recommended actions based on the severity. Do not use markdown like asterisks (*). Keep it highly professional and under 150 words. Do NOT mention 'AI', 'Artificial Intelligence', 'Algorithm', or 'Machine Learning' anywhere in the report.`;

    const reportText = await callSatLinkForecast(prompt);
    setOfficialReport(reportText);
    setIsGeneratingReport(false);
    addLog(`[SYSTEM] Executive Report generated successfully.`);
  };

  const handleGenerateActionPlan = async () => {
    // Stop any playing or preparing voice first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioSourceRef.current) {
      try {
        activeAudioSourceRef.current.stop();
      } catch (e) { }
      activeAudioSourceRef.current = null;
    }
    if (activeAudioCtxRef.current) {
      try {
        activeAudioCtxRef.current.close();
      } catch (e) { }
      activeAudioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
    setIsPreparingVoice(false);

    setIsGeneratingPlan(true); showToast('Consulting Sat-Link Safety Advisor...', 'info'); addLog(`[SYSTEM] Generating contextual safety plan based on live telemetry...`);
    const prompt = `You are a flood safety assistant. The user is in ${currentLocation}. Current status is ${aiStatus}. Rainfall is ${rainfall}mm/hr. Provide a highly concise, bulleted 3-step action plan for them right now. Format as plain text with bullets. Keep it under 50 words total. Do not use markdown like asterisks or hash symbols, just use standard bullet characters (•).`;
    const plan = await callSatLinkForecast(prompt); setResidentActionPlan(plan); setIsGeneratingPlan(false); showToast('Action Plan Ready', 'success');
  };

  const handleQuickQuestion = async (question, contextLabel) => {
    // Stop any playing or preparing voice first
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioSourceRef.current) {
      try {
        activeAudioSourceRef.current.stop();
      } catch (e) { }
      activeAudioSourceRef.current = null;
    }
    if (activeAudioCtxRef.current) {
      try {
        activeAudioCtxRef.current.close();
      } catch (e) { }
      activeAudioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
    setIsPreparingVoice(false);

    setIsGeneratingPlan(true); showToast(`Analyzing: ${contextLabel}...`, 'info');
    addLog(`[SYSTEM] Contextual query analysis triggered: "${question}"`);
    const prompt = `You are an integrated Flood early-warning assistant. Answer this specific query briefly: "${question}". Current location is ${currentLocation} with depth ${displayRiverLevel}m and status ${aiStatus}. Provide 3 concise bullets. Keep total word count under 50. Use standard bullets (•), no asterisks.`;
    const response = await callSatLinkForecast(prompt);
    setResidentActionPlan(response);
    setIsGeneratingPlan(false);
    showToast('Plan customized', 'success');
  };

  const handleBroadcast = async () => {
    if (!user && !isAdmin) return;
    if (!broadcastMessage) { showToast("Please draft a message first", "error"); return; }
    setIsBroadcasting(true); addLog(`[NETWORK] Pushing Global Cloud Broadcast to ${broadcastZone}`);
    const path = `artifacts/${appId}/public/data/broadcast_alerts`;
    const authorId = user?.uid || 'admin_mock_user';
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'broadcast_alerts'), { zone: broadcastZone, type: broadcastType, message: broadcastMessage, timestamp: serverTimestamp(), status: 'CRITICAL', admin_id: authorId });
      addLog(`[NETWORK] Broadcast synchronized to connected clients via FCM.`); setBroadcastMessage(''); showToast('Emergency Broadcast Sent!', 'success'); setTimeout(() => setIsBroadcasting(false), 1000);
    } catch (error) {
      setIsBroadcasting(false);
      handleFirestoreError(error, OperationType.WRITE, path);
      // Local fallback in case of write failure
      const fallbackAlert = {
        id: `alert-local-${Date.now()}`,
        zone: broadcastZone,
        type: broadcastType,
        message: broadcastMessage,
        timestamp: { toMillis: () => Date.now() },
        status: 'CRITICAL',
        admin_id: authorId
      };
      setGlobalAlerts(prev => [fallbackAlert, ...prev]);
      setBroadcastMessage('');
      showToast('Emergency Broadcast Sent (Offline Fallback Mode)!', 'success');
      addLog(`[OFFLINE FALLBACK] Saved broadcast locally.`);
    }
  };

  const handleToggleUpvote = async (postId) => {
    let newIds;
    const isUpvoted = upvotedPostIds.includes(postId);
    if (isUpvoted) {
      newIds = upvotedPostIds.filter(id => id !== postId);
    } else {
      newIds = [...upvotedPostIds, postId];
    }
    setUpvotedPostIds(newIds);
    localStorage.setItem('upvotedPostIds', JSON.stringify(newIds));
    showToast(isUpvoted ? "Removed upvote" : "Post upvoted!", "success");

    // Persist upvote back to Firestore natively if connection exists!
    if (db && user) {
      try {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'community_posts', postId);
        await updateDoc(docRef, {
          upvotes: increment(isUpvoted ? -1 : 1)
        });
      } catch (err) {
        console.warn("Could not synchronize upvote count to Firestore:", err);
      }
    }
  };

  const handleCommunityImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostCommunity = async (targetId?: string) => {
    if (!newPostText.trim() && !newPostImage) return;
    const authorUid = user?.uid || 'guest_resident';
    const authorNameLabel = profileName || 'Resident';
    const finalCommunityId = targetId || selectedCommunityId || composerCommunityId || 'river-rescue';

    // Create optimistic local post
    const localPost = {
      id: 'local-post-' + Date.now(),
      text: newPostText,
      image: newPostImage || null,
      authorId: authorUid,
      authorName: authorNameLabel,
      timestamp: {
        toMillis: () => Date.now(),
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      } as any,
      zone: currentLocation,
      communityId: finalCommunityId
    };

    // Optimistically update list
    setCommunityPosts(prev => [localPost, ...prev] as any);
    setNewPostText('');
    setNewPostImage(null);
    showToast('Posted to Community Channel', 'success');

    if (user && db) {
      const path = `artifacts/${appId}/public/data/community_posts`;
      try {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'community_posts'), {
          text: localPost.text,
          image: localPost.image,
          authorId: authorUid,
          authorName: authorNameLabel,
          timestamp: serverTimestamp(),
          zone: currentLocation,
          communityId: finalCommunityId
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, path);
      }
    }
  };

  const handleDeletePost = (postId: string) => {
    const post = [...communityPosts, ...SEED_POSTS].find((p: any) => p.id === postId);
    if (!post) return;

    const isAuthor = post.authorId === (user ? user.uid : 'guest_resident');
    if (!isAuthor && !isAdmin) {
      showToast('You can only delete your own posts', 'error');
      return;
    }

    setPostToDelete(postId);
  };

  const confirmDeletePost = async (postId: string) => {
    const newDeletedIds = [...deletedPostIds, postId];
    setDeletedPostIds(newDeletedIds);
    localStorage.setItem('deletedPostIds', JSON.stringify(newDeletedIds));
    setCommunityPosts(prev => prev.filter((p: any) => p.id !== postId));

    if (!postId.startsWith('seed-') && !postId.startsWith('local-post-') && db && user) {
      try {
        const postDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'community_posts', postId);
        await deleteDoc(postDocRef);
        showToast('Post deleted permanently from database', 'success');
      } catch (err) {
        console.warn("Could not delete post directly from Firestore:", err);
      }
    } else {
      showToast('Post removed successfully', 'success');
    }
  };

  const handleCommunityCheckin = (status: 'safe' | 'evac' | 'sos', communityId: string) => {
    const prevStatus = userCheckinStates[communityId];
    if (prevStatus === status) {
      showToast(`You have already checked in as ${status.toUpperCase()} here.`, 'info');
      return;
    }

    // Calculate stats update
    setCommunityCheckinStats((prev: any) => {
      const currentStats = { ...(prev[communityId] || { safe: 100, evac: 50, sos: 0 }) };
      if (prevStatus) {
        currentStats[prevStatus] = Math.max(0, currentStats[prevStatus] - 1);
      }
      currentStats[status] = (currentStats[status] || 0) + 1;
      return {
        ...prev,
        [communityId]: currentStats
      };
    });

    setUserCheckinStates((prev: any) => ({
      ...prev,
      [communityId]: status
    }));

    if (status === 'sos') {
      showToast("EMERGENCY: SOS Trapped status logged. Nearby boat patrols and neighbors alerted!", "error");
    } else if (status === 'evac') {
      showToast("Evacuation logged. Safe shelter transit channels highlighted on your radar.", "warning");
    } else {
      showToast("Status: SAFE logged in community directory. Thank you for updating your neighbors.", "success");
    }
  };

  const handleAddAidLedgerItem = (communityId: string) => {
    if (!newAidItem.trim() || !newAidLoc.trim()) {
      showToast("Please provide supply description and location coordinates.", "error");
      return;
    }

    const newItem = {
      id: `aid-user-${Date.now()}`,
      communityId: communityId,
      type: newAidType,
      item: newAidItem,
      description: newAidDesc || "No additional description provided.",
      location: newAidLoc,
      author: profileName || "Active Resident",
      timestamp: new Date(),
      status: "open"
    };

    setMutualAidLedger(prev => [newItem, ...prev]);
    setNewAidItem('');
    setNewAidDesc('');
    setNewAidLoc('');
    showToast(`Successfully published ${newAidType === 'request' ? 'Request' : 'Offer'} to the Local Flood Ledger!`, 'success');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      showToast("Analyzing hazard telemetry...", "info");
      setIsAnalyzingImage(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];

        let retries = 3;
        let delay = 1000;
        let success = false;

        for (let i = 0; i < retries; i++) {
          try {
            const serverRes = await fetch("/api/satlink/vision", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: base64, mimeType: file.type })
            });

            if (serverRes.ok) {
              const serverData = await serverRes.json();
              if (serverData.text) {
                const parsed = JSON.parse(serverData.text);
                setHazardForm({
                  type: parsed.type || 'Flooded Road',
                  severity: parsed.severity || 'Medium',
                  description: parsed.description || 'Hazard detected automatically.'
                });
                showToast("Hazard Classification Complete", "success");
                success = true;
                break;
              }
            } else {
              const errorText = await serverRes.text();
              console.warn(`Server Vision API attempt ${i + 1} failed: ${serverRes.status} - ${errorText}`);
            }
          } catch (serverErr) {
            console.warn(`Server Vision API attempt ${i + 1} experienced connectivity error:`, serverErr);
          }

          if (i < retries - 1) {
            await new Promise(r => setTimeout(r, delay));
            delay *= 2;
          }
        }

        if (!success) {
          showToast("Automated Vision Analysis Failed. Proceed manually.", "error");
        }
        setIsAnalyzingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReportHazard = async () => {
    showToast('Submitting Hazard Report...', 'info');
    const reporterUid = user?.uid || 'guest_resident';

    // Create optimistic local hazard
    const newHazard = {
      id: 'local-hazard-' + Date.now(),
      zone: currentLocation,
      type: hazardForm.type,
      severity: hazardForm.severity,
      description: hazardForm.description,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      timestamp: {
        toMillis: () => Date.now(),
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      } as any,
      reporter_id: reporterUid
    };

    // Optimistically update state so user can immediately exit/see the result on map
    setGlobalHazards(prev => [...prev, newHazard]);
    setShowHazardModal(false);
    setHazardForm({ type: 'Flooded Road', severity: 'Medium', description: '' });
    showToast('Hazard Broadcasted to Community!', 'success');
    addLog(`[USER] Hazard reported at ${currentLocation}`);

    if (user && db) {
      const path = `artifacts/${appId}/public/data/hazards`;
      addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'hazards'), {
        zone: currentLocation,
        type: hazardForm.type,
        severity: hazardForm.severity,
        description: hazardForm.description,
        x: newHazard.x,
        y: newHazard.y,
        timestamp: serverTimestamp(),
        reporter_id: reporterUid
      }).catch(err => {
        handleFirestoreError(err, OperationType.WRITE, path);
      });
    }
  };

  const triggerSos = async () => {
    showToast(t.sosSent, 'error');
    const requesterUid = user?.uid || 'guest_resident';

    // Create optimistic local SOS request
    const newSos = {
      id: 'local-sos-' + Date.now(),
      zone: currentLocation,
      lat: currentCoords.lat,
      lon: currentCoords.lon,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      status: 'PENDING',
      userId: requesterUid,
      timestamp: {
        toMillis: () => Date.now(),
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0
      } as any
    };

    setSosRequests(prev => [newSos, ...prev]);
    setMyActiveSos(newSos);
    addLog(`[NETWORK] S.O.S beacon transmitted. Awaiting response.`);

    if (user && db) {
      const path = `artifacts/${appId}/public/data/sos_requests`;
      addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'sos_requests'), {
        zone: currentLocation,
        lat: currentCoords.lat,
        lon: currentCoords.lon,
        x: newSos.x,
        y: newSos.y,
        status: 'PENDING',
        userId: requesterUid,
        timestamp: serverTimestamp()
      }).catch(err => {
        handleFirestoreError(err, OperationType.WRITE, path);
      });
    }
  };

  const handleCancelMySos = async () => {
    if (!myActiveSos) return;
    const targetId = myActiveSos.id;
    const currentUserUid = user?.uid || 'guest_resident';

    // Deactivate/cancel S.O.S locally and instantly
    setSosRequests(prev => prev.map(s => {
      const isMyReq = (s.userId === currentUserUid || s.userId === 'local_mock_user' || s.userId === 'guest_resident');
      return isMyReq ? { ...s, status: 'RESOLVED' } : s;
    }));
    setMyActiveSos(null);
    showToast('S.O.S Broadcast deactivated.', 'success');
    addLog(`[USER] S.O.S Broadcast deactivated.`);

    if (user && db) {
      // Find all active requests belonging to this user or generic mock accounts
      const userActiveRequests = sosRequests.filter(s =>
        (s.userId === currentUserUid || s.userId === 'local_mock_user' || s.userId === 'guest_resident') &&
        ['PENDING', 'ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status)
      );

      for (const req of userActiveRequests) {
        if (!req.id.startsWith('local-')) {
          const path = `artifacts/${appId}/public/data/sos_requests/${req.id}`;
          updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', req.id), {
            status: 'RESOLVED',
            resolvedAt: serverTimestamp()
          }).catch(err => {
            handleFirestoreError(err, OperationType.WRITE, path);
          });
        }
      }
    }
  };

  const handleDispatchRescue = async (sosId) => {
    // Optimistically update locally so the user gets instant visual response
    setSosRequests(prev => prev.map(s => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'DISPATCHED',
          dispatchedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
        };
      }
      return s;
    }));

    setMyActiveSos(prev => {
      if (prev && prev.id === sosId) {
        return {
          ...prev,
          status: 'DISPATCHED',
          dispatchedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
        };
      }
      return prev;
    });

    showToast('Rescue team dispatched!', 'success');
    addLog(`[ADMIN] Rescue asset deployed to S.O.S target.`);

    if (db) {
      const path = `artifacts/${appId}/public/data/sos_requests/${sosId}`;
      try {
        await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', sosId), { status: 'DISPATCHED', dispatchedAt: serverTimestamp() });
      } catch (err) {
        console.warn("Firestore error in handleDispatchRescue, using local optimistic state:", err);
      }
    }
  };

  const handleAcceptRescue = async (sosId) => {
    const volunteerId = user ? user.uid : 'guest_volunteer';

    // Set immediate loading/accepting state
    setAcceptingId(sosId);

    // Optimistically update locally so the user gets instant visual response
    setSosRequests(prev => prev.map(s => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'ACCEPTED',
          volunteerId: volunteerId,
          acceptedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
        };
      }
      return s;
    }));

    // Optimistically update myActiveSos
    const acceptedRequest = (sosRequests as any[]).find(s => s.id === sosId);
    if (acceptedRequest) {
      setMyActiveSos({
        ...acceptedRequest,
        status: 'ACCEPTED',
        volunteerId: volunteerId,
        acceptedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any
      });
    }

    showToast('Mission Accepted! Route calculated.', 'success');
    addLog(`[VOLUNTEER] Citizen responder accepted SOS mission.`);

    // If Firestore database is connected, try to update it as well asynchronously to not block UI
    if (db) {
      const path = `artifacts/${appId}/public/data/sos_requests/${sosId}`;
      updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', sosId), {
        status: 'ACCEPTED',
        volunteerId: volunteerId,
        acceptedAt: serverTimestamp()
      }).catch(err => {
        console.warn("Firestore error in handleAcceptRescue, using local optimistic state:", err);
      });
    }

    // Clear accepting state after a small simulated response delay (e.g. 500ms) to let the "Waiting..." text be visible
    setTimeout(() => {
      setAcceptingId(null);
    }, 500);
  };

  const handleUpdateMissionStatus = async (status) => {
    if (!myActiveSos) return;

    // Optimistic state update
    setSosRequests(prev => prev.map(s => {
      if (s.id === (myActiveSos as any).id) {
        return { ...s, status: status, updatedAt: { toMillis: () => Date.now(), seconds: Math.floor(Date.now() / 1000) } as any };
      }
      return s;
    }));

    setMyActiveSos(prev => prev ? { ...prev, status: status } : null);
    showToast(`Mission Status: ${status.replace('_', ' ')}`, 'success');
    addLog(`[VOLUNTEER] Mission status updated to ${status.replace('_', ' ')}.`);

    if (db) {
      const path = `artifacts/${appId}/public/data/sos_requests/${(myActiveSos as any).id}`;
      updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'sos_requests', (myActiveSos as any).id), {
        status: status,
        updatedAt: serverTimestamp()
      }).catch(err => {
        console.warn("Firestore error in handleUpdateMissionStatus, using local optimistic state:", err);
      });
    }
  };

  const toggleShelterCapacity = async (shelterId, currentIsFull) => {
    const path = `artifacts/${appId}/public/data/shelters/${shelterId}`;
    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'shelters', shelterId), { isFull: !currentIsFull }, { merge: true });
      showToast(`Shelter marked as ${!currentIsFull ? 'FULL' : 'OPEN'}`, 'success'); addLog(`[ADMIN] Shelter capacity status overridden for ${shelterId}.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const getShelterOccupancy = (shelter) => {
    const statusObj = shelterStatus[shelter.id];
    const maxCap = statusObj?.maxCapacity !== undefined ? statusObj.maxCapacity : shelter.maxCapacity;
    const dummyPcts = { kotadamansara: 28, rawang: 88, shahalam: 25, klang: 65, huluselangor: 15, gombak: 95 };
    let pct = dummyPcts[shelter.id] || 40;
    let cap = Math.floor((pct / 100) * maxCap);

    if (statusObj?.isFull) {
      pct = 100; cap = maxCap;
    } else if (statusObj?.capacity !== undefined) {
      cap = statusObj.capacity;
      pct = (cap / maxCap) * 100;
    }

    if (pct >= 100) return { label: 'FULL', color: '#BA1A1A', cap, pct };
    if (pct >= 80) return { label: 'HIGH', color: '#FF453A', cap, pct };
    if (pct >= 50) return { label: 'AVG', color: '#FF9F0A', cap, pct };
    return { label: 'LOW', color: '#32D74B', cap, pct };
  };

  const getActiveShelter = (): any => {
    if (interactiveMapShelterId) {
      const selected = baseShelters.find(s => s.id === interactiveMapShelterId);
      if (selected) {
        const occ = getShelterOccupancy(selected);
        return { ...selected, isFull: occ.pct >= 100, currentCapacity: occ.cap, occupancyLabel: occ.label, occColor: occ.color, isFallback: false, originalName: selected.name };
      }
    }

    const primaryShelter = baseShelters.find(s => s.zone === currentLocation) || baseShelters[0];
    const primaryOcc = getShelterOccupancy(primaryShelter);

    if (primaryOcc.pct < 80) {
      return { ...primaryShelter, isFull: false, currentCapacity: primaryOcc.cap, occupancyLabel: primaryOcc.label, occColor: primaryOcc.color, isFallback: false, originalName: primaryShelter.name };
    }

    const availableShelters = baseShelters
      .map(s => ({ ...s, occ: getShelterOccupancy(s) }))
      .filter(s => s.occ.pct < 80)
      .sort((a, b) => a.occ.pct - b.occ.pct);

    const fallbackShelter: any = availableShelters.length > 0 ? availableShelters[0] : { ...primaryShelter, occ: primaryOcc };

    return {
      ...fallbackShelter,
      isFull: fallbackShelter.occ.pct >= 100,
      currentCapacity: fallbackShelter.occ.cap,
      occupancyLabel: fallbackShelter.occ.label,
      occColor: fallbackShelter.occ.color,
      isFallback: fallbackShelter.id !== primaryShelter.id,
      originalName: primaryShelter.name
    };
  };
  const activeShelter = getActiveShelter();

  const getTravelTime = (shelter: any, mode: string) => {
    if (!shelter) return '';
    if (mode === 'walk') {
      const distNum = parseFloat(shelter.distance);
      const walkMins = Math.round(distNum * 12);
      if (walkMins >= 60) {
        const hrs = Math.floor(walkMins / 60);
        const mins = walkMins % 60;
        return `${hrs} hr${hrs > 1 ? 's' : ''}${mins > 0 ? ` ${mins} m` : ''}`;
      }
      return `${walkMins} mins`;
    }
    return shelter.time.replace('Est. ', '').replace(' drive', '');
  };

  useEffect(() => {
    if (!isAuthenticated || isAdmin) return;
    if (activeShelter.isFallback && previousAlertsCount.current > -1) {
      if (!toast) {
        showPushNotification({ type: 'Routing Update', message: `${activeShelter.originalName} is full. Redirecting to ${activeShelter.name}.` });
        previousAlertsCount.current = -1;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeShelter.isFallback, activeShelter.id]);

  const handleStartNavigation = () => {
    const origin = `${currentLocation}, Malaysia`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(activeShelter.address)}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const systemRed = isDarkMode ? '#FF453A' : '#FF3B30';
  const systemAmber = isDarkMode ? '#FF9F0A' : '#FF9500';
  const systemGreen = isDarkMode ? '#30D158' : '#34C759';

  const visibleAlerts = useMemo(() => {
    return globalAlerts.filter(alert => !dismissedAlertIds.includes(alert.id));
  }, [globalAlerts, dismissedAlertIds]);

  const handleDismissAlert = (id: string) => {
    setDismissedAlertIds(prev => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    showToast('Alert dismissed from view', 'info');
  };

  const activeAlertCount = visibleAlerts.length;
  const activeMissions = sosRequests.filter(s =>
    s.volunteerId === (user?.uid || 'guest_volunteer') &&
    ['ACCEPTED', 'EN_ROUTE', 'ARRIVED'].includes(s.status)
  );

  const soundBeep = () => {
    playRadarScanSound();
  };

  const glassCardClass = isDarkMode
    ? 'bg-gradient-to-br from-white/10 to-white/5 border-t border-l border-white/20 border-r border-b border-white/5 shadow-2xl backdrop-blur-3xl backdrop-saturate-[1.8]'
    : 'bg-gradient-to-br from-white/80 to-white/40 border-t border-l border-white/60 border-r border-b border-black/5 shadow-xl backdrop-blur-3xl';

  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  const adminBg = isDarkMode ? 'bg-[#050505]' : 'bg-[#f8f9fa]';
  const adminSidebarBg = isDarkMode ? 'bg-[#0A0A0A]/80' : 'bg-white/80';
  const adminCardBg = isDarkMode ? 'bg-[#111]/80' : 'bg-white/80';
  const adminBorder = isDarkMode ? 'border-white/10' : 'border-black/5';

  const WeatherBackground = ({ isRaining, isDarkMode, aiStatus }) => {
    const canvasRef = useRef(null);
    const [lightningFlash, setLightningFlash] = useState(false);

    // Subtle Sheet Lightning effect loop
    useEffect(() => {
      if (!isRaining) return;

      const triggerLightning = () => {
        setLightningFlash(true);
        setTimeout(() => {
          setLightningFlash(false);
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setLightningFlash(true);
              setTimeout(() => {
                setLightningFlash(false);
              }, 100);
            }, 80);
          }
        }, 120);
      };

      const interval = setInterval(() => {
        if (Math.random() > 0.45) {
          triggerLightning();
        }
      }, 10000);

      return () => clearInterval(interval);
    }, [isRaining]);

    // Canvas Rain rendering loop
    useEffect(() => {
      if (!isRaining) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      // Premium, refined drop structure
      const drops = [];
      const MAX_DROPS = 120; // Crisp and elegant, avoids heavy slop cluttering the text
      let wind = -1.2;
      let targetWind = -1.2;

      for (let i = 0; i < MAX_DROPS; i++) {
        drops.push({
          x: Math.random() * canvas.width * 1.5 - canvas.width * 0.25,
          y: Math.random() * -canvas.height,
          z: Math.random() * 0.7 + 0.3, // Depth scale factor
          vy: Math.random() * 10 + 20,  // Realistic fast rain terminal velocity
          len: Math.random() * 30 + 15  // Sleek trace streams
        });
      }

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Slowly update wind leaning for atmospheric fluidity
        wind += (targetWind - wind) * 0.01;
        if (Math.random() < 0.015) targetWind = (Math.random() - 0.5) * 3 - 0.5;

        ctx.lineCap = 'round';
        for (let i = 0; i < drops.length; i++) {
          let d = drops[i];

          d.x += wind * d.z;
          d.y += d.vy * d.z;

          // Recycle drop structure at boundary bottom
          if (d.y > canvas.height + 25) {
            d.y = Math.random() * -45 - 10;
            d.x = Math.random() * canvas.width * 1.5 - canvas.width * 0.25;
          }

          const tailX = d.x - wind * (d.len / d.vy);
          const tailY = d.y - d.len;

          // Highly refined cinematic semi-transparent linear gradients
          const grad = ctx.createLinearGradient(tailX, tailY, d.x, d.y);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          const baseOpacity = isDarkMode ? 0.22 : 0.42;
          grad.addColorStop(1, `rgba(255,255,255, ${d.z * baseOpacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(d.x, d.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = d.z * 1.2 + 0.4; // Exquisite thin streams
          ctx.stroke();
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }, [isRaining, isDarkMode]);

    // Adaptive ambient background colors (with lightning double flashes in real time!)
    const getStormBg = () => {
      if (lightningFlash) {
        return isDarkMode
          ? 'from-[#3a3a46] via-[#1c1c2d] to-[#04040a]'
          : 'from-[#b0c4de] via-[#dcdcdc] to-[#f5f5f7]';
      }
      return isDarkMode
        ? 'from-[#141416] via-[#09090b] to-[#020203]'
        : 'from-[#8ba3b5] via-[#aec6cf] to-[#e6ecf0]';
    };

    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {isRaining ? (
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-700 pointer-events-none ${getStormBg()}`}>
            {/* Elegant Atmospheric Overlay Shrouds */}
            <div className={`absolute inset-0 bg-[#FF453A]/3 blur-[120px] transition-all duration-1000 pointer-events-none ${aiStatus === t.critical ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute inset-0 bg-[#FF9F0A]/2 blur-[100px] transition-all duration-1000 pointer-events-none ${aiStatus === t.warning ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Unified Ambient Rain Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'screen', opacity: isDarkMode ? 0.85 : 0.65 }} />
          </div>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-1000 ${isDarkMode ? 'from-[#050505] to-[#000]' : 'from-[#38bdf8] to-[#bae6fd]'}`}>
            {isDarkMode ? (
              <div className="absolute top-[15%] right-[15%] w-[80px] h-[80px] bg-indigo-200/10 blur-[20px] rounded-full"></div>
            ) : (
              <>
                <div className="absolute top-[-5%] right-[-5%] w-[300px] h-[300px] bg-yellow-300/30 blur-[80px] rounded-full animate-[pulseGlow_6s_ease-in-out_infinite]/30 pointer-events-none"></div>
                <div className="absolute top-[8%] right-[12%] w-[80px] h-[80px] bg-gradient-to-tr from-white via-yellow-200 to-orange-400 rounded-full shadow-[0_0_50px_rgba(253,224,71,0.6)]">
                  <div className="absolute inset-0 bg-white rounded-full blur-[4px] opacity-40"></div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const PushNotificationOverlay = () => {
    if (!activePushNotification) return null;
    return (
      <div className={`absolute top-16 left-4 right-4 z-[999] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#2C2C2E]/95 border-white/10' : 'bg-white/95 border-black/5'} backdrop-blur-2xl animate-[fadeInDown_0.5s_ease-out]`}>
        <div className="p-4 flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] flex flex-shrink-0 items-center justify-center shadow-md">
            <Waves size={24} className="text-white" />
          </div>
          <div className="flex-1 min-w-0 pt-0.5 font-sans">
            <div className="flex justify-between items-center mb-0.5">
              {/* Refactored typography to remove tight tracking on micro text size */}
              <span className={`font-bold text-xs ${textPrimary} tracking-wide`}>FloodCast Broadcast</span>
              <span className={`text-xs font-medium ${textSecondary}`}>now</span>
            </div>
            <p className={`font-medium text-sm ${textPrimary} mb-0.5 truncate`}>{activePushNotification.type}</p>
            <p className={`text-sm ${textSecondary} leading-snug line-clamp-2`}>{activePushNotification.message}</p>
          </div>
        </div>
      </div>
    );
  };

  const ToastOverlay = () => {
    if (!toast) return null;
    return (
      <div className={`absolute top-20 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 transition-all animate-[fadeInDown_0.4s_ease-out] backdrop-blur-3xl border
        ${toast.type === 'warning' ? 'bg-[#FF9F0A] text-white border-[#FF9F0A]' :
          toast.type === 'error' ? 'bg-[#FF453A] text-white border-[#FF453A]' :
            toast.type === 'info' ? 'bg-[#0A84FF] text-white border-[#0A84FF]' : 'bg-[#32D74B] text-black border-[#32D74B]'}`}>
        {toast.type === 'success' && <CheckCircle size={20} />}
        {toast.type === 'warning' && <AlertTriangle size={20} />}
        {toast.type === 'error' && <AlertTriangle size={20} />}
        {toast.type === 'info' && <Info size={20} />}
        {/* Refactored typography to remove custom text-[14px] styling */}
        <span className="font-bold text-sm whitespace-nowrap">{toast.message}</span>
      </div>
    );
  };

  const LanguageModalOverlay = () => {
    if (!showLangModal) return null;
    return (
      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`}>
        <div className={`relative w-full max-w-[320px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`}>
          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 relative">
            {/* Refactored hierarchy to standard text-lg instead of text-[18px] */}
            <span className={`font-bold ${textPrimary} text-lg`}>Choose language</span>
            <button onClick={() => setShowLangModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={20} strokeWidth={2} />
            </button>
          </div>
          <div className="p-2 flex flex-col">
            <div className="w-full">
              {[
                { id: 'en', label: 'English' },
                { id: 'ms', label: 'Bahasa Malaysia' },
                { id: 'cn', label: 'Chinese (CN)' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => changeLanguage(lang.id)}
                  className={`w-full p-4 flex items-center space-x-4 transition-all active:bg-black/5 dark:active:bg-white/5 rounded-xl`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${language === lang.id ? 'border-[#0A84FF]' : 'border-gray-400 dark:border-gray-500'}`}>
                    {language === lang.id && <div className="w-2.5 h-2.5 rounded-full bg-[#0A84FF]" />}
                  </div>
                  {/* Refactored typography to use text-base rather than custom bracket sizing */}
                  <span className={`font-medium text-base ${textPrimary}`}>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HazardModalOverlay = () => {
    if (!showHazardModal) return null;
    return (
      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`} onClick={() => setShowHazardModal(false)}>
        <div className={`relative w-full max-w-[360px] rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 relative">
            <div className="flex items-center space-x-2">
              <AlertOctagon size={20} className="text-[#FF9F0A]" />
              {/* Standardized to text-lg instead of text-[18px] */}
              <span className={`font-bold ${textPrimary} text-lg`}>Report Hazard</span>
            </div>
            <button onClick={() => setShowHazardModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className={`p-4 rounded-[32px] border border-dashed ${isDarkMode ? 'bg-black/30 border-gray-600' : 'bg-gray-50 border-gray-300'} flex flex-col items-center justify-center relative`}>
              {isAnalyzingImage ? (
                <div className="flex flex-col items-center py-2">
                  <Loader2 size={24} className="animate-spin text-[#0A84FF] mb-2" />
                  {/* Standardized size to text-xs */}
                  <span className={`text-xs font-bold ${textSecondary}`}>Analyzing telemetry...</span>
                </div>
              ) : (
                <>
                  <Camera size={28} className={`${textSecondary} mb-2`} />
                  {/* Standardized size to text-sm */}
                  <span className={`text-sm font-bold ${textPrimary} mb-1`}>Automated Hazard Detection</span>
                  {/* Standardized size to text-xs */}
                  <span className={`text-xs font-medium text-center ${textSecondary}`}>Upload an image for automatic classification.</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </>
              )}
            </div>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest ${textSecondary} mb-2`}>Hazard Type</label>
              {/* Standardized select font size to text-sm */}
              <div className="relative">
                <select
                  value={hazardForm.type}
                  onChange={(e) => setHazardForm({ ...hazardForm, type: e.target.value })}
                  className={`w-full p-3.5 pr-10 rounded-xl border appearance-none outline-none font-medium text-sm transition-all duration-300 ${isDarkMode ? 'bg-[#2C2C2E] border-white/10 text-white' : 'bg-gray-50 border-black/10 text-black'
                    }`}
                >
                  <option value="Flooded Road">Flooded Road</option>
                  <option value="Landslide">Landslide / Sinkhole</option>
                  <option value="Fallen Tree">Fallen Tree / Debris</option>
                </select>
                <ChevronDown size={16} className={`absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60 ${textPrimary}`} strokeWidth={2.5} />
              </div>
            </div>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest ${textSecondary} mb-2`}>Severity</label>
              <div className="flex space-x-2">
                {/* Standardized buttons font size to text-xs tracking-normal instead of text-[13px] */}
                {['Low', 'Medium', 'High'].map(sev => (
                  <button key={sev} onClick={() => setHazardForm({ ...hazardForm, severity: sev })} className={`flex-1 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all border ${hazardForm.severity === sev ? (sev === 'High' ? 'bg-[#FF453A] text-white border-[#FF453A]' : sev === 'Medium' ? 'bg-[#FF9F0A] text-white border-[#FF9F0A]' : 'bg-[#32D74B] text-black border-[#32D74B]') : (isDarkMode ? 'bg-transparent border-white/20 text-gray-400' : 'bg-transparent border-black/10 text-gray-500')}`}>
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest ${textSecondary} mb-2`}>Description (Optional)</label>
              {/* Standardized input size to text-sm */}
              <textarea value={hazardForm.description} onChange={(e) => setHazardForm({ ...hazardForm, description: e.target.value })} placeholder="Additional details..." className={`w-full p-3.5 rounded-xl border resize-none outline-none font-medium text-sm ${isDarkMode ? 'bg-[#2C2C2E] border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-black/10 text-black placeholder-gray-400'}`} rows={2} />
            </div>

            <div className="flex space-x-3 pt-2">
              {/* Standardized font to text-sm uppercase tracking-wider */}
              <button onClick={() => setShowHazardModal(false)} className={`flex-1 py-3.5 rounded-full font-black text-sm uppercase tracking-wider transition-transform active:scale-95 ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}>
                Cancel
              </button>
              <button onClick={handleReportHazard} className="flex-[2] py-3.5 rounded-full bg-[#FF9F0A] hover:bg-[#ffb340] text-white font-black text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-transform flex items-center justify-center space-x-2">
                <AlertOctagon size={18} />
                <span>Broadcast</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const JkmModalOverlay = () => {
    if (!showJkmModal) return null;

    const officialShelterDetails: Record<string, { jkmId: string; officer: string; phone: string; supplies: string[] }> = {
      kotadamansara: {
        jkmId: 'JKM-SLG-KD-101',
        officer: 'Encik Khairul (JKM Petaling Jaya)',
        phone: '+60 3-7954 1122',
        supplies: ['Food packs (100%)', 'Sleeping mats (100%)', 'Medical Kits', 'Generators']
      },
      rawang: {
        jkmId: 'JKM-SLG-RAW-102',
        officer: 'Tuan Mohd Syamil (JKM Gombak)',
        phone: '+60 3-6091 1042',
        supplies: ['Food packs (100%)', 'Sleeping mats (90%)', 'Medical Standby']
      },
      shahalam: {
        jkmId: 'JKM-SLG-SA-204',
        officer: 'Puan Shuhada (JKM Petaling)',
        phone: '+60 3-7842 1205',
        supplies: ['Food packs (100%)', 'Sleeping mats (100%)', 'Infant nutrition']
      },
      klang: {
        jkmId: 'JKM-SLG-KLG-508',
        officer: 'Encik Zulhelmi (JKM Klang)',
        phone: '+60 3-3371 4402',
        supplies: ['Food packs (95%)', 'Sleeping mats (80%)', 'Generator active']
      },
      huluselangor: {
        jkmId: 'JKM-SLG-HS-094',
        officer: 'Tuan Amiruddin (JKM Hulu Selangor)',
        phone: '+60 3-6064 1211',
        supplies: ['Food packs (100%)', 'Sleeping mats (100%)', 'Pet-friendly facilities']
      },
      gombak: {
        jkmId: 'JKM-SLG-GBK-115',
        officer: 'Puan Noorul Huda (JKM Gombak)',
        phone: '+60 3-6189 7701',
        supplies: ['Food packs (90%)', 'Sleeping mats (95%)', 'Hygiene units standby']
      }
    };

    const handleJkmSync = () => {
      setIsJkmSyncing(true);
      setJkmSyncSteps([]);

      const stepsList = [
        "Connecting to InfoBencana JKM Central Registry...",
        "Downloading Selangor regional telemetry payload...",
        "Analyzing active evacuees and shelter capacity...",
        "Registry synchronized successfully."
      ];

      stepsList.forEach((step, idx) => {
        setTimeout(() => {
          setJkmSyncSteps(prev => [...prev, step]);
          if (idx === stepsList.length - 1) {
            setIsJkmSyncing(false);
            showToast("InfoBencana JKM database is fully synced!", "success");
          }
        }, (idx + 1) * 850);
      });
    };

    // Auto-run sync on mount if not yet run
    useEffect(() => {
      if (jkmSyncSteps.length === 0 && !isJkmSyncing) {
        handleJkmSync();
      }
    }, []);

    const filteredShelters = baseShelters.filter(s =>
      s.name.toLowerCase().includes(jkmSearchQuery.toLowerCase()) ||
      s.zone.toLowerCase().includes(jkmSearchQuery.toLowerCase())
    );

    return (
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4 font-sans" onClick={() => setShowJkmModal(false)}>
        <div className={`relative w-full max-w-[380px] h-[640px] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-black'}`} onClick={e => e.stopPropagation()}>

          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-[#0A84FF] text-white shrink-0">
                <Database size={16} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-sm tracking-tight">JKM InfoBencana Portal</h3>
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">Safe Connection Established</span>
              </div>
            </div>
            <button onClick={() => setShowJkmModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className={`p-4 mx-4 mt-4 rounded-2xl border flex flex-col justify-between shrink-0 ${isDarkMode ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full block ${isJkmSyncing ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className={`text-[9px] font-black uppercase tracking-wider ${textSecondary}`}>Registry Status</span>
              </div>
              <button
                onClick={handleJkmSync}
                disabled={isJkmSyncing}
                className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider transition-all border 
                  ${isJkmSyncing
                    ? 'opacity-55 cursor-not-allowed bg-transparent border-gray-500/10'
                    : 'bg-[#0A84FF] hover:bg-[#0070df] text-white border-[#0A84FF]'}`}
              >
                {isJkmSyncing ? "Syncing..." : "Force Sync"}
              </button>
            </div>

            <div className="space-y-1 font-mono text-[8.5px] leading-normal max-h-[50px] overflow-y-auto no-scrollbar">
              {jkmSyncSteps.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-1 opacity-80">
                  <span className="text-emerald-500">▶</span>
                  <span>{step}</span>
                </div>
              ))}
              {isJkmSyncing && (
                <div className="flex items-center space-x-1.5 mt-0.5 animate-pulse">
                  <Loader2 size={8} className="animate-spin text-blue-400" />
                  <span className="text-blue-400">Communicating with JKM API...</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 pt-4 shrink-0">
            <div className={`w-full flex items-center px-3.5 py-2 rounded-xl border transition-all ${isDarkMode ? 'bg-black/25 border-white/5' : 'bg-zinc-50 border-zinc-200'}`}>
              <Database size={14} className={`${textSecondary} opacity-60 mr-2`} />
              <input
                type="text"
                value={jkmSearchQuery}
                onChange={e => setJkmSearchQuery(e.target.value)}
                placeholder="Search Active PPS (e.g. Rawang, Klang)"
                className="w-full bg-transparent border-none text-xs outline-none focus:ring-0 placeholder-gray-500 font-medium"
              />
              {jkmSearchQuery && (
                <button onClick={() => setJkmSearchQuery('')} className="p-0.5 rounded-full hover:bg-gray-500/15">
                  <X size={12} className={textSecondary} />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
            {filteredShelters.length === 0 ? (
              <div className="text-center py-12">
                <Database size={24} className="mx-auto text-zinc-500 opacity-40 mb-2" />
                <p className={`text-xs font-semibold ${textSecondary}`}>No match in direct JKM registry</p>
              </div>
            ) : (
              filteredShelters.map(shelter => {
                const occ = getShelterOccupancy(shelter);
                const gInfo = officialShelterDetails[shelter.id] || { jkmId: 'JKM-PENDING', officer: 'Pending', phone: '-', supplies: [] };
                const isExpanded = jkmActiveCenterDetail === shelter.id;

                return (
                  <div
                    key={shelter.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col text-left relative overflow-hidden
                      ${isExpanded
                        ? 'border-[#0A84FF] bg-[#0A84FF]/5'
                        : isDarkMode ? 'bg-white/[0.02] hover:bg-white/[0.04] border-white/5' : 'bg-zinc-50/50 hover:bg-zinc-50 border-zinc-200/50'
                      }`}
                  >
                    <div className="flex justify-between items-start cursor-pointer" onClick={() => setJkmActiveCenterDetail(isExpanded ? null : shelter.id)}>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[7px] font-mono font-black border border-[#0A84FF]/30 text-[#0A84FF] px-1 rounded-sm bg-[#0A84FF]/10 shrink-0">{gInfo.jkmId}</span>
                          <h4 className={`font-black text-xs truncate max-w-[150px] ${textPrimary}`}>{shelter.name}</h4>
                        </div>
                        <p className={`text-[9px] ${textSecondary} font-medium mt-0.5`}>{shelter.zone} • {shelter.distance}</p>
                      </div>

                      <div className="ml-2 flex items-center space-x-1 shrink-0">
                        <span className="text-[8px] font-extrabold font-mono tracking-tighter px-2 py-0.5 rounded-full" style={{ backgroundColor: `${occ.color}15`, color: occ.color }}>
                          {occ.pct.toFixed(0)}% LOAD
                        </span>
                        <span className={`text-[8px] transition-transform duration-200 opacity-60 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-500/10 space-y-2 text-[9px] animate-[fadeIn_0.15s_ease-out]">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>JKM Officer In Charge</span>
                            <span className={`font-semibold ${textPrimary}`}>{gInfo.officer}</span>
                          </div>
                          <div>
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>Registry Status</span>
                            <span className="text-emerald-500 font-extrabold font-mono uppercase tracking-widest text-[8px]">GAZETTED ACTIVE</span>
                          </div>
                          <div className="pt-1">
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>Contact Hotline</span>
                            <a href={`tel:${gInfo.phone}`} className="text-[#0A84FF] font-bold underline font-mono">{gInfo.phone}</a>
                          </div>
                          <div className="pt-1">
                            <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary}`}>Displaced Families</span>
                            <span className={`font-bold font-mono ${textPrimary}`}>{Math.round(occ.cap / 4)} families registered</span>
                          </div>
                        </div>

                        <div>
                          <span className={`block opacity-55 font-bold uppercase tracking-wider text-[7px] ${textSecondary} mb-1`}>Logistics Readiness</span>
                          <div className="flex flex-wrap gap-1">
                            {gInfo.supplies.map((sup, sId) => (
                              <span key={sId} className={`text-[7px] font-mono font-bold px-1.5 py-0.5 rounded-md ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-zinc-100 text-zinc-600'}`}>
                                ✔ {sup}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-1 select-none">
                          <button
                            onClick={() => {
                              setInteractiveMapShelterId(shelter.id);
                              setShowAllCentersOnMap(false);
                              setShowJkmModal(false);
                              showToast(`Active map route locked to JKM center: ${shelter.name}`, 'info');
                            }}
                            className="w-full py-2 rounded-xl bg-[#0A84FF] hover:bg-[#0070df] text-white font-black text-[9px] uppercase tracking-wider shadow-inner text-center transition-transform active:scale-95"
                          >
                            Route and Navigate
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="p-4 border-t border-gray-500/20 text-center text-[7.5px] font-mono text-zinc-400 opacity-60">
            MINISTRY OF WOMEN, FAMILY AND COMMUNITY DEVELOPMENT MALAYSIA
          </div>
        </div>
      </div>
    );
  };

  const LocationModalOverlay = () => {
    if (!showLocationModal) return null;

    return (
      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`} onClick={() => setShowLocationModal(false)}>
        <div className={`relative w-full max-w-[360px] max-h-[80vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-gray-500/20 shrink-0 relative">
            {/* Standardized text-[18px] to text-lg */}
            <span className={`font-bold ${textPrimary} text-lg`}>Set Location</span>
            <button onClick={() => setShowLocationModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
            <button onClick={() => { setShowLocationModal(false); fetchLiveLocation(); }} className={`w-full p-4 mb-5 flex items-center space-x-3 rounded-xl transition-transform active:scale-95 bg-[#0A84FF] hover:bg-[#0070df] text-white shadow-md`}>
              <MapPinned size={20} />
              {/* Standardized text-[15px] to text-sm */}
              <span className="font-bold text-sm">Auto (Fetch Live GPS)</span>
            </button>

            <div className="mb-3 px-2">
              <span className={`text-[11px] font-black uppercase tracking-widest ${textSecondary}`}>Manual Selection (Malaysia)</span>
            </div>

            <div className="space-y-2">
              {manualLocations.map(loc => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setCurrentLocation(loc.name);
                    setCurrentCoords({ lat: loc.lat, lon: loc.lon });
                    setLocationMode('manual');
                    setShowLocationModal(false);
                    showToast(`Location manually set to ${loc.name}`, 'success');
                    addLog(`[SYSTEM] Location manually overridden to: ${loc.name}`);
                  }}
                  className={`w-full p-4 flex items-center justify-between transition-all active:scale-95 rounded-xl border ${currentLocation === loc.name ? (isDarkMode ? 'border-[#0A84FF] bg-[#0A84FF]/10' : 'border-[#0A84FF] bg-blue-50') : (isDarkMode ? 'border-white/5 bg-[#2C2C2E] hover:bg-white/5' : 'border-black/5 bg-gray-50 hover:bg-black/5')}`}
                >
                  {/* Standardized text-[15px] to text-sm */}
                  <span className={`font-medium text-sm ${currentLocation === loc.name ? 'text-[#0A84FF] font-bold' : textPrimary}`}>{loc.name}</span>
                  {currentLocation === loc.name && <CheckCircle size={18} className="text-[#0A84FF]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteConfirmationModalOverlay = () => {
    if (!postToDelete) return null;

    return (
      <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.15s_ease-out] p-4 font-sans" onClick={() => setPostToDelete(null)}>
        <div className={`relative w-full max-w-[340px] flex flex-col rounded-[24px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-gray-900'}`} onClick={e => e.stopPropagation()}>
          <div className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF453A]/10 text-[#FF453A] flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h3 className={`text-lg font-bold mb-2`}>Delete Post?</h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>
              Are you sure you want to delete this community post? This action is permanent and cannot be undone.
            </p>
          </div>
          <div className={`flex border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
            <button
              onClick={() => setPostToDelete(null)}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-r ${isDarkMode ? 'border-white/10 hover:bg-white/5 text-gray-400' : 'border-gray-100 hover:bg-gray-50 text-gray-500'}`}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const id = postToDelete;
                setPostToDelete(null);
                confirmDeletePost(id);
              }}
              className="flex-1 py-4 text-xs font-black uppercase tracking-wider text-[#FF453A] hover:bg-[#FF453A]/5 transition-colors"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ShelterEditModalOverlay = () => {
    if (!editingShelter) return null;

    return (
      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4"
        onClick={() => setEditingShelter(null)}
      >
        <div
          className={`relative w-full max-w-[420px] max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E]/95 border-white/10 text-white' : 'bg-white border-black/10 text-zinc-900'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-500/10 shrink-0 relative">
            <div className="flex items-center space-x-2.5">
              <Tent size={20} className="text-[#0A84FF]" />
              <span className={`font-bold text-lg ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>Patch Shelter Details</span>
            </div>
            <button onClick={() => setEditingShelter(null)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Shelter ID</label>
              <input
                type="text"
                value={`SLG-${editingShelter.id.toUpperCase()}`}
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-500/10 bg-zinc-500/5 font-mono text-xs text-zinc-400 select-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Shelter Name</label>
              <input
                type="text"
                value={editShelterName}
                onChange={e => setEditShelterName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                placeholder="e.g. SMK Seri Garing"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Address / Location</label>
              <input
                type="text"
                value={editShelterAddress}
                onChange={e => setEditShelterAddress(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                placeholder="e.g. Rawang, Selangor"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Supervisor Name</label>
              <input
                type="text"
                value={editShelterSupervisor}
                onChange={e => setEditShelterSupervisor(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                  }`}
                placeholder="e.g. Ramli A."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Registered Guests</label>
                <input
                  type="number"
                  value={editShelterCapacity}
                  onChange={e => setEditShelterCapacity(Number(e.target.value))}
                  min={0}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                    }`}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block mb-1">Max Capacity</label>
                <input
                  type="number"
                  value={editShelterMaxCapacity}
                  onChange={e => setEditShelterMaxCapacity(Number(e.target.value))}
                  min={1}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none ${isDarkMode ? 'border-white/10 bg-white/5 text-white' : 'border-zinc-300 bg-zinc-50 text-zinc-900'
                    }`}
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-zinc-50 border-zinc-200'
              }`}>
              <div>
                <span className="text-xs font-bold block">Capacity Override Status</span>
                <span className="text-[10px] text-zinc-400">Force shelter to display as Full regardless of load</span>
              </div>
              <button
                type="button"
                onClick={() => setEditShelterIsFull(!editShelterIsFull)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none relative ${editShelterIsFull ? 'bg-red-500' : 'bg-zinc-400'
                  }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${editShelterIsFull ? 'translate-x-6' : 'translate-x-0'
                  }`} />
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-gray-500/10 shrink-0 flex items-center justify-end space-x-3 bg-black/[0.02]">
            <button
              onClick={() => setEditingShelter(null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${isDarkMode
                ? 'border-white/10 bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50'
                }`}
            >
              Cancel
            </button>
            <button
              onClick={saveShelterPatch}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center space-x-1.5 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 cursor-pointer"
            >
              <Save size={14} />
              <span>Apply Patch</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const UserProfileModalOverlay = () => {
    if (!showProfileEditModal) return null;

    const PREDEFINED_AVATARS = [
      { id: 'initials', label: 'Initials', emoji: 'AA' },
      { id: 'emoji:AT', label: 'Astro', emoji: '👨‍🚀' },
      { id: 'emoji:RS', label: 'Rescuer', emoji: '👷' },
      { id: 'emoji:MD', label: 'Medic', emoji: '🧑‍⚕️' },
      { id: 'emoji:OB', label: 'Observer', emoji: '👁️' },
      { id: 'emoji:KL', label: 'Koala', emoji: '🐨' },
      { id: 'emoji:CT', label: 'Cat', emoji: '🐱' },
    ];

    const handleCustomPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 1024 * 1024) {
        showToast('Image select limit: 1MB. Please compress or choose a smaller photo!', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setTempProfileAvatar(`custom:${base64String}`);
        showToast('Selected photo applied to preview!', 'success');
      };
      reader.readAsDataURL(file);
    };

    const handleSaveProfile = () => {
      setProfileName(tempProfileName);
      setProfileEmail(tempProfileEmail);
      setProfileCountry(tempProfileCountry);
      setProfilePhone(tempProfilePhone);
      setProfileAvatar(tempProfileAvatar);

      // Save to localStorage
      localStorage.setItem('profileName', tempProfileName);
      localStorage.setItem('profileEmail', tempProfileEmail);
      localStorage.setItem('profileCountry', tempProfileCountry);
      localStorage.setItem('profilePhone', tempProfilePhone);
      localStorage.setItem('profileAvatar', tempProfileAvatar);

      // Sync with Firestore profile database
      updateProfilePref('profileName', tempProfileName);
      updateProfilePref('profileEmail', tempProfileEmail);
      updateProfilePref('profileCountry', tempProfileCountry);
      updateProfilePref('profilePhone', tempProfilePhone);
      updateProfilePref('profileAvatar', tempProfileAvatar);

      setShowProfileEditModal(false);
      showToast('Profile updated successfully!', 'success');
      addLog(`[SYSTEM] Resident profile name updated to: ${tempProfileName}`);
    };

    return (
      <div
        className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4`}
        onClick={() => setShowProfileEditModal(false)}
      >
        <div
          className={`relative w-full max-w-[400px] max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E]/95 border-white/10' : 'bg-white border-black/10'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-500/10 shrink-0 relative">
            <div className="flex items-center space-x-2.5">
              <UserCheck size={20} className="text-[#0A84FF]" />
              {/* Standardized typography size to standard text-lg */}
              <span className={`font-bold ${textPrimary} text-lg`}>Edit Resident Profile</span>
            </div>
            <button onClick={() => setShowProfileEditModal(false)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
            {/* Visual Avatar Preview container */}
            <div className="flex flex-col items-center justify-center py-2 mb-2">
              <div
                onClick={() => document.getElementById('custom-avatar-upload')?.click()}
                className="relative group cursor-pointer transition-transform duration-200 active:scale-95"
                title="Click to choose a custom photo"
              >
                {renderAvatar(tempProfileAvatar, tempProfileName, "w-20 h-20 text-2xl", false)}

                {/* Camera icon badge */}
                <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0A84FF] text-white shadow-md border-2 border-white dark:border-[#1C1C1E] transition-transform group-hover:scale-110">
                  <Camera size={12} strokeWidth={2.5} />
                </div>
              </div>
              <span className={`text-[11px] font-black uppercase tracking-widest opacity-60 mt-2.5 ${textSecondary}`}>Avatar Registry Preview</span>
            </div>

            {/* Hidden Input File for custom photos */}
            <input
              type="file"
              id="custom-avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleCustomPhotoChange}
            />

            {/* Avatar Selection Grid */}
            <div className="space-y-2">
              <label className={`block text-[11px] font-black uppercase tracking-widest ml-1 ${textSecondary}`}>
                Choose Identity Avatar
              </label>

              <div className="flex items-center space-x-2.5 pb-1 overflow-x-auto no-scrollbar py-1">
                {PREDEFINED_AVATARS.map((av) => {
                  const isSelected = tempProfileAvatar === av.id;

                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setTempProfileAvatar(av.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all relative border-2 ${isSelected
                        ? 'border-[#0A84FF] scale-110 shadow-md shadow-[#0A84FF]/20'
                        : 'border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                        } ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}
                      title={av.label}
                    >
                      {av.id === 'initials' ? (
                        <span className="text-[10px] font-bold tracking-tight font-sans text-gray-500 dark:text-gray-400 uppercase">{getInitials(tempProfileName)}</span>
                      ) : (
                        <span className="text-lg leading-none select-none">{av.emoji}</span>
                      )}
                    </button>
                  );
                })}

                {/* Upload own photo option button */}
                <button
                  type="button"
                  onClick={() => document.getElementById('custom-avatar-upload')?.click()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all relative border-2 ${tempProfileAvatar.startsWith('custom:')
                    ? 'border-[#0A84FF] scale-110 shadow-md shadow-[#0A84FF]/20'
                    : 'border-dashed border-gray-400 dark:border-gray-600 hover:border-[#0A84FF] hover:scale-105'
                    } ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'}`}
                  title="Upload Custom Photo"
                >
                  {tempProfileAvatar.startsWith('custom:') ? (
                    <img src={tempProfileAvatar.substring(7)} alt="Custom" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <Camera size={14} className="text-gray-400 dark:text-gray-500" />
                  )}
                </button>
              </div>

              <p className="text-[10px] opacity-50 ml-1 leading-normal">
                Click the avatar circle above or the camera button to upload your own photo (max 1MB).
              </p>
            </div>

            {/* Full Name Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Full Name</label>
              <input
                type="text"
                value={tempProfileName}
                onChange={e => setTempProfileName(e.target.value)}
                placeholder="Enter full name"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-white border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>

            {/* Email Address Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Email Address</label>
              <input
                type="email"
                value={tempProfileEmail}
                onChange={e => setTempProfileEmail(e.target.value)}
                placeholder="Enter email address"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-white border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>

            {/* Country Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Country</label>
              <input
                type="text"
                value={tempProfileCountry}
                onChange={e => setTempProfileCountry(e.target.value)}
                placeholder="e.g. Malaysia, Singapore"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-[#fcfcfc] border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-widest mb-1.5 ml-1 ${textSecondary}`}>Phone Number</label>
              <input
                type="tel"
                value={tempProfilePhone}
                onChange={e => setTempProfilePhone(e.target.value)}
                placeholder="Enter mobile number"
                className={`w-full px-4 h-12 rounded-xl text-sm outline-none border transition-colors ${isDarkMode
                  ? 'bg-[#111] border-white/10 text-white focus:border-[#0A84FF]'
                  : 'bg-[#fcfcfc] border-black/10 text-black focus:border-[#0A84FF]'
                  }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-5 border-t border-gray-500/10 shrink-0 flex items-center space-x-3 bg-gray-500/5">
            <button
              onClick={() => setShowProfileEditModal(false)}
              className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
                }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              disabled={!tempProfileName.trim() || !tempProfileEmail.trim()}
              className="flex-1 py-3 rounded-xl bg-[#0A84FF] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 active:scale-95 text-center shadow-lg shadow-blue-500/10"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CitizenDetailsModalOverlay = () => {
    if (!selectedCitizenId) return null;
    const citizen = citizens.find(c => c.id === selectedCitizenId);
    if (!citizen) return null;

    const isSos = citizen.status.includes('SOS');
    const isEvac = citizen.status === 'EVACUATED';

    const handleUpdateStatus = (newStatus: string) => {
      setCitizens(prev => prev.map(c => c.id === citizen.id ? { ...c, status: newStatus } : c));
      showToast(`${citizen.name}'s status updated to ${newStatus}`, 'success');
      addLog(`[DATABASE] Updated status of resident ${citizen.name} (${citizen.id}) to ${newStatus}`);
    };

    return (
      <div
        className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-[fadeIn_0.2s_ease-out] p-4 font-sans"
        onClick={() => setSelectedCitizenId(null)}
      >
        <div
          className={`relative w-full max-w-[440px] max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E]/95 border-white/10' : 'bg-white border-black/10'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-500/10 shrink-0 relative">
            <div className="flex items-center space-x-2.5">
              <Users size={20} className="text-[#0A84FF]" />
              <span className={`font-bold ${textPrimary} text-lg`}>Resident Database Card</span>
            </div>
            <button onClick={() => setSelectedCitizenId(null)} className="p-1.5 bg-gray-500/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors">
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
            {/* Top summary section */}
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border shrink-0 ${isSos
                ? 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30 animate-pulse'
                : (isEvac ? 'bg-[#0a84ff]/15 text-[#0a84ff] border-[#0a84ff]/30' : 'bg-[#32d74b]/15 text-[#32d74b] border-[#32d74b]/30')
                }`}>
                {citizen.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h4 className={`text-base font-bold truncate ${textPrimary}`}>{citizen.name}</h4>
                <p className="text-xs text-zinc-400 font-mono tracking-wider mt-0.5">{citizen.id}</p>

                <div className="flex items-center mt-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isSos
                    ? 'bg-[#ff453a]/25 text-[#ff453a] border border-[#ff453a]/30'
                    : (isEvac ? 'bg-[#0a84ff]/25 text-[#0a84ff] border border-[#0a84ff]/30' : 'bg-[#32d74b]/20 text-[#32d74b] border border-[#32d74b]/30')
                    }`}>
                    {citizen.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile specifications */}
            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#2C2C2E]/50 border-white/5' : 'bg-zinc-50 border-zinc-200'} space-y-3 font-sans`}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Designated Contact:</span>
                <span className={`font-semibold font-mono ${textPrimary}`}>{citizen.phone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Sector/Evacuation Zone:</span>
                <span className={`font-bold ${textPrimary}`}>{citizen.zone}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Last Active Signal:</span>
                <span className="font-semibold text-emerald-500 font-mono">{citizen.ping}</span>
              </div>
            </div>

            {/* Admin Override Controls */}
            <div className="space-y-3">
              <span className={`text-[11px] font-bold uppercase tracking-widest ${textSecondary} block`}>Database Status Override</span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => handleUpdateStatus('SAFE')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition-all border shrink-0 ${citizen.status === 'SAFE'
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                    : isDarkMode ? 'bg-[#2C2C2E]/60 border-white/5 text-zinc-300 hover:bg-[#3A3A3C]' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-105'
                    }`}
                >
                  🟢 SAFE
                </button>
                <button
                  onClick={() => handleUpdateStatus('EVACUATED')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition-all border shrink-0 ${citizen.status === 'EVACUATED'
                    ? 'bg-[#0a84ff] border-[#0a84ff] text-white shadow-md'
                    : isDarkMode ? 'bg-[#2C2C2E]/60 border-white/5 text-zinc-300 hover:bg-[#3A3A3C]' : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-105'
                    }`}
                >
                  🔵 EVACUATED
                </button>
                <button
                  onClick={() => handleUpdateStatus('SOS PENDING')}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-wide cursor-pointer transition-all border shrink-0 ${citizen.status === 'SOS PENDING'
                    ? 'bg-[#ff453a] border-[#ff453a] text-white shadow-md'
                    : isDarkMode ? 'bg-[#2C2C2E]/60 border-white/5 text-[#ff453a] hover:bg-[#3A3A3C]' : 'bg-white border-zinc-200 text-[#ff3b30] hover:bg-zinc-105'
                    }`}
                >
                  🔴 S.O.S
                </button>
              </div>
            </div>

            {/* Simulated Live Action Controls */}
            <div className="space-y-2.5 pt-2">
              <span className={`text-[11px] font-bold uppercase tracking-widest ${textSecondary} block`}>Navigation & Tactical Interacting</span>
              <div className="flex space-x-2.5">
                <button
                  onClick={() => {
                    const matchShelter = baseShelters.find(s => s.zone.toLowerCase() === citizen.zone.toLowerCase()) || baseShelters[0];
                    setInteractiveMapShelterId(matchShelter.id);
                    setShowAllCentersOnMap(false);
                    setAdminView('overview');
                    setSelectedCitizenId(null);
                    showToast(`Routing map focused on nearest shelter relative to ${citizen.name} (${citizen.zone})`, 'success');
                    addLog(`[MAP] Focused tactical navigation routes on: ${matchShelter.name} to rescue ${citizen.name}`);
                  }}
                  className="flex-1 py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all active:scale-95 shadow-md border border-blue-500/20"
                >
                  <MapPin size={14} className="shrink-0" />
                  <span>Interactive Route Focus</span>
                </button>

                <button
                  onClick={() => {
                    showToast(`SMS Broadcast instruction dispatch sent to ${citizen.phone}!`, 'info');
                    addLog(`[BROADCAST] Direct warning ping transmitted to: ${citizen.phone}`);
                  }}
                  className={`px-4 rounded-2xl border flex items-center justify-center cursor-pointer transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                    }`}
                  title="Send Direct Emergency Cell Broadcast SMS"
                >
                  <Database size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isBooting) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-[#000]' : 'bg-[#f2f2f7]'}`}>
        <div className="flex flex-col items-center animate-[pulseGlow_2s_ease-in-out_infinite]">
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] flex items-center justify-center shadow-2xl">
            <Waves size={48} className="text-white" strokeWidth={2.5} />
          </div>
          <h1 className={`mt-6 text-2xl font-black font-display tracking-tighter ${textPrimary}`}>{t.appTitle}</h1>
          <div className="mt-8 w-32 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#FF453A] to-[#FF9F0A] animate-[loadingBar_1.8s_ease-in-out_forwards]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    // Derived citizen counts
    const filteredCitizens = citizens.filter(c => {
      const query = citizenSearch.toLowerCase().trim();
      const matchesSearch = !query ||
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.zone.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query);

      const matchesFilter = citizenStatusFilter === 'ALL' || c.status === citizenStatusFilter;
      return matchesSearch && matchesFilter;
    });

    const totalSheltersCapacityMax = baseShelters.reduce((acc, curr) => {
      const statusObj = shelterStatus[curr.id];
      const maxCap = statusObj?.maxCapacity !== undefined ? statusObj.maxCapacity : curr.maxCapacity;
      return acc + maxCap;
    }, 0);
    const totalCurrentShelterOccupancy = baseShelters.reduce((acc, curr) => {
      const occ = getShelterOccupancy(curr);
      return acc + occ.cap;
    }, 0);
    const overallShelterOccupancyPct = Math.round((totalCurrentShelterOccupancy / totalSheltersCapacityMax) * 100);

    const pendingRescueCount = sosRequests.filter(s => s.status === 'PENDING').length;
    const dispatchedRescueCount = sosRequests.filter(s => s.status === 'DISPATCHED' || s.status === 'EN_ROUTE' || s.status === 'ARRIVED').length;

    const getAdminChartY = (x: number) => {
      const base = 100;
      const peakHeight = simulateStorm ? 75 : 24;
      const mainPeak = peakHeight * Math.exp(-Math.pow((x - 200) / 70, 2));
      const leftHill = (simulateStorm ? 24 : 10) * Math.exp(-Math.pow((x - 100) / 40, 2));
      const rightHill = (simulateStorm ? 30 : 8) * Math.exp(-Math.pow((x - 300) / 50, 2));
      const ripple = 3 * Math.sin(x / 10);
      return base - mainPeak - leftHill - rightHill + ripple;
    };

    const adminPathPoints = Array.from({ length: 121 }, (_, i) => {
      const x = (i / 120) * 400;
      return `${x.toFixed(1)},${getAdminChartY(x).toFixed(1)}`;
    }).join(" L ");

    const adminArea = `M 0,120 L ${adminPathPoints} L 400,120 Z`;

    const histPoints = Array.from({ length: 61 }, (_, i) => {
      const x = (i / 120) * 400;
      return `${x.toFixed(1)},${getAdminChartY(x).toFixed(1)}`;
    }).join(" L ");
    const histLine = `M 0,${getAdminChartY(0).toFixed(1)} L ${histPoints}`;

    const predPoints = Array.from({ length: 61 }, (_, i) => {
      const x = ((60 + i) / 120) * 400;
      return `${x.toFixed(1)},${getAdminChartY(x).toFixed(1)}`;
    }).join(" L ");
    const predLine = `M 200,${getAdminChartY(200).toFixed(1)} L ${predPoints}`;

    return (
      <div className={`min-h-screen w-full flex p-5 ${isDarkMode
        ? 'bg-[#000] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-950 via-black to-zinc-950 text-white'
        : 'bg-[#f2f2f7] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-zinc-100 to-zinc-200 text-[#1c1c1e]'
        } font-sans overflow-hidden selection:bg-[#0a84ff]/20 animate-[fadeIn_0.5s_ease-out] relative transition-all duration-500`}>
        <ToastOverlay />
        <DeleteConfirmationModalOverlay />

        {/* Executive report presentation layout modal */}
        {officialReport && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center animate-[fadeIn_0.3s_ease-out] p-4">
            <div className={`w-full max-w-2xl max-h-[85vh] flex flex-col rounded-[32px] border shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden ${isDarkMode ? 'bg-[#18181b] border-white/10' : 'bg-white border-black/10'}`}>
              <div className="p-6 border-b border-zinc-500/10 flex justify-between items-center bg-gradient-to-r from-zinc-500/5 to-transparent">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-[#0a84ff]/10 text-[#0a84ff]">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black tracking-widest text-[#0a84ff] uppercase font-mono">Operations Intelligence</span>
                    <h2 className="text-xl font-black tracking-tight font-display uppercase mt-0.5">Special Briefing & Predictive Analysis</h2>
                  </div>
                </div>
                <button onClick={() => setOfficialReport(null)} className="p-2 rounded-full hover:bg-zinc-500/20 transition-colors text-zinc-400 hover:text-zinc-100"><X size={18} /></button>
              </div>
              <div className="p-8 overflow-y-auto font-sans leading-relaxed text-sm flex-1">
                <div className="mb-6 p-4 rounded-xl bg-[#0a84ff]/5 text-[#0a84ff] border border-[#0a84ff]/10 flex items-center space-x-3">
                  <ShieldCheck size={18} className="shrink-0 animate-pulse" />
                  <span className="text-[10.5px] font-black font-mono tracking-wider">OFFICIAL RECOVERY & FORECAST DIRECTIVE — VERIFIED</span>
                </div>
                <div className="whitespace-pre-wrap opacity-95">
                  {officialReport}
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-500/10 flex justify-between items-center text-[9px] font-mono font-black opacity-50 uppercase tracking-widest">
                  <span>RECORD IDENTIFIER: INCIDENT-DM-2026</span>
                  <span>PREPARED BY FLOOD COGNITIVE SUITE</span>
                </div>
              </div>
              <div className="p-6 border-t border-zinc-500/10 flex justify-end space-x-3 bg-gradient-to-r from-transparent to-zinc-500/5">
                <button onClick={() => setOfficialReport(null)} className={`px-6 py-3 rounded-xl font-mono font-bold text-[10px] uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-95 ${isDarkMode ? 'bg-[#27272a] hover:bg-[#3f3f46] text-zinc-100 border border-white/5' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200'}`}>Dismiss Draft</button>
                <button onClick={() => generatePDFAdvisory(officialReport)} className="px-6 py-3 rounded-xl font-black font-mono text-[10px] uppercase tracking-widest bg-[#0a84ff] text-white shadow-lg shadow-[#0a84ff]/25 hover:bg-blue-600 transition-all hover:scale-[1.01] active:scale-95 border border-[#0a84ff]/20">Download PDF Advisory</button>
              </div>
            </div>
          </div>
        )}

        {/* Elegant structural grid backdrop overlay */}
        <div className={`fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}_1px,transparent_1px)] [background-size:32px_32px] opacity-70`}></div>
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[15%] w-[600px] h-[600px] bg-[#0a84ff]/3 blur-[140px] rounded-full mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-[30%] right-[15%] w-[500px] h-[500px] bg-[#ff453a]/2 blur-[160px] rounded-full mix-blend-screen animate-pulse"></div>
        </div>

        {/* Dynamic overlay backdrop when sidebar is toggled open */}
        <div
          onClick={() => setAdminSidebarOpen(false)}
          className={`absolute inset-5 bg-black/45 backdrop-blur-sm z-35 transition-all duration-500 rounded-[32px] ${adminSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none invisible'
            }`}
        />

        {/* Left operations navigation deck */}
        <div className={`transition-all duration-500 ease-in-out absolute left-5 top-5 bottom-5 w-[305px] ${adminSidebarOpen
          ? 'translate-x-0 opacity-100 z-40 pointer-events-auto border'
          : '-translate-x-[345px] opacity-0 z-0 pointer-events-none border-transparent invisible'
          } rounded-[32px] ${glassCardClass} flex flex-col shadow-2xl overflow-hidden ${isDarkMode
            ? 'border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.5)] bg-zinc-950/95 backdrop-blur-xl'
            : 'border-zinc-300/40 shadow-[0_24px_50px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-xl'
          }`}>
          <div className="w-[305px] flex flex-col h-full shrink-0 relative">
            {/* Elegant structural border top decoration */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0a84ff]"></div>

            <div className={`p-6 pb-5 flex items-center space-x-3.5 border-b ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-black/5 bg-black/[0.01]'}`}>
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#0a84ff]/10 text-[#0a84ff] flex items-center justify-center border border-[#0a84ff]/20 shadow-sm">
                  <Waves size={18} />
                </div>
              </div>
              <div className="min-w-0">
                <h1 className={`font-sans font-extrabold tracking-tight text-base leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>FloodCast</h1>
                <p className={`text-[10px] text-zinc-500 font-medium tracking-wide mt-1`}>EOC Management Panel</p>
              </div>
            </div>

            <div className="flex-1 py-6 px-4 space-y-7 overflow-y-auto no-scrollbar">
              <div>
                <span className={`px-3 text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} block mb-3 font-sans`}>NAVIGATION</span>
                <div className="space-y-1">
                  <button
                    onClick={() => { setAdminView('overview'); setCitizenSearch(''); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'overview'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'overview' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <LayoutDashboard size={15} />
                      </div>
                      <span className="text-xs truncate">Dashboard Overview</span>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${simulateStorm ? 'bg-[#ff453a]' : 'bg-[#32d74b]'}`}></span>
                  </button>

                  <button
                    onClick={() => { setAdminView('citizens'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'citizens'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'citizens' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <Users size={15} />
                      </div>
                      <span className="text-xs truncate">Resident Directory</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded bg-zinc-200/50 dark:bg-white/10 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-650'}`}>{citizens.length}</span>
                  </button>
                </div>
              </div>

              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <span className={`px-3 text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} block mb-3 font-sans`}>EOC DECK MODULES</span>
                <div className="space-y-1">
                  {/* Hydrology & Sensor Grid */}
                  <button
                    onClick={() => { setAdminView('hydrology'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'hydrology'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'hydrology' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <MapPinned size={15} />
                      </div>
                      <span className="text-xs truncate">Hydrology & Sensors</span>
                    </div>
                  </button>

                  {/* Active SOS Dispatch */}
                  <button
                    onClick={() => { setAdminView('dispatch'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'dispatch'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'dispatch' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <LifeBuoy size={15} />
                      </div>
                      <span className="text-xs truncate">SOS Rescue Dispatch</span>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded bg-red-500/15 text-red-500`}>
                      {citizens.filter(c => c.status === 'SOS PENDING').length}
                    </span>
                  </button>

                  {/* Shelter & Stock Logistics */}
                  <button
                    onClick={() => { setAdminView('shelter'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'shelter'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'shelter' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <Tent size={15} />
                      </div>
                      <span className="text-xs truncate">Shelter & Stock Logistics</span>
                    </div>
                  </button>

                  {/* Mutual Aid Ledger */}
                  <button
                    onClick={() => { setAdminView('mutual-aid'); setAdminSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-255 group cursor-pointer border ${adminView === 'mutual-aid'
                      ? 'bg-blue-500/10 text-blue-650 dark:text-blue-400 border-blue-500/15 shadow-sm font-semibold'
                      : `text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent hover:${isDarkMode ? 'bg-white/5' : 'bg-black/5'} font-medium`
                      }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-1 rounded-lg transition-colors ${adminView === 'mutual-aid' ? 'text-[#0a84ff]' : 'text-zinc-400 group-hover:text-zinc-350'}`}>
                        <Radio size={15} />
                      </div>
                      <span className="text-xs truncate">Mutual Aid Ledger</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center justify-between px-3 mb-2.5">
                  <span className={`text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} font-sans`}>SIMULATION CONTROL</span>
                </div>

                <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/[0.015] border-white/5' : 'bg-zinc-50 border-zinc-200'} space-y-3.5`}>
                  {/* Active Storm Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0 flex-1 pr-2 select-none">
                      <span className="text-xs font-semibold leading-none">Simulate Storm</span>
                      <span className="text-[9px] text-zinc-500 font-medium tracking-wide mt-1">{simulateStorm ? "Active Emergency Mode" : "Normal Mode"}</span>
                    </div>
                    <button
                      onClick={toggleSimulateStorm}
                      className={`w-9 h-5 rounded-full p-0.5 transition-all duration-250 relative flex items-center shrink-0 cursor-pointer ${simulateStorm ? 'bg-[#ff453a]' : 'bg-zinc-300 dark:bg-zinc-800'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-250 ${simulateStorm ? 'translate-x-[16px]' : 'translate-x-0'}`}></div>
                    </button>
                  </div>

                  <div className={`h-px w-full ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}></div>

                  {/* Recovery Phase Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0 flex-1 pr-2 select-none">
                      <span className="text-xs font-semibold leading-none">Recovery Phase</span>
                      <span className="text-[9px] text-zinc-500 font-medium tracking-wide mt-1">{appPhase === 'recovery' ? "Recovery Protocols On" : "Inactive Ready"}</span>
                    </div>
                    <button
                      onClick={toggleSimulateRecovery}
                      className={`px-2 py-1 rounded-lg font-bold font-sans text-[10px] transition-all flex items-center space-x-1 cursor-pointer select-none shrink-0 ${appPhase === 'recovery'
                        ? 'bg-blue-600 text-white'
                        : (isDarkMode ? 'bg-white/10 text-zinc-300 hover:bg-white/20' : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300')
                        }`}
                    >
                      <HeartHandshake size={11} />
                      <span>{appPhase === 'recovery' ? 'On' : 'Off'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Theme Control */}
              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <div className="flex items-center justify-between px-3 mb-2.5">
                  <span className={`text-[10px] font-bold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'} font-sans uppercase`}>
                    {t.themeLabel ? t.themeLabel.toUpperCase() : "THEME CONTROL"}
                  </span>
                </div>

                <div className={`p-2.5 rounded-2xl border ${isDarkMode ? 'bg-white/[0.015] border-white/5' : 'bg-zinc-50 border-zinc-200'} flex items-center justify-between gap-3`}>
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isDarkMode ? 'bg-white/5 text-amber-400' : 'bg-black/5 text-blue-600'}`}>
                      {themeMode === 'light' ? (
                        <Sun size={14} className="animate-[spin_12s_linear_infinite]" />
                      ) : themeMode === 'dark' ? (
                        <Moon size={14} />
                      ) : (
                        <Clock size={14} className="animate-[pulse_2s_ease-in-out_infinite]" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 select-none">
                      <span className="text-xs font-semibold leading-none">
                        {themeMode === 'light' ? t.themeLight : themeMode === 'dark' ? t.themeDark : t.themeAuto}
                      </span>
                    </div>
                  </div>

                  {/* 3-way toggle slider adapted perfectly for sidebar width */}
                  <div
                    className={`relative w-[130px] h-[34px] rounded-full flex items-center p-0.5 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${isDarkMode
                      ? "bg-[#13151a] border-white/5 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]"
                      : "bg-[#edf2f7] border-black/5 shadow-[inset_2px_2px_4px_#cbd5e1]"
                      }`}
                  >
                    {/* Overlay 3-way touch zones */}
                    <div className="absolute inset-0 flex z-30">
                      <button onClick={() => changeThemeMode('light')} className="flex-1 h-full outline-none cursor-pointer" title="Set Light Theme"></button>
                      <button onClick={() => changeThemeMode('auto')} className="flex-1 h-full outline-none cursor-pointer" title="Set Auto Theme"></button>
                      <button onClick={() => changeThemeMode('dark')} className="flex-1 h-full outline-none cursor-pointer" title="Set Dark Theme"></button>
                    </div>

                    {/* Static background text labels */}
                    <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[8.5px] tracking-tight font-sans uppercase">
                      <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'light' ? 'opacity-0' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        LGT
                      </span>
                      <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'auto' ? 'opacity-0' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        AUTO
                      </span>
                      <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'dark' ? 'opacity-0' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        DRK
                      </span>
                    </div>

                    {/* Sliding Knob */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[3px] left-[2px] z-20 ${isDarkMode
                        ? "bg-[#1c2025] shadow-[2px_2px_4px_rgba(0,0,0,0.85)] text-[#FF9F0A]"
                        : "bg-[#f8fafc] shadow-[1.5px_1.5px_3px_#cbd5e1] text-[#0A84FF]"
                        }`}
                      style={{
                        transform: themeMode === 'light'
                          ? 'translateX(0px)'
                          : themeMode === 'auto'
                            ? 'translateX(48px)'
                            : 'translateX(96px)'
                      }}
                    >
                      {themeMode === 'light' ? (
                        <Sun size={12} strokeWidth={2.5} className="animate-[spin_12s_linear_infinite]" />
                      ) : themeMode === 'dark' ? (
                        <Moon size={12} strokeWidth={2.5} />
                      ) : (
                        <Clock size={12} strokeWidth={2.5} className="animate-[pulse_2s_ease-in-out_infinite]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Admin Profile - Moved below Recovery Phase */}
              <div className={`pt-5 border-t ${isDarkMode ? 'border-white/5' : 'border-black/5'} flex flex-col space-y-3`}>
                <div className={`p-3 rounded-xl flex items-center space-x-3 border ${isDarkMode ? 'bg-black/30 border-white/5' : 'bg-white border-zinc-200'}`}>
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#0a84ff]/10 text-[#0a84ff]">
                    <Shield size={15} />
                  </div>
                  <div className="min-w-0 flex-1 select-none">
                    <p className="font-bold text-xs leading-none">Emergency Admin</p>
                    <p className="font-mono text-[9px] opacity-50 leading-none mt-1 truncate">{user?.email || 'admin@portal.gov'}</p>
                  </div>
                </div>

                <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-red-500 bg-red-500/5 hover:bg-red-500/10 active:scale-98 transition-all font-bold text-xs select-none cursor-pointer border border-red-500/10">
                  <LogOut size={12} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Command Workspace */}
        <div className={`flex-1 flex flex-col rounded-[32px] ${glassCardClass} overflow-y-auto no-scrollbar relative z-10 scroll-smooth shadow-2xl border ${isDarkMode ? 'border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]' : 'border-zinc-300/40'}`}>
          {/* Workspace Floating Header with translucent backdrop glass */}
          <div className={`h-20 px-8 border-b ${isDarkMode ? 'border-white/5 bg-black/25' : 'border-zinc-200 bg-white/40'} backdrop-blur-md flex flex-wrap items-center justify-between sticky top-0 z-30 transition-all duration-300 gap-4`}>
            <div className="flex items-center flex-wrap gap-4">
              <button
                onClick={() => setAdminSidebarOpen(!adminSidebarOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center border hover:scale-105 active:scale-95 ${isDarkMode
                  ? 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-[#0a84ff] hover:border-[#0a84ff]/30 shadow-inner'
                  : 'border-zinc-300/60 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-250 hover:text-[#0a84ff] hover:border-zinc-400 shadow-sm'
                  }`}
                title={adminSidebarOpen ? "Collapse Navigation Panel" : "Expand Navigation Panel"}
              >
                <Menu size={18} className={`transition-transform duration-350 ${adminSidebarOpen ? 'rotate-90 text-[#0a84ff]' : 'rotate-0'}`} />
              </button>

              <div>
                <div className="flex items-center space-x-2 select-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] font-sans">EOC PORTAL</span>
                </div>
                <h2 className={`text-xl font-extrabold tracking-tight mt-0.5 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {adminView === 'overview' ? 'Command Center' :
                    adminView === 'hydrology' ? 'Hydrology & Sensor Grid' :
                      adminView === 'dispatch' ? 'SOS Active Dispatch' :
                        adminView === 'shelter' ? 'Relief Shelter & Logistics' :
                          adminView === 'mutual-aid' ? 'Mutual Aid Radio Ledger' :
                            'Resident Directory'}
                </h2>
              </div>

              {adminView === 'overview' && (
                <div className={`flex p-1 rounded-xl border md:ml-4 shadow-inner select-none transition-colors duration-300 ${isDarkMode ? 'bg-black/40 border-white/10' : 'bg-zinc-200/50 border-zinc-250'
                  }`}>
                  <button
                    onClick={() => setCommandCenterTab('standard')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer ${commandCenterTab === 'standard'
                      ? 'bg-blue-600 text-white shadow-md'
                      : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                  >
                    Standard Feed
                  </button>
                  <button
                    onClick={() => setCommandCenterTab('tactical')}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${commandCenterTab === 'tactical'
                      ? isDarkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-50 text-red-600 border border-red-200/60 shadow-sm'
                      : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    EOC Dispatch Deck
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3.5">
              <LiveClock isDarkMode={isDarkMode} />

              <div className="h-6 w-px bg-zinc-500/15 hidden md:block"></div>

              <div className="flex items-center gap-2">
                <button
                  onClick={generateOfficialReport}
                  disabled={isGeneratingReport}
                  className="flex items-center space-x-1.5 bg-[#0a84ff] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer border border-[#0a84ff]/10"
                >
                  {isGeneratingReport ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
                  <span>Generate PDF Briefing</span>
                </button>
              </div>
            </div>
          </div>

          {adminView === 'overview' ? (
            <div className="p-6 sm:p-8 lg:p-9 max-w-[1700px] mx-auto w-full pb-20 space-y-8 animate-[fadeIn_0.5s_ease-out]">
              {commandCenterTab === 'tactical' ? (
                <SciFiCommandCenter
                  isDarkMode={isDarkMode}
                  onShowToast={showToast}
                  onSetViewMode={setAdminView}
                  selectedSectorId={selectedSectorId}
                  onSelectSectorId={setSelectedSectorId}
                  onEditShelter={handleOpenShelterEditModal}
                  citizens={citizens}
                  setCitizens={setCitizens}
                  riverLevel={riverLevel}
                  rainfall={rainfall}
                  shelterSupplies={shelterSupplies}
                  setShelterSupplies={setShelterSuppliesWithSync}
                  isSirenActive={isSirenActive}
                  setIsSirenActive={setIsSirenActiveWithSync}
                  isLeveeDamDeployed={isLeveeDamDeployed}
                  setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
                />
              ) : (
                <DashboardOverview
                  isDarkMode={isDarkMode}
                  simulateStorm={simulateStorm}
                  rainfall={rainfall}
                  chartData={chartData}
                  pendingRescueCount={pendingRescueCount}
                  dispatchedRescueCount={dispatchedRescueCount}
                  riverLevel={riverLevel}
                  overallShelterOccupancyPct={overallShelterOccupancyPct}
                  totalCurrentShelterOccupancy={totalCurrentShelterOccupancy}
                  totalSheltersCapacityMax={totalSheltersCapacityMax}
                  sosRequests={sosRequests}
                  isSirenActive={isSirenActive}
                  setIsSirenActive={setIsSirenActiveWithSync}
                  isLeveeDamDeployed={isLeveeDamDeployed}
                  setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
                  baseShelters={baseShelters}
                  getShelterOccupancy={getShelterOccupancy}
                  shelterStatus={shelterStatus}
                  showAllShelters={showAllShelters}
                  setShowAllShelters={setShowAllShelters}
                  setAdminView={setAdminView}
                  showToast={showToast}
                  glassCardClass={glassCardClass}
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                  handleOpenShelterEditModal={handleOpenShelterEditModal}
                  adminArea={adminArea}
                  predLine={predLine}
                  histLine={histLine}
                  getAdminChartY={getAdminChartY}
                  selectedShelterDetail={selectedShelterDetail}
                  setSelectedShelterDetail={setSelectedShelterDetail}
                  citizens={citizens}
                  commandCenterTab={commandCenterTab}
                  setCommandCenterTab={setCommandCenterTab}
                  adminMapSearch={adminMapSearch}
                  setAdminMapSearch={setAdminMapSearch}
                  showRouteActive={showRouteActive}
                  setShowRouteActive={setShowRouteActive}
                  bookmarkedShelters={bookmarkedShelters}
                  setBookmarkedShelters={setBookmarkedShelters}
                  getShelterPhotos={getShelterPhotos}
                  broadcastZone={broadcastZone}
                  setBroadcastZone={setBroadcastZone}
                  manualLocations={manualLocations}
                  broadcastType={broadcastType}
                  setBroadcastType={setBroadcastType}
                  broadcastMessage={broadcastMessage}
                  setBroadcastMessage={setBroadcastMessage}
                  handleBroadcast={handleBroadcast}
                  isBroadcasting={isBroadcasting}
                  handleLocateSosOnMap={handleLocateSosOnMap}
                  handleDispatchRescue={handleDispatchRescue}
                  handleGoToShelterPage={handleGoToShelterPage}
                  toggleShelterCapacity={toggleShelterCapacity}
                  currentCoords={currentCoords}
                  adminMapZoom={adminMapZoom}
                  setAdminMapZoom={setAdminMapZoom}
                  adminMapType={adminMapType}
                  setAdminMapType={setAdminMapType}
                />
              )}
            </div>
          ) : adminView === 'hydrology' || adminView === 'dispatch' || adminView === 'shelter' || adminView === 'mutual-aid' ? (
            <div className="p-6 sm:p-8 lg:p-9 max-w-[1700px] mx-auto w-full pb-20 space-y-8 animate-[fadeIn_0.5s_ease-out]">
              <SciFiCommandCenter
                isDarkMode={isDarkMode}
                onShowToast={showToast}
                viewMode={adminView}
                onSetViewMode={setAdminView}
                selectedSectorId={selectedSectorId}
                onSelectSectorId={setSelectedSectorId}
                onEditShelter={handleOpenShelterEditModal}
                citizens={citizens}
                setCitizens={setCitizens}
                riverLevel={riverLevel}
                rainfall={rainfall}
                shelterSupplies={shelterSupplies}
                setShelterSupplies={setShelterSuppliesWithSync}
                isSirenActive={isSirenActive}
                setIsSirenActive={setIsSirenActiveWithSync}
                isLeveeDamDeployed={isLeveeDamDeployed}
                setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
              />
            </div>
          ) : (
            <ResidentDirectory isDarkMode={isDarkMode} glassCardClass={glassCardClass} citizens={citizens} setSelectedCitizenId={setSelectedCitizenId} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-10 px-4 transition-colors duration-700 ease-out font-sans antialiased selection:bg-[#0A84FF]/30
      ${isDarkMode ? 'bg-[#000] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#000] to-[#000]' : 'bg-[#f2f2f7]'}`}>

      <audio ref={audioRef} className="hidden" />

      <div
        className={`relative w-full max-w-[430px] h-[932px] rounded-[48px] overflow-hidden transition-all duration-700 flex flex-col z-10 animate-[fadeInUp_0.6s_ease-out] mobile-app-container
        ${isDarkMode ? 'bg-[#000]' : 'bg-[#f2f2f7]'}`}
        style={{ boxShadow: isDarkMode ? '0 0 0 14px #1a1a1c, 0 0 0 16px #333, 0 40px 80px -10px rgba(0, 0, 0, 1)' : '0 0 0 14px #fff, 0 0 0 16px #ddd, 0 40px 80px -10px rgba(0, 0, 0, 0.3)' }}
      >
        {/* Blinking Red Emergency Screen Border */}
        {(simulateStorm || aiStatus === t.critical) && (
          <div className="absolute inset-0 border-[6px] border-solid rounded-[48px] pointer-events-none z-[100] animate-emergency-blink"></div>
        )}
        <PushNotificationOverlay />
        <ToastOverlay />
        <DeleteConfirmationModalOverlay />
        <LanguageModalOverlay />
        <LocationModalOverlay />
        <UserProfileModalOverlay />
        <ShelterEditModalOverlay />
        <HazardModalOverlay />
        <JkmModalOverlay />
        <CitizenDetailsModalOverlay />
        {showAdminPin && (
          <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center animate-[fadeIn_0.2s_ease-out]">
            <div className={`w-[85%] rounded-[32px] p-6 shadow-2xl border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-black/10'}`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <Key size={20} className={isDarkMode ? 'text-white' : 'text-black'} />
                  <span className={`font-bold ${textPrimary}`}>Admin Override</span>
                </div>
                <button onClick={() => { setShowAdminPin(false); setAuthError(''); }}><X size={20} className="text-gray-500" /></button>
              </div>
              <form onSubmit={verifyAdminAccess}>
                <input
                  type="password" autoFocus required placeholder="Enter RBAC Code (FYP2026)"
                  className={`w-full h-[60px] px-5 rounded-2xl outline-none font-bold tracking-widest text-center border ${isDarkMode ? 'bg-black/50 border-white/20 text-white' : 'bg-gray-100 border-black/10 text-black'}`}
                  value={adminPin} onChange={(e) => setAdminPin(e.target.value)}
                />
                {authError && <p className="text-[#FF453A] text-xs font-bold text-center mt-3 animate-pulse">{authError}</p>}
                <button type="submit" className="w-full mt-4 h-[50px] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg">Verify Authority</button>
              </form>
            </div>
          </div>
        )}
        {(isAuthenticated && activeTab !== 'map' && appPhase !== 'recovery') && (<WeatherBackground isRaining={rainfall >= 1.0 || simulateStorm} isDarkMode={isDarkMode} aiStatus={aiStatus} />)}

        <div className={`absolute top-[200px] -left-[14px] w-[4px] h-[60px] rounded-l-lg z-0 ${isDarkMode ? 'bg-[#333]' : 'bg-[#ccc]'}`}></div>
        <div className={`absolute top-[280px] -left-[14px] w-[4px] h-[60px] rounded-l-lg z-0 ${isDarkMode ? 'bg-[#333]' : 'bg-[#ccc]'}`}></div>
        <div className={`absolute top-[240px] -right-[14px] w-[4px] h-[80px] rounded-r-lg z-0 ${isDarkMode ? 'bg-[#333]' : 'bg-[#ccc]'}`}></div>

        <div className={`absolute top-3 left-1/2 -translate-x-1/2 h-[36px] bg-black rounded-full z-[100] shadow-[inset_0_-2px_4px_rgba(255,255,255,0.15)] flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${islandExpanded ? 'w-[280px] px-5 py-2 h-[50px]' : 'w-[125px] px-3 justify-between group hover:w-[135px]'}`}>
          {!islandExpanded ? (
            <>
              <div className="w-3 h-3 rounded-full bg-black border-[0.5px] border-white/10"></div>
              <div className="flex space-x-2 items-center">
                {aiStatus === t.critical && isAuthenticated && !isLoadingApi && <div className="w-1.5 h-1.5 bg-[#FF453A] rounded-full animate-pulse shadow-[0_0_5px_#FF453A]"></div>}
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border-[0.5px] border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 bg-[#1a1a1a] rounded-full"></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3 w-full animate-[fadeIn_0.3s_ease-out_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
              <AlertTriangle size={16} className="text-[#FF453A]" />
              {/* Refactored custom bracket size */}
              <span className="text-white text-xs font-bold tracking-wide truncate">{islandMessage}</span>
            </div>
          )}
        </div>

        <div className={`absolute top-0 left-0 w-full h-14 flex justify-between items-center px-8 z-[90] pointer-events-none ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {/* Authentic iOS typography and clock */}
          <span className="text-[15px] font-sans font-semibold tracking-tight pt-[7px] drop-shadow-md select-none">
            9:41
          </span>
          {/* Authentic iOS top-right status indicators */}
          <div className="flex items-center space-x-[5px] pt-[7px] drop-shadow-md">
            {/* Cellular strength */}
            <div className="flex items-end space-x-[2px] h-[10.5px]">
              <div className="w-[3px] h-[3px] bg-current rounded-[0.8px]"></div>
              <div className="w-[3px] h-[5.5px] bg-current rounded-[0.8px]"></div>
              <div className="w-[3px] h-[8px] bg-current rounded-[0.8px]"></div>
              <div className="w-[3px] h-[10.5px] bg-current rounded-[0.8px]"></div>
            </div>
            {/* WiFi */}
            <svg width="17" height="11.5" viewBox="0 0 17 11.5" className="text-current" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 11C9.19036 11 9.75 10.4404 9.75 9.75C9.75 9.05964 9.19036 8.5 8.5 8.5C7.80964 8.5 7.25 9.05964 7.25 9.75C7.25 10.4404 7.80964 11 8.5 11Z" fill="currentColor" />
              <path d="M4.68652 5.93652C6.79611 3.82693 10.2039 3.82693 12.3135 5.93652" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M1.8584 3.1084C5.52695 -0.560156 11.473 -0.560156 15.1416 3.1084" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
            {/* Battery */}
            <div className="flex items-center space-x-[1px]">
              <div className="w-[24.5px] h-[11.5px] border-[1px] border-current rounded-[3.5px] p-[1.5px] flex items-center relative">
                <div className="h-full w-full bg-current rounded-[1.5px]"></div>
                <div className="w-[1.2px] h-[3.8px] bg-current rounded-r-[0.8px] absolute -right-[2.2px] top-[3.2px]"></div>
              </div>
            </div>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className={`absolute inset-0 overflow-y-auto px-6 pt-24 pb-8 flex flex-col no-scrollbar z-50 transition-colors duration-700 animate-[fadeIn_0.5s_ease-out] ${isDarkMode ? 'bg-[#000]' : 'bg-[#f2f2f7]'}`}>

            <div className="flex justify-end items-center gap-3 mb-4 relative z-10 animate-[fadeInUp_0.4s_ease-out]">
              {/* Beautiful Compact Neumorphic Language Slider */}
              <div
                className={`relative w-[150px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${isDarkMode
                  ? "bg-[#13151a] border-white/5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),_inset_-2px_-2px_6px_rgba(255,255,255,0.05)]"
                  : "bg-[#edf2f7] border-black/5 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-3px_-3px_7px_#ffffff]"
                  }`}
              >
                {/* Overlay 3-way touch zones */}
                <div className="absolute inset-0 flex z-30">
                  <button onClick={() => changeLanguage('ms')} className="flex-1 h-full outline-none" title="Set BM"></button>
                  <button onClick={() => changeLanguage('en')} className="flex-1 h-full outline-none" title="Set EN"></button>
                  <button onClick={() => changeLanguage('cn')} className="flex-1 h-full outline-none" title="Set CN"></button>
                </div>

                {/* Static background text labels */}
                <div className="absolute inset-0 px-3.5 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[10px] tracking-wider font-sans uppercase">
                  <span className={`transition-all duration-300 flex-1 text-center ${language === 'ms' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    BM
                  </span>
                  <span className={`transition-all duration-300 flex-1 text-center ${language === 'en' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    EN
                  </span>
                  <span className={`transition-all duration-300 flex-1 text-center ${language === 'cn' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    CN
                  </span>
                </div>

                {/* Neumorphic Sliding Knob */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${isDarkMode
                    ? "bg-[#1c2025] shadow-[3px_3px_6px_rgba(0,0,0,0.85),_-2px_-2px_6px_rgba(255,255,255,0.07)] text-[#FF9F0A]"
                    : "bg-[#f8fafc] shadow-[2.5px_2.5px_5px_#cbd5e1,_-2.5px_-2.5px_5px_#ffffff] text-[#0A84FF]"
                    }`}
                  style={{
                    transform: language === 'ms'
                      ? 'translateX(0px)'
                      : language === 'en'
                        ? 'translateX(55px)'
                        : 'translateX(110px)'
                  }}
                >
                  <span className="text-[10px] font-black uppercase font-sans tracking-wider">
                    {language === 'ms' ? 'BM' : language === 'en' ? 'EN' : 'CN'}
                  </span>
                </div>
              </div>

              {/* Beautiful Compact Neumorphic Theme Slider */}
              <div
                className={`relative w-[150px] h-[42px] rounded-full flex items-center p-1 cursor-pointer transition-all duration-500 overflow-hidden border select-none ${isDarkMode
                  ? "bg-[#13151a] border-white/5 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.8),_inset_-2px_-2px_6px_rgba(255,255,255,0.05)]"
                  : "bg-[#edf2f7] border-black/5 shadow-[inset_4px_4px_8px_#cbd5e1,_inset_-3px_-3px_7px_#ffffff]"
                  }`}
              >
                {/* Overlay 3-way touch zones */}
                <div className="absolute inset-0 flex z-30">
                  <button onClick={() => changeThemeMode('light')} className="flex-1 h-full outline-none" title="Set Light Theme"></button>
                  <button onClick={() => changeThemeMode('auto')} className="flex-1 h-full outline-none" title="Set Auto Theme"></button>
                  <button onClick={() => changeThemeMode('dark')} className="flex-1 h-full outline-none" title="Set Dark Theme"></button>
                </div>

                {/* Static background text labels */}
                <div className="absolute inset-0 px-3.5 flex items-center justify-between pointer-events-none select-none z-10 w-full font-black text-[10px] tracking-tight font-sans uppercase">
                  <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'light' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.themeLight}
                  </span>
                  <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'auto' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.themeAuto}
                  </span>
                  <span className={`transition-all duration-300 flex-1 text-center ${themeMode === 'dark' ? 'opacity-0 scale-90' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {t.themeDark}
                  </span>
                </div>

                {/* Neumorphic Sliding Knob */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform absolute top-[4px] left-[4px] z-20 ${isDarkMode
                    ? "bg-[#1c2025] shadow-[3px_3px_6px_rgba(0,0,0,0.85),_-2px_-2px_6px_rgba(255,255,255,0.07)] text-[#FF9F0A]"
                    : "bg-[#f8fafc] shadow-[2.5px_2.5px_5px_#cbd5e1,_-2.5px_-2.5px_5px_#ffffff] text-[#0A84FF]"
                    }`}
                  style={{
                    transform: themeMode === 'light'
                      ? 'translateX(0px)'
                      : themeMode === 'auto'
                        ? 'translateX(55px)'
                        : 'translateX(110px)'
                  }}
                >
                  {themeMode === 'light' ? (
                    <Sun size={15} strokeWidth={2.5} className="animate-[spin_12s_linear_infinite]" />
                  ) : themeMode === 'dark' ? (
                    <Moon size={15} strokeWidth={2.5} />
                  ) : (
                    <Clock size={15} strokeWidth={2.5} className="animate-[pulse_2s_ease-in-out_infinite]" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mt-2 mb-10 relative z-10 animate-[fadeInUp_0.5s_ease-out]">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] rounded-[32px] blur-xl opacity-50 transition-opacity duration-500"></div>
                <div className="relative w-28 h-28 rounded-[32px] bg-gradient-to-br from-[#FF453A] to-[#FF9F0A] flex items-center justify-center shadow-lg border border-white/10 mb-6">
                  <Waves size={52} className="text-white drop-shadow-md" strokeWidth={2.5} />
                </div>
              </div>
              {/* Standardized display typography to standard tailwind classes */}
              <h1 className={`text-4xl font-extrabold font-display tracking-tighter ${textPrimary} drop-shadow-sm leading-none`}>{t.appTitle}</h1>
              <p className={`text-base font-medium mt-2 ${textSecondary} tracking-widest uppercase`}>{t.subtitle}</p>
            </div>

            <div className={`p-8 rounded-[32px] shadow-lg ${glassCardClass} flex-1 flex flex-col justify-center relative z-10 animate-[fadeInUp_0.6s_ease-out] ${authError && !showAdminPin ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
              {/* Standardized header typography to text-2xl */}
              <h2 className={`text-2xl font-extrabold font-display tracking-tight mb-8 ${textPrimary} text-center`}>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className={`group flex items-center space-x-4 h-[60px] px-5 rounded-[20px] border transition-all duration-300 focus-within:ring-4 focus-within:ring-[#0A84FF]/20 ${authError && !showAdminPin ? 'border-[#FF453A]' : (isDarkMode ? 'bg-[#1C1C1E] border-white/10 focus-within:border-[#0A84FF]' : 'bg-white border-black/5 focus-within:border-[#0A84FF]')}`}>
                    <User size={22} className={`${textSecondary} group-focus-within:text-[#0A84FF] transition-colors`} />
                    {/* Standardized size to text-base */}
                    <input required type="text" placeholder="Full Name" className={`bg-transparent outline-none w-full h-full text-base font-medium ${textPrimary} placeholder:text-gray-500`} />
                  </div>
                )}
                <div className={`group flex items-center space-x-4 h-[60px] px-5 rounded-[20px] border transition-all duration-300 focus-within:ring-4 focus-within:ring-[#0A84FF]/20 ${authError && !showAdminPin ? 'border-[#FF453A]' : (isDarkMode ? 'bg-[#1C1C1E] border-white/10 focus-within:border-[#0A84FF]' : 'bg-white border-black/5 focus-within:border-[#0A84FF]')}`}>
                  <Mail size={22} className={`${textSecondary} group-focus-within:text-[#0A84FF] transition-colors`} />
                  {/* Standardized size to text-base */}
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className={`bg-transparent outline-none w-full h-full text-base font-medium ${textPrimary} placeholder:text-gray-500`} />
                </div>
                <div className={`group flex items-center space-x-4 h-[60px] px-5 rounded-[20px] border transition-all duration-300 focus-within:ring-4 focus-within:ring-[#0A84FF]/20 ${authError && !showAdminPin ? 'border-[#FF453A]' : (isDarkMode ? 'bg-[#1C1C1E] border-white/10 focus-within:border-[#0A84FF]' : 'bg-white border-black/5 focus-within:border-[#0A84FF]')}`}>
                  <Lock size={22} className={`${textSecondary} group-focus-within:text-[#0A84FF] transition-colors`} />
                  {/* Standardized size to text-base */}
                  <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`bg-transparent outline-none w-full h-full text-base font-medium ${textPrimary} placeholder:text-gray-500`} />
                </div>

                {authError && !showAdminPin && <p className="text-[#FF453A] text-xs font-bold text-center animate-[fadeIn_0.2s_ease-out]">{authError}</p>}

                <button type="submit" disabled={isAuthenticating} className="w-full h-[60px] mt-6 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(255,69,58,0.4)] disabled:opacity-70 border-t border-white/20 bg-gradient-to-b from-[#FF453A] to-[#D70015]">
                  {/* Standardized text-[18px] to text-base */}
                  {isAuthenticating ? <Loader2 size={24} className="animate-spin text-white" /> : <span className="text-white font-black text-base tracking-wide">Continue</span>}
                </button>
              </form>

              <div className="mt-6 space-y-3">
                <div className="relative flex items-center py-2">
                  <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-500/20' : 'border-gray-300'}`}></div>
                  <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-bold uppercase tracking-widest">Or login with</span>
                  <div className={`flex-grow border-t ${isDarkMode ? 'border-gray-500/20' : 'border-gray-300'}`}></div>
                </div>
                <div className="flex space-x-3">
                  <button type="button" onClick={handleAppleLogin} className={`flex-1 py-3.5 rounded-[16px] flex items-center justify-center space-x-2 transition-transform active:scale-95 border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-sm'}`}>
                    <AppleIcon size={20} />
                  </button>
                  <button type="button" onClick={handleGoogleLogin} className={`flex-1 py-3.5 rounded-[16px] flex items-center justify-center space-x-2 transition-transform active:scale-95 border ${isDarkMode ? 'bg-[#1C1C1E] border-white/10 text-white' : 'bg-white border-black/10 text-black shadow-sm'}`}>
                    <GoogleIcon size={20} />
                  </button>
                </div>
              </div>

              {/* Standardized text-[13px] to text-xs */}
              <p className="mt-6 text-center text-xs font-bold text-gray-500">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); }} className="text-[#0A84FF] hover:underline">
                  {authMode === 'login' ? 'Create Account' : 'Log In'}
                </button>
              </p>

              <div className="mt-6 pt-6 text-center relative z-10 border-t border-gray-500/20">
                {/* Standardized size to text-xs tracking-wider */}
                <button onClick={() => { setAuthError(''); setShowAdminPin(true); }} className={`text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 w-full transition-opacity hover:opacity-70 ${textSecondary}`}>
                  <LockKeyhole size={14} /><span>Access Admin Console</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full relative overflow-hidden">

            {activeTab === 'home' && (
              <MobileHomePage
                isDarkMode={isDarkMode}
                currentLocation={currentLocation}
                simulateStorm={simulateStorm}
                appPhase={appPhase}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                handleTabChange={handleTabChange}
                riverLevel={riverLevel}
                rainfall={rainfall}
                activeAlertCount={activeAlertCount}
                sosRequests={sosRequests}
                citizens={citizens}
                isVolunteerMode={isVolunteerMode}
                setIsVolunteerMode={setIsVolunteerMode}
                handleAcceptRescue={handleAcceptRescue}
                handleUpdateMissionStatus={handleUpdateMissionStatus}
                handleCancelMySos={handleCancelMySos}
                hourlyRainList={hourlyRainList}
                hourlyProbList={hourlyProbList}
                hourlyTempList={hourlyTempList}
                hourlyWeatherCodeList={hourlyWeatherCodeList}
                liveTemp={liveTemp}
                liveWeatherCode={liveWeatherCode}
                liveHumidity={liveHumidity}
                liveWindSpeed={liveWindSpeed}
                t={t}
                aiStatus={aiStatus}
                showToast={showToast}
                soundBeep={soundBeep}
                activeMissions={activeMissions}
                setAppPhase={setAppPhase}
                setShowHazardModal={setShowHazardModal}
                setShowJkmModal={setShowJkmModal}
                isSirenActive={isSirenActive}
                isLeveeDamDeployed={isLeveeDamDeployed}
                setIsSirenActive={setIsSirenActiveWithSync}
                setIsLeveeDamDeployed={setIsLeveeDamDeployedWithSync}
                systemRed={systemRed}
                systemAmber={systemAmber}
                systemGreen={systemGreen}
                visualTab={visualTab}
                chartDisplayMode={chartDisplayMode}
                setChartDisplayMode={setChartDisplayMode}
                currentPoint={currentPoint}
                currentImpact={currentImpact}
                setAuthError={setAuthError}
                setShowAdminPin={setShowAdminPin}
                myActiveSos={myActiveSos}
                user={user}
                acceptingId={acceptingId}
                profileName={profileName}
                scrubHour={scrubHour}
                setScrubHour={setScrubHour}
              />
            )}

            {activeTab === 'map' && (
              <MobileMapPage
                isDarkMode={isDarkMode}
                currentLocation={currentLocation}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                baseShelters={baseShelters}
                simulateStorm={simulateStorm}
                rainfall={rainfall}
                riverLevel={riverLevel}
                mapSearchQuery={mapSearchQuery}
                setMapSearchQuery={setMapSearchQuery}
                interactiveMapShelterId={interactiveMapShelterId}
                setInteractiveMapShelterId={setInteractiveMapShelterId}
                mapSearchResults={mapSearchResults}
                setMapSearchResults={setMapSearchResults}
                setCurrentLocation={setCurrentLocation}
                setCurrentCoords={setCurrentCoords}
                setLocationMode={setLocationMode}
                setShowHazardModal={setShowHazardModal}
                showCycloneOverlay={showCycloneOverlay}
                setShowCycloneOverlay={setShowCycloneOverlay}
                travelMode={travelMode}
                setTravelMode={setTravelMode}
                showAllCentersOnMap={showAllCentersOnMap}
                setShowAllCentersOnMap={setShowAllCentersOnMap}
                handleStartNavigation={handleStartNavigation}
                showRouteSteps={showRouteSteps}
                setShowRouteSteps={setShowRouteSteps}
                shelterTagFilter={shelterTagFilter}
                setShelterTagFilter={setShelterTagFilter}
                getShelterOccupancy={getShelterOccupancy}
                showToast={showToast}
                isVolunteerMode={isVolunteerMode}
                isSirenActive={isSirenActive}
                isLeveeDamDeployed={isLeveeDamDeployed}
                sosRequests={sosRequests}
                activeMissions={activeMissions}
                myActiveSosRequest={myActiveSos}
                citizens={citizens}
                soundBeep={soundBeep}
                mapViewType={mapViewType}
                aiStatus={aiStatus}
                appPhase={appPhase}
                currentCoords={currentCoords}
                activeShelter={activeShelter}
                showHazardsOverlay={showHazardsOverlay}
                globalHazards={globalHazards}
                isSearchingMap={isSearchingMap}
                addLog={addLog}
                triggerSos={triggerSos}
                getTravelTime={getTravelTime}
              />
            )}

            {activeTab === 'community' && (
              <MobileCommunityPage
                isDarkMode={isDarkMode}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                selectedCommunityId={selectedCommunityId}
                setSelectedCommunityId={setSelectedCommunityId}
                selectedDetailTab={selectedDetailTab}
                setSelectedDetailTab={setSelectedDetailTab}
                myCommunitiesSubTab={myCommunitiesSubTab}
                setMyCommunitiesSubTab={setMyCommunitiesSubTab}
                newPostText={newPostText}
                setNewPostText={setNewPostText}
                newPostImage={newPostImage}
                setNewPostImage={setNewPostImage}
                handleCommunityImage={handleCommunityImage}
                composerCommunityId={composerCommunityId}
                setComposerCommunityId={setComposerCommunityId}
                handlePostCommunity={handlePostCommunity}
                handleToggleUpvote={handleToggleUpvote}
                handleDeletePost={handleDeletePost}
                communityDetailsAccordionOpen={communityDetailsAccordionOpen}
                setCommunityDetailsAccordionOpen={setCommunityDetailsAccordionOpen}
                handleCommunityCheckin={handleCommunityCheckin}
                mutualAidLedger={mutualAidLedger}
                setMutualAidLedger={setMutualAidLedger}
                newAidType={newAidType}
                setNewAidType={setNewAidType}
                newAidItem={newAidItem}
                setNewAidItem={setNewAidItem}
                newAidLoc={newAidLoc}
                setNewAidLoc={setNewAidLoc}
                newAidDesc={newAidDesc}
                setNewAidDesc={setNewAidDesc}
                handleAddAidLedgerItem={handleAddAidLedgerItem}
                communityPosts={communityPosts}
                showToast={showToast}
                profileName={profileName}
                fetchLiveLocation={fetchLiveLocation}
                currentLocation={currentLocation}
                ALL_COMMUNITIES={ALL_COMMUNITIES}
                SEED_POSTS={SEED_POSTS}
                deletedPostIds={deletedPostIds}
                upvotedPostIds={upvotedPostIds}
                user={user}
                isAdmin={isAdmin}
                communityCheckinStats={communityCheckinStats}
                userCheckinStates={userCheckinStates}
              />
            )}

            {activeTab === 'alerts' && (
              <MobileAlertsPage
                isDarkMode={isDarkMode}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                sosRequests={sosRequests}
                isGeneratingPlan={isGeneratingPlan}
                handleGenerateActionPlan={handleGenerateActionPlan}
                handleListenToSatLinkVoice={handleListenToSatLinkVoice}
                handleQuickQuestion={handleQuickQuestion}
                residentActionPlan={residentActionPlan}
                checkedCount={checkedCount}
                checklist={checklist}
                toggleCheck={toggleCheck}
                isPlayingAudio={isPlayingAudio}
                isPreparingVoice={isPreparingVoice}
                globalAlerts={visibleAlerts}
                dynamicAccentColor={dynamicAccentColor}
                aiStatus={aiStatus}
                currentLocation={currentLocation}
                timeToCritical={timeToCritical}
                onDismissAlert={handleDismissAlert}
              />
            )}

            {activeTab === 'settings' && (
              <MobileSettingsPage
                isDarkMode={isDarkMode}
                glassCardClass={glassCardClass}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                t={t}
                currentLocation={currentLocation}
                profileName={profileName}
                profileEmail={profileEmail}
                profileCountry={profileCountry}
                profilePhone={profilePhone}
                profileAvatar={profileAvatar}
                setTempProfileName={setTempProfileName}
                setTempProfileEmail={setTempProfileEmail}
                setTempProfileCountry={setTempProfileCountry}
                setTempProfilePhone={setTempProfilePhone}
                setTempProfileAvatar={setTempProfileAvatar}
                setShowProfileEditModal={setShowProfileEditModal}
                locationMode={locationMode}
                setLocationMode={setLocationMode}
                fetchLiveLocation={fetchLiveLocation}
                setShowLocationModal={setShowLocationModal}
                handleLogout={handleLogout}
                isSirenActive={isSirenActive}
                isLeveeDamDeployed={isLeveeDamDeployed}
                setIsSirenActiveWithSync={setIsSirenActiveWithSync}
                setIsLeveeDamDeployedWithSync={setIsLeveeDamDeployedWithSync}
                setAuthError={setAuthError}
                setShowAdminPin={setShowAdminPin}
                simulateStorm={simulateStorm}
                rainfall={rainfall}
                riverLevel={riverLevel}
                showToast={showToast}
                soundBeep={soundBeep}
                language={language}
                setLanguage={setLanguage}
                systemRed={systemRed}
                systemAmber={systemAmber}
                systemGreen={systemGreen}
                changeLanguage={changeLanguage}
                themeMode={themeMode}
                changeThemeMode={changeThemeMode}
                toggleNotifications={toggleNotifications}
                notificationsEnabled={notificationsEnabled}
                toggleSimulateStorm={toggleSimulateStorm}
              />
            )}

            <div className="absolute bottom-6 left-4 right-4 z-[80] animate-[fadeInUp_0.8s_ease-out]">
              <div
                ref={tabBarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`relative grid grid-cols-5 gap-1 px-3 py-2.5 rounded-[32px] shadow-2xl border ${glassCardClass} ${isDarkMode ? 'border-white/10 !bg-[#121214]/95' : 'border-black/5 !bg-white/95'} backdrop-blur-3xl select-none touch-none ${isSliding ? 'cursor-grabbing' : 'cursor-grab'}`}
              >

                {/* Single persistent sliding Liquid Glass Indicator */}
                <motion.div
                  className="absolute top-2.5 bottom-2.5 rounded-[20px] -z-10"
                  animate={{
                    x: `${['home', 'map', 'community', 'alerts', 'settings'].indexOf(visualTab) * 100}%`,
                    scaleX: isSliding ? 1.08 : 1.00,
                    scaleY: isSliding ? 0.94 : 1.00,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: isSliding ? 450 : 330,
                    damping: isSliding ? 27 : 23,
                    mass: 0.66
                  }}
                  style={{
                    width: 'calc((100% - 24px) / 5)', // PX-3 padding is 12px * 2 = 24px
                    left: '12px', // matches PX-3 padding
                    background: isDarkMode
                      ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)'
                      : 'linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0.02) 100%)',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(0, 0, 0, 0.09)',
                    boxShadow: isDarkMode
                      ? 'inset 0 1px 2px rgba(255, 255, 255, 0.3), 0 8px 18px rgba(0, 0, 0, 0.45), 0 0 16px rgba(255, 255, 255, 0.03)'
                      : 'inset 0 1px 2px rgba(255, 255, 255, 0.75), 0 8px 18px rgba(0, 0, 0, 0.07), 0 0 16px rgba(0, 0, 0, 0.01)'
                  }}
                >
                  <div className="absolute inset-0 rounded-[20px] bg-gradient-to-b from-white/14 to-transparent pointer-events-none" />
                </motion.div>

                {/* Home Tab Button */}
                <button onClick={() => handleTabChange('home')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <Home size={22} strokeWidth={visualTab === 'home' ? 2.5 : 2} style={{ color: visualTab === 'home' ? dynamicAccentColor : undefined }} className={`${visualTab === 'home' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'home' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'home' ? dynamicAccentColor : undefined }}>{t.home}</span>
                </button>

                {/* Map Tab Button */}
                <button onClick={() => handleTabChange('map')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <MapIcon size={22} strokeWidth={visualTab === 'map' ? 2.5 : 2} style={{ color: visualTab === 'map' ? dynamicAccentColor : undefined }} className={`${visualTab === 'map' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'map' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'map' ? dynamicAccentColor : undefined }}>{t.map}</span>
                </button>

                {/* Community Tab Button */}
                <button onClick={() => handleTabChange('community')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <MessageSquare size={22} strokeWidth={visualTab === 'community' ? 2.5 : 2} style={{ color: visualTab === 'community' ? dynamicAccentColor : undefined }} className={`${visualTab === 'community' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'community' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'community' ? dynamicAccentColor : undefined }}>Comm</span>
                </button>

                {/* Alerts Tab Button */}
                <button onClick={() => handleTabChange('alerts')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <div className="relative">
                    <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-[1.5px] transition-all ${hasUnreadAlerts ? 'scale-100 animate-pulse' : 'scale-0'} ${isDarkMode ? 'border-[#121214]' : 'border-white'}`} style={{ backgroundColor: systemRed }}></div>
                    <Bell size={22} strokeWidth={visualTab === 'alerts' ? 2.5 : 2} style={{ color: visualTab === 'alerts' ? dynamicAccentColor : undefined }} className={`${visualTab === 'alerts' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  </div>
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'alerts' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'alerts' ? dynamicAccentColor : undefined }}>{t.alerts}</span>
                </button>

                {/* Settings Tab Button */}
                <button onClick={() => handleTabChange('settings')} className="relative flex flex-col items-center justify-center py-2 px-1 rounded-[22px] transition-all duration-300 active:scale-95 opacity-90 min-w-0 w-full overflow-hidden">
                  <Settings size={22} strokeWidth={visualTab === 'settings' ? 2.5 : 2} style={{ color: visualTab === 'settings' ? dynamicAccentColor : undefined }} className={`${visualTab === 'settings' ? (isDarkMode ? 'text-white' : 'text-black') : textSecondary} transition-transform duration-300`} />
                  <span className={`text-[10px] mt-0.5 font-bold tracking-wider uppercase transition-colors truncate w-full text-center ${visualTab === 'settings' ? (isDarkMode ? 'text-white font-black' : 'text-[#0A84FF] font-black') : textSecondary}`} style={{ color: visualTab === 'settings' ? dynamicAccentColor : undefined }}>{t.settings}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(50,215,75,0.3); border-radius: 4px; }
        
        .timeline-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(128, 128, 128, 0.25);
          border-radius: 4px;
          outline: none;
        }
        .timeline-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: var(--thumb-color, #0A84FF);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.4);
          cursor: grab;
          transition: transform 0.1s, background-color 0.3s;
        }
        .timeline-slider::-webkit-slider-thumb:active {
          transform: scale(1.15);
          cursor: grabbing;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes loadingBar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
        @keyframes backgroundRainfall {
          0% { transform: translateY(-10%) rotate(15deg); }
          100% { transform: translateY(120vh) rotate(15deg); }
        }
      `}</style>
    </div>
  );
}