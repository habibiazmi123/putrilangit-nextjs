export type Locale = "id" | "en";
export type Translation = readonly [string, string];
export const translate = (text: Translation, locale: Locale) => text[locale === "id" ? 0 : 1];
export const phone = "6281386929285";
export const email = "putrilangitsukses@gmail.com";
export const address = "Menteng Niaga Blok Collins 1 No. 26, Jakarta Timur";
export const website = "https://putrilangitsukses.com";
export const whatsapp = (message: string) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const categories: { id: string; title: Translation; description: Translation }[] = [
    {
        id: "hvac",
        title: ["Sistem HVAC", "HVAC Systems"],
        description: [
            "Sirkulasi air yang stabil untuk kenyamanan dan efisiensi sistem tata udara.",
            "Reliable water circulation for comfortable, efficient heating and cooling.",
        ],
    },
    {
        id: "plumbing",
        title: ["Plumbing & Booster", "Plumbing & Booster"],
        description: [
            "Suplai, transfer, dan tekanan air yang konsisten untuk setiap kebutuhan bangunan.",
            "Consistent water supply, transfer, and pressure for every building.",
        ],
    },
    {
        id: "drainage",
        title: ["Drainase & Limbah", "Drainage & Wastewater"],
        description: [
            "Penanganan air drainase dan limbah untuk operasional yang andal.",
            "Dependable drainage and wastewater handling for reliable operations.",
        ],
    },
    {
        id: "fire",
        title: ["Fire Fighting", "Fire Fighting"],
        description: [
            "Pilihan sistem pompa untuk kebutuhan proteksi kebakaran.",
            "Pumping systems for your fire protection requirements.",
        ],
    },
];

export const products: {
    name: string;
    image: string;
    category: string;
    type: Translation;
    range?: string;
}[] = [
    {
        name: "Wilo–Atmos GIGA-N",
        image: "atmos-giga-n",
        category: "hvac",
        type: ["Pompa end-suction", "End-suction pump"],
    },
    {
        name: "Wilo–MISO",
        image: "miso",
        category: "hvac",
        type: ["Pompa sentrifugal", "Centrifugal pump"],
    },
    {
        name: "Wilo–SCP",
        image: "scp",
        category: "hvac",
        type: ["Pompa split-case", "Split-case pump"],
    },
    {
        name: "Wilo–Atmos GIGA-I",
        image: "atmos-giga-i",
        category: "hvac",
        type: ["Pompa inline", "Inline pump"],
    },
    {
        name: "Wilo–TWI",
        image: "twi",
        category: "plumbing",
        type: ["Pompa submersible", "Submersible pump"],
    },
    {
        name: "Wilo–Helix FIRST V / Helix V",
        image: "helix",
        category: "plumbing",
        type: ["Pompa multistage vertikal", "Vertical multistage pump"],
    },
    {
        name: "Wilo–Economy MHI",
        image: "economy-mhi",
        category: "plumbing",
        type: ["Pompa multistage horizontal", "Horizontal multistage pump"],
    },
    {
        name: "Wilo–Ring Section",
        image: "ring-section",
        category: "plumbing",
        type: ["Pompa ring-section", "Ring-section pump"],
    },
    {
        name: "Wilo–Economy CO-MHI",
        image: "economy-co",
        category: "plumbing",
        type: ["Sistem booster", "Booster system"],
    },
    {
        name: "Wilo–Comfort-Vario COR MHIE/ECe",
        image: "comfort-vario",
        category: "plumbing",
        type: ["Sistem booster", "Booster system"],
    },
    {
        name: "Wilo–SiBoost Smart Helix V / VE",
        image: "siboost",
        category: "plumbing",
        type: ["Sistem booster cerdas", "Smart booster system"],
    },
    ...[
        ["Drainage Pump", "drainage"],
        ["Vortex Pump", "vortex"],
        ["Cutter Sewage Pump", "cutter"],
        ["Drainage (DP-CI) Pump", "dp-ci"],
        ["Sewage Pump", "sewage"],
        ["Grinder Pump", "grinder"],
    ].map(([name, image]) => ({
        name,
        image,
        category: "drainage",
        type: ["Drainase & air limbah", "Drainage & wastewater"] as Translation,
    })),
    {
        name: "Pumpset – End Suction",
        image: "fire-end",
        category: "fire",
        type: ["Sistem proteksi kebakaran", "Fire protection system"],
        range: "500–1,000 USGPM",
    },
    {
        name: "Pumpset – Split Case",
        image: "fire-split",
        category: "fire",
        type: ["Sistem proteksi kebakaran", "Fire protection system"],
        range: "500–6,000 USGPM",
    },
    {
        name: "Pumpset – Vertical Turbine",
        image: "fire-turbine",
        category: "fire",
        type: ["Sistem proteksi kebakaran", "Fire protection system"],
        range: "500–6,000 USGPM",
    },
    {
        name: "Wilo–FirePack",
        image: "firepack",
        category: "fire",
        type: ["Paket pompa kebakaran", "Packaged fire pump"],
    },
    {
        name: "Wilo–ContainerizedFirePack",
        image: "container-firepack",
        category: "fire",
        type: ["Paket dalam kontainer", "Containerized fire pump"],
    },
    {
        name: "Wilo–Mobile Fire Pump",
        image: "mobile-fire",
        category: "fire",
        type: ["Pompa kebakaran bergerak", "Mobile fire pump"],
    },
    {
        name: "Pumpset – Split Case · 500–2,500 USGPM",
        image: "fire-split-compact",
        category: "fire",
        type: ["Sistem proteksi kebakaran", "Fire protection system"],
        range: "500–2,500 USGPM",
    },
    {
        name: "Pumpset – Vertical Turbine · 500–4,000 USGPM",
        image: "fire-turbine-compact",
        category: "fire",
        type: ["Sistem proteksi kebakaran", "Fire protection system"],
        range: "500–4,000 USGPM",
    },
];

export const services: { title: string; description: Translation; items: Translation[] }[] = [
    {
        title: "Pump Service & Overhaul",
        description: [
            "Kembalikan performa dan keandalan sistem perpompaan Anda.",
            "Restore the performance and reliability of your pumping system.",
        ],
        items: [
            ["Rewinding dinamo", "Motor rewinding"],
            ["Penggantian mechanical seal", "Mechanical seal replacement"],
            ["Penggantian bearing", "Bearing replacement"],
            ["Shaft alignment", "Shaft alignment"],
            ["Impeller balancing", "Impeller balancing"],
            ["Performance testing", "Performance testing"],
        ],
    },
    {
        title: "HVAC & AC Services",
        description: [
            "Perawatan AC komersial dan industri untuk kenyamanan yang terjaga.",
            "Commercial and industrial AC maintenance for consistent comfort.",
        ],
        items: [
            ["Preventive maintenance", "Preventive maintenance"],
            ["Chemical cleaning", "Chemical cleaning"],
            ["Perbaikan kompresor", "Compressor repair"],
            ["Pengisian refrigeran", "Refrigerant charging"],
            ["Airflow balancing", "Airflow balancing"],
        ],
    },
    {
        title: "Central AC / VRV / VRF",
        description: [
            "Penanganan menyeluruh untuk sistem tata udara terpusat.",
            "Comprehensive care for central air conditioning systems.",
        ],
        items: [
            ["Troubleshooting", "Troubleshooting"],
            ["Perawatan indoor & outdoor", "Indoor & outdoor maintenance"],
            ["Pemeriksaan control board", "Control board inspection"],
            ["Optimalisasi energi", "Energy optimization"],
        ],
    },
    {
        title: "Installation & Commissioning",
        description: [
            "Dari pemasangan hingga pengujian, siap untuk beroperasi.",
            "From installation to testing, ready for operation.",
        ],
        items: [
            ["Instalasi pompa", "Pump installation"],
            ["Alignment pompa–motor", "Pump–motor alignment"],
            ["Pengaturan panel & VFD", "Panel & VFD setup"],
            ["Pengujian debit & tekanan", "Flow & pressure testing"],
            ["Dokumentasi serah terima", "Handover documentation"],
        ],
    },
    {
        title: "Retrofit & Energy Efficiency",
        description: [
            "Penggantian pompa lama dengan unit berefisiensi tinggi serta optimalisasi sistem berdasarkan beban aktual.",
            "Replace existing pumps with high-efficiency units and optimize the system for actual operating loads.",
        ],
        items: [
            ["Evaluasi kebutuhan sistem", "System requirement evaluation"],
            ["Penggantian unit berefisiensi tinggi", "High-efficiency pump replacement"],
            ["Optimalisasi beban aktual", "Actual-load optimization"],
        ],
    },
];

export const strengths: { title: Translation; description: Translation }[] = [
    {
        title: ["Authorized Dealer", "Authorized Dealer"],
        description: [
            "Produk Wilo melalui jalur distribusi resmi dengan dukungan prinsipal.",
            "Wilo products through official distribution channels with principal support.",
        ],
    },
    {
        title: ["Produk & Suku Cadang Orisinal", "Original Products & Spare Parts"],
        description: [
            "Unit dan komponen dari jalur resmi, dapat ditelusuri melalui nomor seri.",
            "Units and components from official channels, traceable by serial number.",
        ],
    },
    {
        title: ["Keahlian Teknis", "Technical Expertise"],
        description: [
            "Pemilihan dan penanganan pompa berdasarkan kebutuhan teknis sistem.",
            "Pump selection and handling based on the system’s technical requirements.",
        ],
    },
    {
        title: ["Respons Cepat", "Fast Response"],
        description: [
            "Layanan teknisi untuk membantu meminimalkan downtime operasional.",
            "Technical services to help minimize operational downtime.",
        ],
    },
    {
        title: ["Efisiensi Energi", "Energy Efficiency"],
        description: [
            "Solusi yang mempertimbangkan konsumsi energi dan efisiensi sistem.",
            "Solutions designed with energy consumption and system efficiency in mind.",
        ],
    },
    {
        title: ["One Stop Solution", "One Stop Solution"],
        description: [
            "Pengadaan, instalasi, commissioning, hingga maintenance dalam satu partner.",
            "Procurement, installation, commissioning, and maintenance through one partner.",
        ],
    },
    {
        title: ["Layanan Terdokumentasi", "Documented Service"],
        description: [
            "Service report, hasil pengujian, dan rekomendasi lanjutan untuk setiap pekerjaan.",
            "Service reports, test results, and follow-up recommendations for every project.",
        ],
    },
];

export const process: { title: string; description: Translation }[] = [
    {
        title: "Consultation",
        description: [
            "Memahami kebutuhan dan kondisi sistem Anda.",
            "Understanding your system requirements and operating conditions.",
        ],
    },
    {
        title: "Pump Selection",
        description: [
            "Seleksi berdasarkan debit, head, karakteristik fluida, dan kebutuhan sistem.",
            "Selection based on flow rate, head, fluid characteristics, and system requirements.",
        ],
    },
    {
        title: "Procurement",
        description: [
            "Pengadaan unit dan spare part melalui jalur resmi.",
            "Procuring units and spare parts through official channels.",
        ],
    },
    {
        title: "Installation",
        description: [
            "Instalasi dan alignment pompa–motor.",
            "Pump installation and pump–motor alignment.",
        ],
    },
    {
        title: "Testing & Commissioning",
        description: [
            "Pengujian debit, tekanan, dan fungsi sistem.",
            "Testing system flow rate, pressure, and functionality.",
        ],
    },
    {
        title: "Maintenance",
        description: [
            "Preventive maintenance, service berkala, dan kontrak perawatan.",
            "Preventive maintenance, periodic servicing, and maintenance contracts.",
        ],
    },
    {
        title: "After Sales",
        description: [
            "Spare part, dukungan garansi, dan bantuan teknis.",
            "Spare parts, warranty support, and technical assistance.",
        ],
    },
];

export const industries: {
    title: string;
    sectors: Translation;
    applications: string;
    image: string;
}[] = [
    {
        title: "Building & Property",
        sectors: [
            "Gedung bertingkat, apartemen, hotel, pusat perbelanjaan, dan property management.",
            "High-rise buildings, apartments, hotels, shopping malls, and property management.",
        ],
        applications: "Chilled Water · Booster · Transfer Water · Drainage · HVAC",
        image: "building",
    },
    {
        title: "Healthcare",
        sectors: ["Rumah sakit dan fasilitas medis.", "Hospitals and medical facilities."],
        applications: "Domestic Water · HVAC · Booster · Sewage",
        image: "building",
    },
    {
        title: "Manufacturing & Industrial",
        sectors: [
            "Pabrik, kawasan industri, food & beverage, serta chemical & processing.",
            "Factories, industrial estates, food & beverage, and chemical & processing.",
        ],
        applications: "Process Water · Cooling Water · Transfer · Booster",
        image: "pump-installation",
    },
    {
        title: "Energy & Heavy Industry",
        sectors: [
            "Power plant, pertambangan, petrokimia, dan pabrik kelapa sawit.",
            "Power plants, mining, petrochemical, and palm oil mills.",
        ],
        applications: "Vertical Turbine · Cooling · Process Water · Fire Protection · Wastewater",
        image: "pump-installation",
    },
    {
        title: "Water & Wastewater",
        sectors: [
            "WTP, STP, IPAL, drainase, dan pengendalian banjir.",
            "WTP, STP, wastewater treatment, drainage, and flood control.",
        ],
        applications: "Water Treatment · Sewage Treatment · Drainage · Flood Control",
        image: "pump-installation",
    },
];

export const values: { title: string; description: Translation }[] = [
    {
        title: "Originality",
        description: [
            "Produk dan spare part melalui jalur distribusi resmi.",
            "Products and spare parts through official distribution channels.",
        ],
    },
    {
        title: "Technical Accuracy",
        description: [
            "Seleksi berdasarkan kebutuhan sistem, debit, head, NPSH, dan kurva sistem.",
            "Selection based on system requirements, flow rate, head, NPSH, and system curves.",
        ],
    },
    {
        title: "Fast Response",
        description: [
            "Respons cepat untuk membantu mengurangi downtime.",
            "Quick response to help reduce downtime.",
        ],
    },
    {
        title: "Energy Efficiency",
        description: [
            "Mempertimbangkan efisiensi dan konsumsi energi jangka panjang.",
            "Considering long-term efficiency and energy consumption.",
        ],
    },
    {
        title: "Transparency",
        description: [
            "Laporan, hasil pengujian, dan rekomendasi pada setiap pekerjaan.",
            "Reports, test results, and recommendations for every project.",
        ],
    },
];

export const mission: Translation[] = [
    [
        "Menyediakan unit dan suku cadang Wilo orisinal bergaransi resmi.",
        "Provide original Wilo units and spare parts with official warranties.",
    ],
    [
        "Memberikan layanan teknis yang profesional dan tepat waktu.",
        "Deliver professional and timely technical services.",
    ],
    [
        "Mengoptimalkan efisiensi energi pada sistem air dan tata udara pelanggan.",
        "Optimize energy efficiency in customers’ water and HVAC systems.",
    ],
    [
        "Membangun kompetensi teknisi melalui pelatihan produk berkelanjutan.",
        "Develop technician expertise through continuous product training.",
    ],
];

export const technology: Translation[] = [
    ["Motor EC/IE5 dengan konsumsi daya rendah", "EC/IE5 motors with low power consumption"],
    [
        "Kendali cerdas: tekanan konstan, ΔT konstan, dan adaptasi beban",
        "Smart control: constant pressure, constant ΔT, and load adaptation",
    ],
    [
        "Konektivitas Bluetooth, Modbus, BACnet, dan LonWorks",
        "Bluetooth, Modbus, BACnet, and LonWorks connectivity",
    ],
    [
        "Cartridge mechanical seal untuk mempercepat perawatan",
        "Cartridge mechanical seals for faster maintenance",
    ],
    [
        "Material tahan korosi: cast iron cataphoretic, SS 304/316",
        "Corrosion-resistant materials: cataphoretic-coated cast iron, SS 304/316",
    ],
];

export const certifications: Translation[] = [
    ["NSF/ANSI 61 & 372 untuk kontak air minum", "NSF/ANSI 61 & 372 for drinking-water contact"],
    ["UL Listed untuk sistem packaged pumping", "UL Listed for packaged pumping systems"],
    ["UL/FM untuk pompa proteksi kebakaran", "UL/FM for fire protection pumps"],
    ["IP68 untuk unit submersible", "IP68 for submersible units"],
    [
        "FM explosion-proof pada seri sewage tertentu",
        "FM explosion-proof for selected sewage pump series",
    ],
];
