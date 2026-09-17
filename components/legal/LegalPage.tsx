import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SUPPORT_EMAIL } from "@/components/Footer";

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

/**
 * Shared shell for the pre-launch compliance pages. Keeping one component means
 * the three pages stay consistent with each other and with the landing page's
 * dark brand treatment without each route restating it.
 */
export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 md:px-10 py-16 md:py-24 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#36BFAE] transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
          {title}
        </h1>
        <p className="text-xs text-slate-500 mb-8">Last updated: {updated}</p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BA87FF]/10 border border-[#BA87FF]/30 w-fit mb-8">
          <span aria-hidden="true">🚧</span>
          <span className="text-xs font-medium text-[#D6B7FF]">
            LodgeTrack is in pre-launch — under active development
          </span>
        </div>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10">
          {intro}
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-slate-400 text-sm md:text-base leading-relaxed mb-3"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="text-sm text-slate-400 mt-12 pt-6 border-t border-white/[0.06]">
          Questions?{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[#36BFAE] hover:text-[#45eed9] transition-colors"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </div>
  );
}
