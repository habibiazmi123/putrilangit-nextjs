"use client";

import { ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { products, translate, type Locale } from "@/data/company";
import ScrollButton from "@/components/scroll-button";

const featuredProducts = products.filter((product) =>
    ["atmos-giga-n", "helix", "siboost", "firepack"].includes(product.image),
);
const motionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const getServerReducedMotion = () => true;
function subscribeReducedMotion(onChange: () => void) {
    const media = window.matchMedia(motionQuery);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
}

export default function HeroProductShowcase({ locale }: { locale: Locale }) {
    const t = (id: string, en: string) => (locale === "id" ? id : en);
    const [deck, setDeck] = useState<{ active: number; previous: number | null }>({
        active: 0,
        previous: null,
    });
    const { active, previous } = deck;
    const [paused, setPaused] = useState(false);
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotion,
        getServerReducedMotion,
    );
    const playing = !paused && !reducedMotion;

    useEffect(() => {
        if (!playing) return;
        let timeout: ReturnType<typeof setTimeout>;
        const schedule = () => {
            clearTimeout(timeout);
            if (!document.hidden) {
                timeout = setTimeout(() => {
                    setDeck((current) => ({
                        active: (current.active + 1) % featuredProducts.length,
                        previous: current.active,
                    }));
                }, 5000);
            }
        };
        schedule();
        document.addEventListener("visibilitychange", schedule);
        return () => {
            clearTimeout(timeout);
            document.removeEventListener("visibilitychange", schedule);
        };
    }, [active, playing]);

    return (
        <div
            className="hero-product-showcase"
            role="region"
            aria-roledescription="carousel"
            aria-label={t("Produk pilihan Wilo", "Featured Wilo products")}
            onFocusCapture={(event) => {
                if (!event.target.closest(".hero-product-playback")) setPaused(true);
            }}
        >
            <div
                id="hero-product-slides"
                className="hero-product-stack"
                aria-live={playing ? "off" : "polite"}
                aria-atomic="true"
            >
                {featuredProducts.map((product, index) => {
                    const depth = (index - active + featuredProducts.length) % featuredProducts.length;
                    return (
                        <div
                            className={`hero-product-card${active === index ? " is-active" : ""}${previous === index ? " is-departing" : ""}`}
                            key={product.image}
                            aria-hidden={active !== index}
                            style={{
                                "--stack-layer": featuredProducts.length - depth,
                            } as CSSProperties}
                        >
                            <div className="flex items-center justify-between">
                                <span className="eyebrow !text-[9px] !tracking-[.13em]">
                                    {t("TEKNOLOGI YANG MENGGERAKKAN", "TECHNOLOGY THAT MOVES YOU")}
                                </span>
                                <span className="wilo-wordmark !text-3xl">wilo</span>
                            </div>
                            <div className="hero-pump-row">
                                <img
                                    src={`/images/${product.image}.webp`}
                                    alt={product.name}
                                    width="262"
                                    height="155"
                                />
                                <div>
                                    <span>{product.name}</span>
                                    <p>{translate(product.type, locale)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="hero-product-controls">
                <div
                    className="hero-product-dots"
                    role="group"
                    aria-label={t("Pilih produk", "Choose a product")}
                >
                    {featuredProducts.map((product, index) => (
                        <button
                            type="button"
                            className="hero-product-dot"
                            key={product.image}
                            aria-label={`${t("Tampilkan", "Show")} ${product.name}`}
                            aria-pressed={active === index}
                            aria-controls="hero-product-slides"
                            onClick={() => {
                                setPaused(true);
                                setDeck((current) => current.active === index ? current : {
                                    active: index,
                                    previous: current.active,
                                });
                            }}
                        />
                    ))}
                </div>
                {!reducedMotion && (
                    <button
                        type="button"
                        className="hero-product-playback"
                        onClick={() => setPaused((value) => !value)}
                        aria-label={paused
                            ? t("Lanjutkan pergantian otomatis", "Resume automatic rotation")
                            : t("Jeda pergantian otomatis", "Pause automatic rotation")}
                    >
                        {paused ? <Play size={12} /> : <Pause size={12} />}
                    </button>
                )}
            </div>
            <ScrollButton
                targetId="produk"
                aria-label={t("Jelajahi produk Wilo", "Explore Wilo products")}
                className="round-arrow"
            >
                <ArrowUpRight size={21} />
            </ScrollButton>
        </div>
    );
}
