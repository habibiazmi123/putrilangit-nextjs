import type { Metadata } from "next";
import CompanySite from "@/components/company-site";
import { localeMetadata, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = localeMetadata("en");

export default function EnglishPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <CompanySite locale="en" />
        </>
    );
}
