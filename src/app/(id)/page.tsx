import type { Metadata } from "next";
import CompanySite from "@/components/company-site";
import { localeMetadata, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = localeMetadata("id");

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <CompanySite locale="id" />
        </>
    );
}
