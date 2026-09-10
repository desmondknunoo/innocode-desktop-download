import Image from "next/image";
import { SectionHeading } from "@/components/site";
import InnoCodeDownload from "@/components/InnoCodeDownload";
import InnoCodeButton from "@/components/InnoCodeButton";
import { FadeUp } from "@/components/motion";

export const metadata = { title: "InnoCode" };

export default function InnoCodePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-[var(--navy)] text-white">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[var(--brand)]/25 blur-3xl" />
        <div className="container relative z-10 flex min-h-[520px] flex-col items-center justify-center py-20 text-center">
          <FadeUp className="flex w-full flex-col items-center">
            <Image
              src="/images/innocode-logo.svg"
              alt="InnoCode"
              width={560}
              height={108}
              priority
              className="mx-auto mt-8 h-auto w-[min(560px,82vw)]"
            />
            <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">
              Learn block coding with the InnoCode desktop app; build real projects and get instant feedback, made for all coders.
            </p>
            <InnoCodeButton
              label="Code Online"
              className="button white mt-8"
            />
          </FadeUp>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeUp>
            <SectionHeading
              eyebrow="Code Offline"
              title="Download InnoCode"
              center
            />
          </FadeUp>
          <div className="-mt-6">
            <InnoCodeDownload />
          </div>
        </div>
      </section>
    </main>
  );
}
