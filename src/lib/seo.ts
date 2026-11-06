import type { Metadata } from "next";

export const siteUrl = "https://putrilangitsukses.com";
export const siteName = "PT Putri Langit Sukses";

const copy = {
    id: {
        lang: "id",
        title: "Authorized Dealer Wilo & Solusi Pompa dan HVAC | PT Putri Langit Sukses",
        description:
            "PT Putri Langit Sukses, authorized dealer pompa Wilo di Jakarta. Unit dan spare part orisinal, service pompa, HVAC, instalasi, commissioning, dan efisiensi energi.",
        ogLocale: "id_ID",
        path: "/",
    },
    en: {
        lang: "en",
        title: "Authorized Wilo Dealer & Pump and HVAC Solutions | PT Putri Langit Sukses",
        description:
            "PT Putri Langit Sukses, authorized Wilo pump dealer in Jakarta. Original pumps and spare parts, pump service, HVAC, installation, commissioning, and energy efficiency.",
        ogLocale: "en_US",
        path: "/en",
    },
} as const;

export type LocaleKey = keyof typeof copy;

export function localeMetadata(locale: LocaleKey): Metadata {
    const entry = copy[locale];
    const url = `${siteUrl}${entry.path}`;

    return {
        metadataBase: new URL(siteUrl),
        title: entry.title,
        description: entry.description,
        alternates: {
            canonical: url,
            languages: {
                id: `${siteUrl}/`,
                en: `${siteUrl}/en`,
                "x-default": `${siteUrl}/`,
            },
        },
        openGraph: {
            type: "website",
            siteName,
            title: entry.title,
            description: entry.description,
            url,
            locale: entry.ogLocale,
            images: [
                {
                    url: `${siteUrl}/images/social-preview.jpg`,
                    width: 1200,
                    height: 630,
                    alt: siteName,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: entry.title,
            description: entry.description,
            images: [`${siteUrl}/images/social-preview.jpg`],
        },
        icons: {
            icon: [{ url: "/images/icon.png", type: "image/png" }],
            apple: "/images/icon.png",
        },
    };
}

export const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${siteUrl}/#organization`,
            name: siteName,
            url: `${siteUrl}/`,
            logo: `${siteUrl}/images/logo.png`,
            description: copy.id.description,
            email: "putrilangitsukses@gmail.com",
            telephone: "+6281386929285",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Menteng Niaga Blok Collins 1 No. 26",
                addressLocality: "Jakarta Timur",
                addressRegion: "DKI Jakarta",
                addressCountry: "ID",
            },
            contactPoint: {
                "@type": "ContactPoint",
                telephone: "+6281386929285",
                contactType: "sales",
                availableLanguage: ["Indonesian", "English"],
            },
            hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Pump & HVAC Solutions",
                itemListElement: [
                    "Wilo Pump Supply & Original Spare Parts",
                    "Pump Service & Overhaul",
                    "HVAC & AC Services",
                    "Central AC / VRV / VRF",
                    "Installation & Commissioning",
                    "Retrofit & Energy Efficiency",
                    "Contract Maintenance",
                ].map((name) => ({
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name },
                })),
            },
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: siteName,
            inLanguage: ["id", "en"],
            publisher: { "@id": `${siteUrl}/#organization` },
        },
    ],
};
