import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { SUPPORT_EMAIL } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact & Support | LodgeTrack",
  description:
    "How to reach the LodgeTrack team during pre-launch — questions, feedback, and support.",
};

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact & Support"
      updated="September 17, 2026"
      intro="LodgeTrack is in pre-launch and under active development. The fastest way to reach the team during this period is email — we read everything and reply as time allows."
      sections={[
        {
          heading: "Support and general questions",
          body: [
            `Email ${SUPPORT_EMAIL} for anything about LodgeTrack — product questions, feedback, partnership inquiries, or issues with this website.`,
          ],
        },
        {
          heading: "Before the public launch",
          body: [
            "There is no account system yet, so there is no account support. If you joined a waitlist or early-access list, we will contact you directly when launch approaches.",
          ],
        },
      ]}
    />
  );
}
