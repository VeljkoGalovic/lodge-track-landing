import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SUPPORT_EMAIL } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | LodgeTrack",
  description:
    "LodgeTrack privacy policy — what the pre-launch website collects, and how the product will handle data at launch.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 17, 2026"
      intro="This policy covers the pre-launch LodgeTrack website. The full product privacy policy will be published at public launch; this page describes what happens today."
      sections={[
        {
          heading: "1. What this website collects",
          body: [
            "This pre-launch website is fully static. It sets no tracking cookies, loads no analytics scripts, and stores nothing about your visit on our servers.",
            "Like almost all websites, our hosting provider may keep standard, short-lived server logs (such as IP address and user agent) for security and operational purposes.",
          ],
        },
        {
          heading: "2. Theme and language preferences",
          body: [
            "The site stores two small preferences in your browser — display theme and interface language — via first-party cookies read only by this website. They are never used for tracking and never shared.",
          ],
        },
        {
          heading: "3. At public launch",
          body: [
            "When LodgeTrack launches, accounts will process property, booking, and financial data on behalf of rental operators. A complete privacy policy covering that processing will be published before any account can be created.",
          ],
        },
        {
          heading: "4. Contact",
          body: [
            `For any privacy question or request, contact ${SUPPORT_EMAIL}.`,
          ],
        },
      ]}
    />
  );
}
