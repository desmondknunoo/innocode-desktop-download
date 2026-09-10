"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Logo({ inverse = false, priority = false }: { inverse?: boolean; priority?: boolean }) {
  return (
    <Link href="/" className={`logo${inverse ? " logo--inverse" : ""}`} aria-label="STEMBOTIKS home">
      <Image
        src="/images/stembotiks.png"
        alt="STEMBOTIKS"
        width={1834}
        height={475}
        priority={priority}
        className="h-[38px] w-auto"
      />
    </Link>
  );
}

export function SectionHeading({ eyebrow, title, copy, center = false }: { eyebrow: string; title: React.ReactNode; copy?: string; center?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-extrabold leading-[1.13] text-[var(--navy)] sm:text-4xl md:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-[.96rem] leading-7 text-slate-600">{copy}</p>}
    </motion.div>
  );
}

export const ArrowLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-[var(--navy)] transition hover:gap-2">
    {children} <ChevronRight size={16} />
  </Link>
);
