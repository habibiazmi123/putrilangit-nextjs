"use client";

import { ArrowDown, ArrowRight, Check } from "lucide-react";

import { mission, translate, type Locale, type Translation } from "@/data/company";
import ScrollButton from "@/components/scroll-button";

const team: { name: string; role: Translation; image: string }[] = [
    { name: "Putri Mey", role: ["Direktur", "Director"], image: "putri-mey" },
    { name: "Sabbaha", role: ["Komisaris", "Commissioner"], image: "sabbaha" },
    {
        name: "Ahmad Fikri Aziz",
        role: ["Direktur Operational", "Operations Director"],
        image: "ahmad-fikri-aziz",
    },
];

export default function CompanyAbout({ locale }: { locale: Locale }) {
    const t = (id: string, en: string) => (locale === "id" ? id : en);

    return (
        <section id="tentang" className="section-space about-company-section">
            <div className="site-container">
                <div className="about-grid" data-scroll-reveal="true">
                    <figure className="about-team-photo">
                        <img
                            src="/images/about-company.webp"
                            alt={t("Tim PT Putri Langit Sukses", "The PT Putri Langit Sukses team")}
                            width="712"
                            height="813"
                            loading="lazy"
                        />
                    </figure>
                    <div>
                        <div className="eyebrow section-eyebrow">PT PUTRI LANGIT SUKSES</div>
                        <h2 className="section-heading">{t("Tentang Kami", "About Us")}</h2>
                        <p className="about-introduction">
                            {t(
                                "Mitra teknis untuk sistem yang tepat, efisien, dan andal.",
                                "Your technical partner for properly selected, efficient, and reliable systems.",
                            )}
                        </p>
                        <p className="body-copy mt-5">
                            {t(
                                "PT Putri Langit Sukses merupakan perusahaan yang bergerak di bidang distribusi pompa industri dan komersial bermerek Wilo, sekaligus menyediakan layanan perawatan terpadu untuk sistem perpompaan dan tata udara/HVAC.",
                                "PT Putri Langit Sukses is a company specializing in the distribution of Wilo-branded industrial and commercial pumps, while also providing integrated maintenance services for pumping and HVAC systems.",
                            )}
                        </p>
                        <p className="body-copy mt-4">
                            {t(
                                "Sebagai Authorized Dealer Wilo, kami menyediakan unit dan suku cadang melalui jalur distribusi resmi, serta mendampingi pelanggan mulai dari pemilihan pompa, pengadaan, instalasi, testing & commissioning hingga pemeliharaan berkala.",
                                "As an Authorized Wilo Dealer, we supply units and spare parts through official distribution channels and support customers throughout the entire process, from pump selection and procurement to installation, testing & commissioning, and periodic maintenance.",
                            )}
                        </p>
                        <p className="body-copy mt-4">
                            {t(
                                "Kami hadir bukan sekadar sebagai penyedia produk, tetapi sebagai mitra teknis yang membantu pelanggan mendapatkan sistem yang tepat, efisien, andal, dan berkelanjutan.",
                                "We are more than just a product supplier. We serve as a technical partner, helping customers achieve systems that are properly selected, efficient, reliable, and sustainable.",
                            )}
                        </p>
                        <nav
                            className="about-links"
                            aria-label={t(
                                "Jelajahi profil perusahaan",
                                "Explore our company profile",
                            )}
                        >
                            <ScrollButton targetId="visi-misi" className="text-link">
                                {t("Visi & Misi", "Vision & Mission")}
                                <ArrowDown size={17} />
                            </ScrollButton>
                            <ScrollButton targetId="tim" className="text-link">
                                {t("Tim Kami", "Our Team")}
                                <ArrowRight size={17} />
                            </ScrollButton>
                        </nav>
                    </div>
                </div>

                <div
                    id="visi-misi"
                    className="vision-mission-block"
                    data-scroll-reveal="true"
                >
                    <h3 className="about-subheading">{t("Visi & Misi", "Vision & Mission")}</h3>
                    <div className="vision-mission-grid">
                        <article className="vision-card">
                            <span className="eyebrow">{t("VISI", "VISION")}</span>
                            <h4>{t("Visi Kami", "Our Vision")}</h4>
                            <p>
                                {t(
                                    "Menjadi dealer pompa Wilo terdepan dan penyedia jasa perawatan HVAC/AC paling terpercaya di Indonesia, dengan mengutamakan inovasi, kualitas produk, dan kecepatan layanan.",
                                    "To become Indonesia’s leading Wilo pump dealer and the most trusted HVAC/AC maintenance service provider, driven by innovation, product quality, and service responsiveness.",
                                )}
                            </p>
                        </article>
                        <article className="mission-card">
                            <span className="eyebrow">{t("MISI", "MISSION")}</span>
                            <h4>{t("Misi Kami", "Our Mission")}</h4>
                            <ul>
                                {mission.map((item) => (
                                    <li key={item[0]}>
                                        <Check size={18} />
                                        <span>{translate(item, locale)}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>

                <div id="tim" className="team-block" data-scroll-reveal="true">
                    <div className="section-top">
                        <div>
                            <div className="eyebrow section-eyebrow">
                                {t("KENALI TIM KAMI", "MEET OUR TEAM")}
                            </div>
                            <h3 className="section-heading">{t("Tim Kami", "Our Team")}</h3>
                        </div>
                        <p className="body-copy max-w-100">
                            {t(
                                "Jajaran pimpinan PT Putri Langit Sukses.",
                                "The leadership team of PT Putri Langit Sukses.",
                            )}
                        </p>
                    </div>
                    <div className="team-grid">
                        {team.map((member) => (
                            <figure className="team-card" key={member.name}>
                                <img
                                    src={`/images/team/${member.image}.webp`}
                                    alt={member.name}
                                    width="602"
                                    height="759"
                                    loading="lazy"
                                />
                                <figcaption>
                                    <h4>{member.name}</h4>
                                    <p>{translate(member.role, locale)}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
