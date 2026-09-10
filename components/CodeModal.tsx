"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Download, Globe, MonitorDown, X } from "lucide-react";

const LINK_URL = "https://github.com/innocode/link";

export default function CodeModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<"choose" | "online">("choose");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Choose how to use InnoCode"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-[var(--navy)] px-6 py-8 text-center sm:px-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <Image
            src="/images/innocode-logo.svg"
            alt="InnoCode"
            width={280}
            height={54}
            className="mx-auto h-auto w-[min(280px,78%)]"
          />
        </div>
        <div className="px-6 pt-6 sm:px-8">
          <h2 className="text-center text-2xl font-extrabold text-[var(--navy)]">
            How would you like to code?
          </h2>
        </div>

        {view === "choose" ? (
          <div className="grid gap-4 px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
            <button
              onClick={() => setView("online")}
              className="group flex items-center gap-4 rounded-2xl border-2 border-slate-200 p-5 text-left transition hover:border-[var(--brand)] hover:shadow-lg"
            >
              <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-[#eef4fb] text-[var(--navy)] transition group-hover:bg-[#fef2f2] group-hover:text-[var(--brand)]">
                <Globe size={22} />
              </span>
              <span className="flex-1">
                <span className="block text-base font-bold text-[var(--navy)]">Code Online</span>
                <span className="mt-0.5 block text-sm text-slate-500">
                  Use InnoCode in your browser
                </span>
              </span>
              <ArrowRight size={18} className="text-slate-300 transition group-hover:text-[var(--brand)]" />
            </button>

            <a
              href="/innocode"
              className="group flex items-center gap-4 rounded-2xl border-2 border-slate-200 p-5 text-left transition hover:border-[var(--brand)] hover:shadow-lg"
            >
              <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl bg-[#eef4fb] text-[var(--navy)] transition group-hover:bg-[#fef2f2] group-hover:text-[var(--brand)]">
                <MonitorDown size={22} />
              </span>
              <span className="flex-1">
                <span className="block text-base font-bold text-[var(--navy)]">Code Offline</span>
                <span className="mt-0.5 block text-sm text-slate-500">
                  Download the InnoCode desktop app
                </span>
              </span>
              <ArrowRight size={18} className="text-slate-300 transition group-hover:text-[var(--brand)]" />
            </a>
          </div>
        ) : (
          <div className="px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
            <div className="rounded-2xl bg-[#fef2f2] p-6">
              <h3 className="text-base font-extrabold text-[var(--navy)]">
                First, download & install InnoCode Link
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                InnoCode Link is the companion app that connects your browser to your board. Install
                it once, then come back to start coding online.
              </p>
              <span className="button mt-5 w-full justify-center opacity-60 cursor-not-allowed">
                <Download size={16} /> Coming Soon
              </span>
            </div>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                or
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="rounded-2xl border-2 border-slate-200 p-6">
              <h3 className="text-base font-extrabold text-[var(--navy)]">
                Already have InnoCode Link?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                You're all set. Jump straight into the InnoCode online editor and start building
                right away.
              </p>
              <a
                href="https://code.stembotiks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="button dark mt-5 w-full justify-center"
              >
                Start Coding Online <ArrowRight size={16} />
              </a>
            </div>
            <button
              onClick={() => setView("choose")}
              className="mt-5 text-sm font-bold text-slate-400 transition hover:text-[var(--navy)]"
            >
              ← Back to options
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
