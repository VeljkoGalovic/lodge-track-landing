import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SUPPORT_EMAIL } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | LodgeTrack",
  description:
    "LodgeTrack terms of service — placeholder terms for the pre-launch period, subject to change before public release.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="September 17, 2026"
      intro="These placeholder terms describe how LodgeTrack may be used once it launches. LodgeTrack is currently in pre-launch and under active development; nothing on this site constitutes an offer of service, and no paid plans are being sold yet."
      sections={[
        {
          heading: "1. Pre-launch status",
          body: [
            "LodgeTrack is a software product under active development. Features, pricing, and availability described on this website are illustrative and subject to change at any time before the public launch.",
            "No accounts are currently being provisioned, and no purchases can be made through this website during the pre-launch period.",
          ],
        },
        {
          heading: "2. Acceptance of terms",
          body: [
            `A binding agreement will be presented for acceptance when the product publicly launches. Until then, these terms are provided for transparency only. If you have questions in the meantime, contact us at ${SUPPORT_EMAIL}.`,
          ],
        },
        {
          heading: "3. Contact",
          body: [
            `For questions about these terms, reach us at ${SUPPORT_EMAIL}.`,
          ],
        },
      ]}
    />
  );
}
