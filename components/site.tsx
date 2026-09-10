"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Facebook, Instagram, Mail, MapPin, Menu, Phone, Sun, X } from "lucide-react";

const links = [{ href:"/", label:"Home" },{ href:"/about", label:"About" },{ href:"/programs", label:"Programs" },{ href:"/innokit", label:"InnoKit" },{ href:"/innocode", label:"InnoCode" },{ href:"/contact", label:"Contact" }];

const programLinks = [
  { href: "/vacation-school", label: "Vacation School" },
  { href: "/curriculum-integration", label: "Curriculum Integration" },
  { href: "/innokit", label: "InnoKit" },
  { href: "/innocode", label: "InnoCode" },
];

const serviceLinks = [
  { href: "/services/coding", label: "Coding" },
  { href: "/services/robotics", label: "Robotics" },
  { href: "/services/ai", label: "Artificial Intelligence" },
  { href: "/services/ar-vr", label: "AR / VR" },
  { href: "/services/3d-printing", label: "3D Printing" },
  { href: "/services/classes-workshops", label: "Classes & Workshops" },
];

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
];

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

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 20);
    on();
    addEventListener("scroll", on);
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl" : "bg-white/80 backdrop-blur-md"}`}>
      <nav className="container flex h-[74px] items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="button primary !py-2.5 !text-xs">Enrol now <ArrowRight size={15} /></Link>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 lg:hidden" aria-label="Open menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="container border-t border-slate-100 bg-white py-5 lg:hidden">
          <div className="grid gap-1">
            {links.map(l => (
              <Link onClick={() => setOpen(false)} key={l.href} href={l.href} className="rounded-xl px-3 py-3 font-bold text-slate-600">{l.label}</Link>
            ))}
            <Link href="/contact" className="button primary mt-3">Enrol now</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--navy)] text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[#f87171] to-[var(--brand)]" />
      <div className="footer-grid pointer-events-none absolute inset-0" />
      <div className="container relative grid gap-12 pb-14 pt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[280px] text-sm leading-7 text-white/75">
            Creating confident problem-solvers through hands-on STEM learning, one bright idea at a
            time.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              aria-label="Facebook"
              href="https://www.facebook.com/people/Stembotiks/61556667375394/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/10 text-white/80 transition hover:border-transparent hover:bg-[var(--brand)] hover:text-white"
            >
              <Facebook size={16} />
            </a>
            <a
              aria-label="Instagram"
              href="https://www.instagram.com/stembotiks_edutech.ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/10 text-white/80 transition hover:border-transparent hover:bg-[var(--brand)] hover:text-white"
            >
              <Instagram size={16} />
            </a>
          </div>
          <Link href="/contact" className="button primary mt-8 !px-5 !py-2.5 !text-xs">
            Enrol now <ArrowRight size={15} />
          </Link>
        </div>
        <FooterCol title="Explore" links={exploreLinks} />
        <FooterCol title="Programs" links={programLinks} />
        <FooterCol title="Services" links={serviceLinks} />
        <FooterCol title="Legal" links={legalLinks} />
        <div>
          <h4 className="mb-5 text-sm font-bold uppercase tracking-[.14em] text-white/60">
            Contact Us
          </h4>
          <div className="grid gap-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=5+New+Legon+Road,+Adenta-Accra,+Ghana"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 text-sm text-white/80 transition hover:text-white"
            >
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-white/10 text-[var(--brand)] transition group-hover:bg-[var(--brand)] group-hover:text-white">
                <MapPin size={15} />
              </span>
              <span className="pt-1.5">No. 5 New Legon Road, Adenta-Accra, Ghana</span>
            </a>
            <a
              href="tel:+233551244247"
              className="group flex items-center gap-3 text-sm text-white/80 transition hover:text-white"
            >
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-white/10 text-[var(--brand)] transition group-hover:bg-[var(--brand)] group-hover:text-white">
                <Phone size={15} />
              </span>
              <span className="pt-0.5">+233 551 244 247</span>
            </a>
            <a
              href="mailto:info@stembotiks.com"
              className="group flex items-center gap-3 text-sm text-white/80 transition hover:text-white"
            >
              <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-xl bg-white/10 text-[var(--brand)] transition group-hover:bg-[var(--brand)] group-hover:text-white">
                <Mail size={15} />
              </span>
              <span className="pt-0.5">info@stembotiks.com</span>
            </a>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 STEMBOTIKS. Built for tomorrow.</span>
          <span className="flex items-center gap-6">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 text-sm font-bold uppercase tracking-[.14em] text-white/60">{title}</h4>
      <ul className="grid gap-3">
        {links.map(l => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <ChevronRight
                size={14}
                className="-ml-1 text-[var(--brand)] transition-transform group-hover:translate-x-0.5"
              />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
