"use client";

import {
    ArrowDownToLine,
    ArrowUpRight,
    BadgeCheck,
    Check,
    CheckCheck,
    ChevronDown,
    Droplets,
    Leaf,
    ShieldCheck,
    Wrench,
    Zap,
} from "lucide-react";
import { useState } from "react";
import {
    certifications,
    industries,
    process,
    strengths,
    technology,
    translate,
    values,
    type Locale,
    type Translation,
} from "@/data/company";

export default function CompanySections({ locale }: { locale: Locale }) {
    const en = locale === "en";
    const t = (id: string, english: string) => (en ? english : id);
    const tr = (text: Translation) => translate(text, locale);
    const [selectedIndustry, setSelectedIndustry] = useState(0);

    return (
        <>
            <section
                id="keunggulan"
                className="section-space"
                data-scroll-reveal="true"
            >
                <div className="site-container">
                    <div className="section-top">
                        <div>
                            <div className="eyebrow section-eyebrow">
                                {t("KOMITMEN KAMI", "OUR COMMITMENT")}
                            </div>
                            <h2 className="section-heading">
                                {t("Kepercayaan Anda.", "Your trust.")}
                                <br />
                                {t("Standar kerja kami.", "Our standard of work.")}
                            </h2>
                        </div>
                        <p className="body-copy max-w-80">
                            {t(
                                "Tujuh keunggulan yang mendasari setiap produk, rekomendasi, dan layanan kami.",
                                "Seven strengths behind every product, recommendation, and service we deliver.",
                            )}
                        </p>
                    </div>
                    <div className="strengths-grid">
                        {strengths.map((item, i) => {
                            const Icon = [
                                ShieldCheck,
                                CheckCheck,
                                Wrench,
                                Zap,
                                Leaf,
                                Droplets,
                                BadgeCheck,
                            ][i];
                            return (
                                <div className="strength-card" key={item.title[0]}>
                                    <div className="flex items-start justify-between">
                                        <Icon size={28} strokeWidth={1.3} />
                                        <span>0{i + 1}</span>
                                    </div>
                                    <h3>{tr(item.title)}</h3>
                                    <p>{tr(item.description)}</p>
                                </div>
                            );
                        })}
                        <a
                            href={`/documents/company-profile-${locale}.pdf`}
                            download
                            className="strength-download"
                        >
                            <ArrowDownToLine size={30} strokeWidth={1.3} />
                            <h3>{t("Kenali kami lebih jauh.", "Get to know us better.")}</h3>
                            <span>
                                Company Profile
                                <ArrowUpRight size={19} />
                            </span>
                        </a>
                    </div>
                </div>
            </section>

            <section
                id="industri"
                className="section-space industry-section"
                data-scroll-reveal="true"
            >
                <div className="site-container">
                    <div className="section-top">
                        <div>
                            <div className="eyebrow section-eyebrow">
                                {t("INDUSTRI & APLIKASI", "INDUSTRIES & APPLICATIONS")}
                            </div>
                            <h2 className="section-heading">
                                {t("Beragam industri.", "Diverse industries.")}
                                <br />
                                {t("Satu standar keandalan.", "One standard of reliability.")}
                            </h2>
                        </div>
                        <p className="body-copy max-w-80">
                            {t(
                                "Setiap sektor memiliki tantangan. Kami membantu menemukan sistem yang menjawabnya.",
                                "Every sector has its challenges. We help you find a system that meets them.",
                            )}
                        </p>
                    </div>
                    <div className="industry-grid">
                        <div className="industry-options">
                            {industries.map((item, i) => (
                                <button
                                    type="button"
                                    key={item.title}
                                    aria-pressed={selectedIndustry === i}
                                    aria-controls={`industry-${i}`}
                                    onClick={() => setSelectedIndustry(i)}
                                >
                                    <span>{item.title}</span>
                                    <ArrowUpRight size={19} />
                                </button>
                            ))}
                        </div>
                        <div aria-live="polite">
                            {industries.map((industry, i) => (
                                <div
                                    key={industry.title}
                                    id={`industry-${i}`}
                                    className="industry-feature"
                                    hidden={selectedIndustry !== i}
                                >
                                    <img
                                        src={`/images/${industry.image}.webp`}
                                        alt={industry.title}
                                        width="850"
                                        height="550"
                                        loading="lazy"
                                    />
                                    <div className="industry-feature-content">
                                        <span className="eyebrow">
                                            {t(
                                                "SOLUSI UNTUK SEKTOR ANDA",
                                                "SOLUTIONS FOR YOUR SECTOR",
                                            )}
                                        </span>
                                        <h3>{industry.title}</h3>
                                        <p>{tr(industry.sectors)}</p>
                                        <span className="industry-applications">
                                            {industry.applications}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="proses" className="section-space" data-scroll-reveal="true">
                <div className="site-container">
                    <div className="text-center">
                        <div className="eyebrow section-eyebrow justify-center">
                            {t("SOLUSI TERINTEGRASI", "INTEGRATED SOLUTIONS")}
                        </div>
                        <h2 className="section-heading">
                            {t("Bersama di setiap tahap.", "With you at every stage.")}
                        </h2>
                        <p className="body-copy mx-auto mt-4 max-w-145">
                            {t(
                                "Dari pemilihan hingga layanan purna jual. Seluruh kebutuhan unit, instalasi, service, dan maintenance melalui satu mitra teknis.",
                                "From selection to after-sales support. All your unit, installation, service, and maintenance needs through one technical partner.",
                            )}
                        </p>
                    </div>
                    <ol className="process-grid">
                        {process.map((step) => (
                            <li key={step.title} className="process-step">
                                <h3>{step.title}</h3>
                                <p>{tr(step.description)}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section id="wilo" className="section-space wilo-section" data-scroll-reveal="true">
                <div className="site-container">
                    <div className="wilo-main">
                        <div>
                            <div className="eyebrow section-eyebrow">POWERED BY WILO</div>
                            <h2 className="section-heading">
                                {t("Teknologi global.", "Global technology.")}
                                <br />
                                <span className="text-brand-green">
                                    {t("Lebih dekat dengan Anda.", "Closer to you.")}
                                </span>
                            </h2>
                            <p className="body-copy mt-5">
                                {t(
                                    "Wilo adalah produsen pompa dan sistem perpompaan global dari Dortmund, Jerman. Solusinya mencakup Building Services, Water Management, dan Industrial Applications, didukung fasilitas produksi di Eropa, Asia, dan Amerika.",
                                    "Wilo is a global manufacturer of pumps and pumping systems based in Dortmund, Germany. Its solutions cover Building Services, Water Management, and Industrial Applications, with production facilities in Europe, Asia, and America.",
                                )}
                            </p>
                        </div>
                        <div className="wilo-stat-card">
                            <span className="wilo-wordmark">wilo</span>
                            <span className="text-xs text-brand-muted">
                                Global Pumping Technology
                            </span>
                            <div className="wilo-stats">
                                <div>
                                    <strong>50+</strong>
                                    <span>
                                        {t("Negara dalam jaringan", "Countries in the network")}
                                    </span>
                                </div>
                                <div>
                                    <strong>16</strong>
                                    <span>
                                        {t("Lokasi produksi utama", "Major production sites")}
                                    </span>
                                </div>
                                <div>
                                    <strong>{en ? "~9,000" : "~9.000"}</strong>
                                    <span>
                                        {t("Karyawan global (2024)", "Global employees (2024)")}
                                    </span>
                                </div>
                                <div>
                                    <strong>{en ? "€1,895.3M" : "€1.895,3 jt"}</strong>
                                    <span>{t("Penjualan bersih 2024", "Net sales in 2024")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wilo-details-grid">
                        <details className="info-accordion">
                            <summary>
                                {t(
                                    "Wilo Indonesia & dukungan lokal",
                                    "Wilo Indonesia & local support",
                                )}
                                <ChevronDown size={18} />
                            </summary>
                            <div>
                                <p>
                                    {t(
                                        "PT Wilo Pumps Indonesia berdiri di Jakarta pada 2008 sebagai anak perusahaan Wilo SE. Kantor pusat berada di Altira Business Park, Jl. Yos Sudarso Kav. 85, Sunter Jaya, Jakarta Utara, dengan kantor perwakilan di Palembang, Surabaya, dan Balikpapan.",
                                        "PT Wilo Pumps Indonesia was established in Jakarta in 2008 as a subsidiary of Wilo SE. Its head office is at Altira Business Park, Jl. Yos Sudarso Kav. 85, Sunter Jaya, North Jakarta, with representative offices in Palembang, Surabaya, and Balikpapan.",
                                    )}
                                </p>
                                <p>
                                    {t(
                                        "Workshop purna jual berada di Delta Silicon 8, Cikarang, Bekasi, Jawa Barat. Dukungan prinsipal dalam negeri memudahkan akses teknis, ketersediaan suku cadang, dan penanganan garansi tanpa menunggu jalur ekspor-impor.",
                                        "The after-sales workshop is in Delta Silicon 8, Cikarang, Bekasi, West Java. A domestic principal enables technical support, spare-part availability, and warranty handling without relying on export-import channels.",
                                    )}
                                </p>
                                <p>
                                    <strong>In-house repair:</strong>{" "}
                                    {t(
                                        "Penelusuran penyebab kerusakan, uji elektrik & hidraulik di bengkel.",
                                        "Workshop root-cause analysis, electrical and hydraulic testing.",
                                    )}
                                    <br />
                                    <strong>On-site repair:</strong>{" "}
                                    {t(
                                        "Perbaikan di lokasi pelanggan dengan spare part orisinal.",
                                        "Repairs at customer sites with original spare parts.",
                                    )}
                                </p>
                            </div>
                        </details>
                        <details className="info-accordion">
                            <summary>
                                {t("Fokus teknologi Wilo", "Wilo technology focus")}
                                <ChevronDown size={18} />
                            </summary>
                            <ul>
                                {technology.map((item) => (
                                    <li key={item[0]}>
                                        <Check size={14} />
                                        {tr(item)}
                                    </li>
                                ))}
                            </ul>
                        </details>
                        <details className="info-accordion">
                            <summary>
                                {t(
                                    "Sertifikasi sesuai seri produk",
                                    "Product-specific certifications",
                                )}
                                <ChevronDown size={18} />
                            </summary>
                            <ul>
                                {certifications.map((item) => (
                                    <li key={item[0]}>
                                        <Check size={14} />
                                        {tr(item)}
                                    </li>
                                ))}
                            </ul>
                            <p>
                                {t(
                                    "Sertifikasi berlaku pada seri dan konfigurasi terkait; konfirmasikan saat pemilihan produk.",
                                    "Certifications apply to the relevant series and configurations; confirm during product selection.",
                                )}
                            </p>
                        </details>
                        <details className="info-accordion">
                            <summary>
                                {t("Jaringan produksi global", "Global production network")}
                                <ChevronDown size={18} />
                            </summary>
                            <p>
                                {t(
                                    "Sekitar 90 perusahaan produksi dan penjualan di lebih dari 50 negara. Selain 16 lokasi produksi utama, lokasi di Sonneberg, Pohlheim, dan Chemnitz (Jerman), Sanford (Florida, AS), serta Shanghai (Tiongkok) mengembangkan produk khusus untuk suplai air, air limbah, dan pengendalian banjir. Perakitan pasar lokal dilakukan di Brasil, Malaysia, Kazakhstan, dan Arab Saudi untuk menjaga ketersediaan dan konsistensi mutu.",
                                    "Around 90 production and sales companies in more than 50 countries. Beyond 16 major production sites, locations in Sonneberg, Pohlheim, and Chemnitz (Germany), Sanford (Florida, USA), and Shanghai (China) develop specialized products for water supply, wastewater, and flood control. Local assembly in Brazil, Malaysia, Kazakhstan, and Saudi Arabia supports availability and consistent quality.",
                                )}
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            <section
                className="section-space"
                aria-labelledby="vision-heading"
                data-scroll-reveal="true"
            >
                <div className="site-container">
                    <div className="eyebrow section-eyebrow">
                        {t("ARAH & NILAI KAMI", "OUR PURPOSE & VALUES")}
                    </div>
                    <h2 className="section-heading" id="vision-heading">
                        {t("Nilai Perusahaan", "Company Values")}
                    </h2>
                    <div className="values-grid">
                        {values.map((value) => (
                            <div key={value.title}>
                                <h3>{value.title}</h3>
                                <p>{tr(value.description)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
