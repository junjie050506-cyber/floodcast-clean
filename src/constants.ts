export const i18n = {
  en: {
    appTitle: "FloodCast", subtitle: "Early Warning System",
    home: "Home", map: "Map", community: "Community", alerts: "Alerts", settings: "Settings",
    safe: "SAFE", warning: "WARNING", critical: "CRITICAL",
    safeDesc: "Normal conditions. No flood risk detected.",
    warnDesc: "Water levels rising. Prepare for potential alerts.",
    critDesc: "LEVEL 3: IMMINENT EVACUATION. PROCEED TO SHELTER IMMEDIATELY.",
    radarSys: "Evac Radar System", navTo: "Nav to", sos: "S.O.S EMERGENCY", sosSent: "SIGNAL BROADCASTED", sosDispatched: "RESCUE IS ON THE WAY!",
    demoMode: "System Overrides (FYP Demo)", simStorm: "Simulate Storm", simRecovery: "Simulate Recovery Phase", fetchLoc: "Location",
    prefs: "Preferences", darkMode: "Dark Mode", pushAlerts: "Push Alerts", lang: "Language (BM/EN/CN)", logout: "Log Out",
    latency: "Latency", rawDepth: "Raw Depth", hardwareStatus: "Hardware Telemetry",
    evacNow: "EVACUATE NOW.", criticalMsg: "Critical overflow in", proceedShelter: "Proceed immediately to designated shelters.",
    volunteerMode: "Volunteer Responder Mode", activeMissions: "Active Rescue Missions", acceptTask: "Accept & Navigate",
    shelterFull: "SHELTER FULL", rerouting: "Rerouting to nearest available shelter...",
    checklistTitle: "Go-Bag", checkDoc: "ID & Docs", checkMed: "Meds & Care", checkPower: "Powerbank", checkFlash: "Flashlight", checkWater: "Water & Food", packed: "Packed",
    rainLabel: "Rainfall", riverLabel: "River Level", evacNotReq: "Evac Not Required", viewRoutes: "View Safe Routes",
    postCommunity: "Share an update with your zone...", postBtn: "Post"
  },
  ms: {
    appTitle: "Sistem FloodCast", subtitle: "Sistem Amaran Awal",
    home: "Utama", map: "Peta", community: "Komuniti", alerts: "Amaran", settings: "Tetapan",
    safe: "SELAMAT", warning: "WASPADA", critical: "BAHAYA",
    safeDesc: "Keadaan normal. Tiada risiko banjir dikesan.",
    warnDesc: "Paras air meningkat. Bersedia untuk amaran.",
    critDesc: "TAHAP 3: PEMINDAHAN SEGERA. PERGI KE PUSAT PEMINDAHAN.",
    radarSys: "Sistem Radar Pemindahan", navTo: "Navigasi", sos: "KECEMASAN S.O.S", sosSent: "ISYARAT DIHANTAR", sosDispatched: "BANTUAN DALAM PERJALANAN!",
    demoMode: "Kawalan Sistem (Demo FYP)", simStorm: "Simulasi Ribut", simRecovery: "Simulasi Fasa Pemulihan", fetchLoc: "Lokasi",
    prefs: "Tetapan", darkMode: "Mod Gelap", pushAlerts: "Notifikasi Amaran", lang: "Bahasa (BM/EN/CN)", logout: "Log Keluar",
    latency: "Kependaman", rawDepth: "Kedalaman", hardwareStatus: "Telemetri Perkakasan",
    evacNow: "PINDAH SEKARANG.", criticalMsg: "Banjir kritikal dalam", proceedShelter: "Pergi ke pusat pemindahan segera.",
    volunteerMode: "Mod Sukarelawan", activeMissions: "Misi Menyelamat Aktif", acceptTask: "Terima & Arah Bantuan",
    shelterFull: "PUSAT PENUH", rerouting: "Mencari pusat pemindahan alternatif...",
    checklistTitle: "Beg Kecemasan", checkDoc: "Pasport & IC", checkMed: "Ubat & Peti", checkPower: "Powerbank", checkFlash: "Lampu Suluh", checkWater: "Air & Makanan", packed: "Selesai",
    rainLabel: "Hujan", riverLabel: "Paras Air", evacNotReq: "Selamat", viewRoutes: "Lihat Laluan",
    postCommunity: "Kongsi maklumat dengan zon anda...", postBtn: "Hantar"
  },
  cn: {
    appTitle: "FloodCast", subtitle: "早期预警系统",
    home: "主页", map: "地图", community: "社区", alerts: "警报", settings: "设置",
    safe: "安全", warning: "警告", critical: "危险",
    safeDesc: "状况正常。未检测到洪水风险。",
    warnDesc: "水位上升。请为潜在警报做好准备。",
    critDesc: "3级：即将撤离。请立即前往避难所。",
    radarSys: "撤离雷达系统", navTo: "导航至", sos: "S.O.S 紧急情况", sosSent: "信号已发送", sosDispatched: "救援已在路上！",
    demoMode: "系统覆盖 (FYP 演示)", simStorm: "模拟风暴", simRecovery: "模拟恢复阶段", fetchLoc: "位置",
    prefs: "偏好设置", darkMode: "深色模式", pushAlerts: "推送警报", lang: "语言 (BM/EN/CN)", logout: "登出",
    latency: "延迟", rawDepth: "原始深度", hardwareStatus: "硬件遥测",
    evacNow: "立即撤离。", criticalMsg: "严重溢出剩余", proceedShelter: "请立即前往指定的避难所。",
    volunteerMode: "志愿者响应模式", activeMissions: "活跃的救援任务", acceptTask: "接受并导航",
    shelterFull: "避难所已满", rerouting: "正在重新规划至最近的可用避难所...",
    checklistTitle: "应急包", checkDoc: "证件与文档", checkMed: "急救药品", checkPower: "充电宝", checkFlash: "手电筒", checkWater: "饮水食物", packed: "已打包",
    rainLabel: "降雨量", riverLabel: "水位", evacNotReq: "无需撤离", viewRoutes: "查看安全路线",
    postCommunity: "与您所在区域分享更新...", postBtn: "发布"
  }
};

export const baseShelters = [
  { id: 'kotadamansara', name: 'PPS Dewan MBPJ Kota Damansara', zone: 'SEGi University Kota Damansara', distance: '0.4 KM', time: 'Est. 1 min', address: 'Jalan Teknologi, PJU 5, Kota Damansara, PJ', maxCapacity: 550, x: 44, y: 44 },
  { id: 'petalingjaya', name: 'PPS Dewan MBPJ Seksyen 7', zone: 'Petaling Jaya', distance: '12.5 KM', time: 'Est. 16 mins', address: 'Petaling Jaya West', maxCapacity: 600, x: 35, y: 65 },
  { id: 'subangjaya', name: 'PPS Dewan MPSJ SS15', zone: 'Subang Jaya', distance: '14.5 KM', time: 'Est. 18 mins', address: 'Subang Jaya Sector', maxCapacity: 700, x: 32, y: 72 },
  { id: 'kualalumpur', name: 'PPS Dewan Komuniti KL', zone: 'Kuala Lumpur', distance: '20.2 KM', time: 'Est. 25 mins', address: 'Kuala Lumpur Central', maxCapacity: 1000, x: 55, y: 55 },
  { id: 'shahalam', name: 'PPS Dewan MBSA Seksyen 4', zone: 'Shah Alam', distance: '20.8 KM', time: 'Est. 24 mins', address: 'Dewan MBSA Seksyen 4, Shah Alam', maxCapacity: 800, x: 30, y: 70 },
  { id: 'batucaves', name: 'PPS Dewan Beringin', zone: 'Batu Caves', distance: '21.5 KM', time: 'Est. 22 mins', address: 'Batu Caves, Selangor', maxCapacity: 350, x: 50, y: 50 },
  { id: 'klang', name: 'PPS MPK Klang', zone: 'Klang', distance: '29.2 KM', time: 'Est. 32 mins', address: 'Klang, Selangor', maxCapacity: 400, x: 15, y: 85 },
  { id: 'rawang', name: 'PPS SMK Seri Garing', zone: 'Rawang', distance: '30.5 KM', time: 'Est. 30 mins', address: 'SMK Seri Garing, Rawang', maxCapacity: 500, x: 45, y: 40 },
  { id: 'huluselangor', name: 'PPS SK Bukit Beruntung', zone: 'Hulu Selangor', distance: '43.5 KM', time: 'Est. 38 mins', address: 'Bukit Beruntung', maxCapacity: 600, x: 40, y: 25 },
  { id: 'johorbahru', name: 'PPS Dewan MBJB Taman Johor', zone: 'Johor Bahru', distance: '340 KM', time: 'Est. 3 hrs 35 mins', address: 'Johor Bahru Straits', maxCapacity: 750, x: 75, y: 90 },
  { id: 'penang', name: 'PPS Dewan JKKK George Town', zone: 'Penang', distance: '348 KM', time: 'Est. 3 hrs 45 mins', address: 'Penang Island Delta', maxCapacity: 500, x: 25, y: 15 }
];

export const mockCitizens = [
  { id: 'UID-001', name: 'Ahmad bin Yusuf', phone: '+60 12-345 6789', zone: 'Rawang', status: 'SAFE', ping: '2 mins ago' },
  { id: 'UID-002', name: 'Mei Ling', phone: '+60 17-987 6543', zone: 'Shah Alam', status: 'EVACUATED', ping: '1 hr ago' },
  { id: 'UID-003', name: 'Siti Nurhaliza', phone: '+60 11-112 2334', zone: 'Rawang', status: 'SOS PENDING', ping: 'Just now' },
  { id: 'UID-004', name: 'John Doe', phone: '+60 19-888 7777', zone: 'Klang', status: 'SAFE', ping: '5 mins ago' },
  { id: 'UID-005', name: 'Ali Rahman', phone: '+60 13-444 5555', zone: 'Hulu Selangor', status: 'SAFE', ping: '10 mins ago' },
  { id: 'UID-006', name: 'Wong Kah Wei', phone: '+60 16-222 3333', zone: 'Klang', status: 'SAFE', ping: '15 mins ago' },
  { id: 'UID-007', name: 'Raju Subramaniam', phone: '+60 14-999 8888', zone: 'Batu Caves', status: 'EVACUATED', ping: '2 hrs ago' },
  { id: 'UID-008', name: 'Fatimah Awang', phone: '+60 19-383 4901', zone: 'Shah Alam', status: 'SAFE', ping: 'Just now' },
  { id: 'UID-009', name: 'Tan Kah Kee', phone: '+60 11-2345 6789', zone: 'Kuala Lumpur', status: 'SAFE', ping: '8 mins ago' },
  { id: 'UID-010', name: 'Lim Goh Tong', phone: '+60 17-555 4433', zone: 'Petaling Jaya', status: 'SAFE', ping: '12 mins ago' },
  { id: 'UID-011', name: 'Aswad bin Bakri', phone: '+60 19-223 4455', zone: 'Subang Jaya', status: 'SAFE', ping: '14 mins ago' },
  { id: 'UID-012', name: 'Lee Chong Wei', phone: '+60 12-888 9999', zone: 'Penang', status: 'SAFE', ping: '20 mins ago' },
  { id: 'UID-013', name: 'Siti Saleha', phone: '+60 13-777 6655', zone: 'Johor Bahru', status: 'SAFE', ping: '30 mins ago' }
];
