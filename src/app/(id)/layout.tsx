import type { Metadata, Viewport } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "PT Putri Langit Sukses",
    description:
        "PT Putri Langit Sukses, authorized dealer pompa Wilo di Jakarta. Unit dan spare part orisinal, service pompa, HVAC, instalasi, commissioning, dan efisiensi energi.",
    metadataBase: new URL("https://putrilangitsukses.com"),
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#084f43",
};

export default function IndonesianLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="id">
            <body>{children}</body>
        </html>
    );
}
