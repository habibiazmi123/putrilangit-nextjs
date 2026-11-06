"use client";

import {
    ArrowDown,
    ArrowDownToLine,
    ArrowRight,
    ArrowUp,
    ArrowUpRight,
    BadgeCheck,
    Check,
    ChevronDown,
    CircleCheck,
    Globe2,
    Leaf,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    Phone,
    ShieldCheck,
    Wrench,
    X,
} from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { getLocale, storeLocale, subscribeLocale } from "@/lib/locale";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CompanySections from "@/components/company-sections";
import CompanyAbout from "@/components/company-about";
import {
    address,
    categories,
    email,
    products,
    services,
    translate,
    whatsapp,
    type Locale,
    type Translation,
} from "@/data/company";

const navigation: { id: string; label: Translation }[] = [
    { id: "tentang", label: ["Tentang Kami", "About Us"] },
    { id: "produk", label: ["Produk", "Products"] },
    { id: "layanan", label: ["Layanan", "Services"] },
    { id: "industri", label: ["Industri", "Industries"] },
];

export default function Welcome({ locale: initialLocale = "id" }: { locale?: Locale }) {
    // ponytail: server renders initialLocale (static HTML for crawlers); the
    // client swaps to the stored/detected choice after hydration.
    const locale = useSyncExternalStore(subscribeLocale, getLocale, () => initialLocale);
    const en = locale === "en";
    const t = (id: string, english: string) => (en ? english : id);
    const tr = (text: Translation) => translate(text, locale);
    const [menuOpen, setMenuOpen] = useState(false);
    const [category, setCategory] = useState("hvac");
    const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
    const [activeSection, setActiveSection] = useState("");
    const contactUrl = whatsapp(
        t(
            "Halo PT Putri Langit Sukses, saya ingin berkonsultasi mengenai kebutuhan pompa / HVAC.",
            "Hello PT Putri Langit Sukses, I would like to discuss my pump / HVAC requirements.",
        ),
    );
    const profileUrl = `/documents/company-profile-${locale}.pdf`;
    const chooseLocale = (next: Locale) => storeLocale(next);

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.classList.remove("dark");
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries)
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
            },
            { rootMargin: "-15% 0px -65% 0px" },
        );
        document
            .querySelectorAll("main section[id]")
            .forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [locale]);

    useEffect(() => {
        const targets = Array.from(
            document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"),
        );
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (targets.length === 0 || reducedMotion.matches || !("IntersectionObserver" in window))
            return;

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const target = entry.target as HTMLElement;
                    target.classList.remove("scroll-reveal-pending");
                    target.classList.add("scroll-reveal-visible");
                    currentObserver.unobserve(target);
                }
            },
            { rootMargin: "0px 0px -56px 0px", threshold: 0.08 },
        );

        const revealOnFocus = (event: FocusEvent) => {
            if (!(event.target instanceof Element)) return;
            const target = event.target.closest<HTMLElement>(
                "[data-scroll-reveal].scroll-reveal-pending",
            );
            if (!target) return;
            target.classList.remove("scroll-reveal-pending");
            target.classList.add("scroll-reveal-visible");
            observer.unobserve(target);
        };

        for (const target of targets) {
            if (target.getBoundingClientRect().top < window.innerHeight) {
                target.classList.add("scroll-reveal-visible");
            } else {
                target.classList.add("scroll-reveal-pending");
                observer.observe(target);
            }
        }

        document.addEventListener("focusin", revealOnFocus);
        const showAllForReducedMotion = (event: MediaQueryListEvent) => {
            if (!event.matches) return;
            observer.disconnect();
            for (const target of targets) {
                target.classList.remove("scroll-reveal-pending");
                target.classList.add("scroll-reveal-visible");
            }
        };
        reducedMotion.addEventListener("change", showAllForReducedMotion);

        return () => {
            observer.disconnect();
            document.removeEventListener("focusin", revealOnFocus);
            reducedMotion.removeEventListener("change", showAllForReducedMotion);
            for (const target of targets) {
                target.classList.remove("scroll-reveal-pending", "scroll-reveal-visible");
            }
        };
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const close = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("keydown", close);
        return () => document.removeEventListener("keydown", close);
    }, [menuOpen]);

    return (
        <div className="company-site">
            <a href="#main" className="skip-link">
                {t("Lewati ke konten", "Skip to content")}
            </a>
            <header className="site-header">
                <div className="site-container flex h-22 items-center justify-between gap-4">
                    <a href="#beranda" className="brand" aria-label="PT Putri Langit Sukses — Home">
                        <img src="/images/logo.png" alt="" width="49" height="54" />
                        <span>
                            PUTRI LANGIT SUKSES<small>PUMP & HVAC SOLUTIONS</small>
                        </span>
                    </a>
                    <nav
                        className="hidden items-center gap-6 lg:flex"
                        aria-label={t("Navigasi utama", "Main navigation")}
                    >
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`nav-link ${activeSection === item.id ? "is-active" : ""}`}
                            >
                                {tr(item.label)}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="language-switch" aria-label={t("Bahasa", "Language")}>
                            <Globe2 size={15} />
                            <button
                                type="button"
                                aria-label="Bahasa Indonesia"
                                aria-pressed={!en}
                                className={!en ? "selected" : ""}
                                onClick={() => chooseLocale("id")}
                            >
                                ID
                            </button>
                            <span>/</span>
                            <button
                                type="button"
                                aria-label="English"
                                aria-pressed={en}
                                className={en ? "selected" : ""}
                                onClick={() => chooseLocale("en")}
                            >
                                EN
                            </button>
                        </div>
                        <a href="#kontak" className="button button-green hidden sm:inline-flex">
                            {t("Hubungi Kami", "Get in Touch")}
                            <ArrowUpRight size={16} />
                        </a>
                        <button
                            type="button"
                            className="menu-toggle lg:hidden"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                            aria-label={t("Buka navigasi", "Toggle navigation")}
                        >
                            {menuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <nav
                        id="mobile-navigation"
                        className="mobile-navigation lg:hidden"
                        aria-label={t("Navigasi mobile", "Mobile navigation")}
                    >
                        {navigation.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {tr(item.label)}
                                <ArrowUpRight size={17} />
                            </a>
                        ))}
                        <a href="#kontak" onClick={() => setMenuOpen(false)}>
                            {t("Hubungi Kami", "Get in Touch")}
                            <ArrowUpRight size={17} />
                        </a>
                    </nav>
                )}
            </header>
            <main id="main">
                <section id="beranda" className="hero-section">
                    <div className="site-container hero-grid">
                        <div className="hero-copy">
                            <div className="eyebrow">
                                <ShieldCheck
                                    className="hero-badge-icon"
                                    aria-hidden="true"
                                    strokeWidth={2}
                                />{" "}
                                AUTHORIZED WILO DEALER
                            </div>
                            <h1>
                                {t("Solusi andal.", "Reliable solutions.")}
                                <br />
                                <span>{t("Kinerja optimal.", "Optimal performance.")}</span>
                            </h1>
                            <p className="hero-description">
                                {t(
                                    "Mitra teknis Anda untuk solusi pompa Wilo, perawatan HVAC, dan sistem yang bekerja lebih efisien.",
                                    "Your technical partner for Wilo pumping solutions, HVAC maintenance, and systems that work more efficiently.",
                                )}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a href="#produk" className="button button-green">
                                    {t("Temukan Solusi Anda", "Find Your Solution")}
                                    <ArrowUpRight size={18} />
                                </a>
                                <a href={profileUrl} download className="button button-outline">
                                    <ArrowDownToLine size={17} />
                                    Company Profile
                                </a>
                            </div>
                            <div className="hero-partner">
                                <span className="wilo-wordmark">wilo</span>
                                <span className="partner-divider" />
                                <span>
                                    {t("Teknologi global.", "Global technology.")}
                                    <br />
                                    <strong>{t("Dukungan lokal.", "Local expertise.")}</strong>
                                </span>
                                <span className="partner-country">
                                    DORTMUND, GERMANY
                                    <ArrowUpRight size={13} />
                                </span>
                            </div>
                        </div>
                        <div className="hero-visual">
                            <img
                                className="hero-building"
                                src="/images/building.webp"
                                alt={t(
                                    "Arsitektur gedung komersial modern",
                                    "Modern commercial building architecture",
                                )}
                                width="1100"
                                height="1400"
                                fetchPriority="high"
                            />
                            <div className="hero-visual-overlay" />
                            <div className="hero-image-label">
                                <span className="mini-line" />
                                ENGINEERED FOR BETTER PERFORMANCE
                            </div>
                            <div className="hero-product-card">
                                <div className="flex items-center justify-between">
                                    <span className="eyebrow !text-[9px] !tracking-[.13em]">
                                        {t(
                                            "TEKNOLOGI YANG MENGGERAKKAN",
                                            "TECHNOLOGY THAT MOVES YOU",
                                        )}
                                    </span>
                                    <span className="wilo-wordmark !text-3xl">wilo</span>
                                </div>
                                <div className="hero-pump-row">
                                    <img
                                        src="/images/atmos-giga-n.webp"
                                        alt="Wilo Atmos GIGA-N"
                                        width="262"
                                        height="155"
                                    />
                                    <div>
                                        <span>Wilo–Atmos GIGA-N</span>
                                        <p>
                                            {t(
                                                "Presisi. Efisien. Andal.",
                                                "Precise. Efficient. Reliable.",
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="#produk"
                                    aria-label={t("Jelajahi produk Wilo", "Explore Wilo products")}
                                    className="round-arrow"
                                >
                                    <ArrowUpRight size={21} />
                                </a>
                            </div>
                            <div className="hero-caption">
                                <span>BUILDING SERVICES · WATER MANAGEMENT · INDUSTRY</span>
                                <span>WILO / PLS</span>
                            </div>
                        </div>
                    </div>
                    <div className="site-container hero-bottom">
                        <span>
                            {t(
                                "SOLUSI TERINTEGRASI, DARI AWAL HINGGA AKHIR.",
                                "INTEGRATED SOLUTIONS, FROM START TO FINISH.",
                            )}
                        </span>
                        <a href="#tentang">
                            {t("Kenali kami lebih dekat", "Get to know us")}
                            <ArrowDown size={15} />
                        </a>
                    </div>
                </section>
                <div className="trust-strip">
                    <div className="site-container grid gap-7 md:grid-cols-3">
                        {[
                            {
                                icon: BadgeCheck,
                                title: ["Produk Orisinal", "Original Products"] as Translation,
                                text: [
                                    "Unit & suku cadang dari jalur resmi Wilo",
                                    "Units & spare parts from official Wilo channels",
                                ] as Translation,
                            },
                            {
                                icon: Wrench,
                                title: ["Keahlian Teknis", "Technical Expertise"] as Translation,
                                text: [
                                    "Dari pemilihan hingga perawatan sistem",
                                    "From selection to system maintenance",
                                ] as Translation,
                            },
                            {
                                icon: Leaf,
                                title: [
                                    "Efisiensi Berkelanjutan",
                                    "Lasting Efficiency",
                                ] as Translation,
                                text: [
                                    "Performa optimal, konsumsi energi terukur",
                                    "Optimal performance, considered energy use",
                                ] as Translation,
                            },
                        ].map(({ icon: Icon, title: itemTitle, text }) => (
                            <div className="trust-item" key={itemTitle[0]}>
                                <Icon size={29} strokeWidth={1.35} />
                                <div>
                                    <h2>{tr(itemTitle)}</h2>
                                    <p>{tr(text)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <CompanyAbout locale={locale} />
                <section
                    id="produk"
                    className="section-space products-section"
                    data-scroll-reveal="true"
                >
                    <div className="site-container">
                        <div className="section-top">
                            <div>
                                <div className="eyebrow section-eyebrow">
                                    {t("SOLUSI PRODUK", "PRODUCT SOLUTIONS")}
                                </div>
                                <h2 className="section-heading">
                                    {t("Pompa yang tepat.", "The right pump.")}
                                    <br />
                                    {t("Untuk setiap kebutuhan.", "For every application.")}
                                </h2>
                            </div>
                            <p className="body-copy max-w-82">
                                {t(
                                    "Teknologi perpompaan Wilo untuk bangunan, industri, hingga pengelolaan air. Temukan solusi yang sesuai dengan sistem Anda.",
                                    "Wilo pumping technology for buildings, industry, and water management. Find the right solution for your system.",
                                )}
                            </p>
                        </div>
                        <div
                            className="product-tabs"
                            role="tablist"
                            aria-label={t("Kategori produk", "Product categories")}
                        >
                            {categories.map((item, i) => (
                                <button
                                    key={item.id}
                                    id={`tab-${item.id}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={category === item.id}
                                    aria-controls={`panel-${item.id}`}
                                    tabIndex={category === item.id ? 0 : -1}
                                    onClick={() => setCategory(item.id)}
                                    onKeyDown={(event) => {
                                        let index = i;
                                        if (event.key === "ArrowRight")
                                            index = (i + 1) % categories.length;
                                        else if (event.key === "ArrowLeft")
                                            index = (i + categories.length - 1) % categories.length;
                                        else if (event.key === "Home") index = 0;
                                        else if (event.key === "End") index = categories.length - 1;
                                        else return;
                                        event.preventDefault();
                                        setCategory(categories[index].id);
                                        document
                                            .getElementById(`tab-${categories[index].id}`)
                                            ?.focus();
                                    }}
                                >
                                    <span>0{i + 1}</span>
                                    {tr(item.title)}
                                    <ArrowUpRight size={16} />
                                </button>
                            ))}
                        </div>
                        {categories.map((productCategory) => (
                            <div
                                key={productCategory.id}
                                role="tabpanel"
                                id={`panel-${productCategory.id}`}
                                aria-labelledby={`tab-${productCategory.id}`}
                                hidden={category !== productCategory.id}
                            >
                                <p className="product-category-description">
                                    {tr(productCategory.description)}
                                </p>
                                <div className="product-grid">
                                    {products
                                        .filter(
                                            (product) => product.category === productCategory.id,
                                        )
                                        .map((product) => (
                                            <button
                                                type="button"
                                                className="product-card group"
                                                key={product.name}
                                                onClick={() => setSelectedProduct(product)}
                                            >
                                                <div className="product-image">
                                                    <span className="product-brand">wilo</span>
                                                    <img
                                                        src={`/images/${product.image}.webp`}
                                                        alt={product.name}
                                                        width="280"
                                                        height="200"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div className="product-card-info">
                                                    <div>
                                                        <p>{tr(product.type)}</p>
                                                        <h3>{product.name}</h3>
                                                        {product.range && (
                                                            <span className="product-range">
                                                                {product.range}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="product-card-arrow">
                                                        <ArrowUpRight size={19} />
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        ))}
                        <div className="product-note">
                            <span>
                                <CircleCheck size={17} />
                                {t(
                                    "Unit & spare part orisinal, bergaransi resmi.",
                                    "Original units & spare parts, with official warranties.",
                                )}
                            </span>
                            <a
                                href={contactUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-link"
                            >
                                {t("Butuh bantuan memilih pompa?", "Need help choosing a pump?")}
                                <ArrowRight size={16} />
                            </a>
                        </div>
                        <details className="technical-note">
                            <summary>
                                {t(
                                    "Catatan pemilihan & kapasitas produk",
                                    "Product selection & capacity notes",
                                )}
                                <ChevronDown size={15} />
                            </summary>
                            <p>
                                {t(
                                    "Ringkasan produk adalah acuan awal pemilihan. Kapasitas dan head merupakan batas maksimum seri, bukan titik kerja aktual. Titik kerja ditentukan melalui perhitungan kurva sistem pada tahap penawaran teknis. Konversi data pabrikan: 1 GPM = 0,2271 m³/jam; 1 ft = 0,3048 m. Pilihan sertifikasi mengikuti seri dan konfigurasi produk.",
                                    "The product summary is an initial selection reference. Capacity and head values are series maximums, not actual operating points. Operating points are determined through system-curve calculations during technical quotation. Manufacturer-data conversions: 1 GPM = 0.2271 m³/h; 1 ft = 0.3048 m. Certifications depend on product series and configuration.",
                                )}
                            </p>
                        </details>
                    </div>
                </section>
                <section
                    id="layanan"
                    className="section-space services-section"
                    data-scroll-reveal="true"
                >
                    <div className="site-container services-grid">
                        <div className="service-intro">
                            <div className="eyebrow section-eyebrow">
                                {t("LAYANAN TEKNIS", "TECHNICAL SERVICES")}
                            </div>
                            <h2 className="section-heading">
                                {t("Jaga performa.", "Sustain performance.")}
                                <br />
                                <span>{t("Minimalkan downtime.", "Minimize downtime.")}</span>
                            </h2>
                            <p>
                                {t(
                                    "Layanan profesional untuk menjaga sistem pompa dan HVAC Anda beroperasi optimal. Tersedia perawatan berkala dan contract maintenance.",
                                    "Professional services to keep your pump and HVAC systems operating at their best. Periodic servicing and maintenance contracts available.",
                                )}
                            </p>
                            <a
                                href={contactUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button button-white mt-7"
                            >
                                {t("Diskusikan Kebutuhan Anda", "Discuss Your Requirements")}
                                <ArrowUpRight size={18} />
                            </a>
                            <div className="service-photo">
                                <img
                                    src="/images/pump-installation.webp"
                                    alt={t(
                                        "Sistem pompa komersial dan industri",
                                        "Commercial and industrial pumping systems",
                                    )}
                                    width="700"
                                    height="450"
                                    loading="lazy"
                                />
                                <span>PRECISION IN EVERY DETAIL.</span>
                            </div>
                        </div>
                        <div className="service-list">
                            {services.map((service, i) => (
                                <details
                                    key={service.title}
                                    className="service-accordion"
                                    open={i === 0 ? true : undefined}
                                >
                                    <summary>
                                        <h3>{service.title}</h3>
                                        <span className="accordion-icon">
                                            <ArrowUpRight size={20} />
                                        </span>
                                    </summary>
                                    <div className="service-detail">
                                        <p>{tr(service.description)}</p>
                                        <ul>
                                            {service.items.map((item) => (
                                                <li key={item[0]}>
                                                    <Check size={14} />
                                                    {tr(item)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
                <CompanySections locale={locale} />
                <section id="kontak" className="contact-section" data-scroll-reveal="true">
                    <div className="site-container">
                        <div className="contact-main">
                            <div>
                                <div className="eyebrow">LET&apos;S BUILD SOMETHING BETTER</div>
                                <h2>
                                    {t("Sistem yang lebih baik,", "A better system,")}
                                    <br />
                                    <span>
                                        {t(
                                            "dimulai dari percakapan.",
                                            "starts with a conversation.",
                                        )}
                                    </span>
                                </h2>
                                <p>
                                    {t(
                                        "Ceritakan kebutuhan Anda. Mari temukan solusi pompa dan HVAC yang tepat, bersama.",
                                        "Tell us what you need. Let’s find the right pump and HVAC solution, together.",
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="contact-details">
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Menteng+Niaga+Blok+Collins+1+No+26+Jakarta+Timur"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MapPin size={21} />
                                <div>
                                    <span>{t("KANTOR PUSAT", "HEAD OFFICE")}</span>
                                    <p>{address}</p>
                                </div>
                                <ArrowUpRight size={17} />
                            </a>
                            <a href="tel:+6281386929285">
                                <Phone size={21} />
                                <div>
                                    <span>{t("TELEPON / WHATSAPP", "PHONE / WHATSAPP")}</span>
                                    <p>+62 813 8692 9285</p>
                                </div>
                                <ArrowUpRight size={17} />
                            </a>
                            <a href={`mailto:${email}`}>
                                <Mail size={21} />
                                <div>
                                    <span>EMAIL</span>
                                    <p>{email}</p>
                                </div>
                                <ArrowUpRight size={17} />
                            </a>
                        </div>
                        <div className="contact-actions">
                            <a
                                href={contactUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button button-white"
                            >
                                <MessageCircle size={18} />
                                {t("Konsultasi via WhatsApp", "Consult via WhatsApp")}
                                <ArrowUpRight size={17} />
                            </a>
                            <a href={profileUrl} download className="contact-download">
                                <ArrowDownToLine size={17} />
                                {t("Unduh Company Profile", "Download Company Profile")}
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="site-footer" data-scroll-reveal="true">
                <div className="site-container">
                    <div className="footer-top">
                        <a href="#beranda" className="brand">
                            <img src="/images/logo.png" alt="" width="47" height="52" />
                            <span>
                                PUTRI LANGIT SUKSES<small>AUTHORIZED WILO DEALER</small>
                            </span>
                        </a>
                        <nav aria-label={t("Navigasi footer", "Footer navigation")}>
                            {navigation.map((item) => (
                                <a key={item.id} href={`#${item.id}`}>
                                    {tr(item.label)}
                                </a>
                            ))}
                            <a href="#kontak">{t("Kontak", "Contact")}</a>
                        </nav>
                        <a href="#beranda" className="back-top">
                            {t("Kembali ke atas", "Back to top")}
                            <ArrowUp size={17} />
                        </a>
                    </div>
                    <div className="footer-bottom">
                        <span>
                            © {new Date().getFullYear()} PT Putri Langit Sukses.{" "}
                            {t("Seluruh hak cipta dilindungi.", "All rights reserved.")}
                        </span>
                        <span>Pump Supply · Pump Service · HVAC Services · Energy Efficiency</span>
                    </div>
                </div>
            </footer>
            <Dialog
                open={selectedProduct !== null}
                onOpenChange={(open) => {
                    if (!open) setSelectedProduct(null);
                }}
            >
                <DialogContent className="company-product-dialog max-h-[calc(100dvh-2rem)] overflow-y-auto bg-white text-brand-ink sm:max-w-xl">
                    {selectedProduct && (
                        <>
                            <DialogHeader>
                                <span className="eyebrow text-brand-green">
                                    WILO PRODUCT SOLUTIONS
                                </span>
                                <DialogTitle className="mt-2 text-2xl">
                                    {selectedProduct.name}
                                </DialogTitle>
                                <DialogDescription>{tr(selectedProduct.type)}</DialogDescription>
                            </DialogHeader>
                            <div className="dialog-product-image">
                                <img
                                    src={`/images/${selectedProduct.image}.webp`}
                                    alt={selectedProduct.name}
                                    width="320"
                                    height="200"
                                />
                            </div>
                            {selectedProduct.range && (
                                <p className="rounded-lg bg-brand-tint p-4 text-sm">
                                    <strong>
                                        {t("Rentang kapasitas seri", "Series capacity range")}:
                                    </strong>{" "}
                                    {selectedProduct.range}
                                </p>
                            )}
                            <p className="text-sm leading-relaxed text-brand-muted">
                                {t(
                                    "Pemilihan unit disesuaikan dengan debit, head, karakteristik fluida, NPSH, dan kurva sistem Anda. Hubungi tim teknis kami untuk spesifikasi, ketersediaan, serta penawaran yang sesuai.",
                                    "Unit selection depends on your flow rate, head, fluid characteristics, NPSH, and system curves. Contact our technical team for specifications, availability, and a tailored quotation.",
                                )}
                            </p>
                            <a
                                className="button button-green justify-between"
                                href={whatsapp(
                                    t(
                                        `Halo, saya tertarik dengan ${selectedProduct.name}. Mohon informasi spesifikasi dan penawaran.`,
                                        `Hello, I am interested in ${selectedProduct.name}. Please share specifications and a quotation.`,
                                    ),
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t("Konsultasikan Produk Ini", "Enquire About This Product")}
                                <ArrowUpRight size={18} />
                            </a>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
