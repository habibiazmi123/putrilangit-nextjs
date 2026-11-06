import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "PT Putri Langit Sukses",
    description:
        "PT Putri Langit Sukses, authorized Wilo pump dealer in Jakarta. Original pumps and spare parts, pump service, HVAC, installation, commissioning, and energy efficiency.",
    metadataBase: new URL("https://putrilangitsukses.com"),
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#084f43",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
