"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Cpu, Download } from "lucide-react";

type OS = "Windows" | "macOS" | "Linux" | "Other";
type MacArch = "Intel" | "Apple Silicon";
type ReleaseAsset = { name: string; download_count: number };
type GitHubRelease = { assets?: ReleaseAsset[] };
type DownloadStats = { total: number; byAsset: Record<string, number> };

const DOWNLOADS_API =
  "https://api.github.com/repos/desmondknunoo/innocode-desktop-download/releases";
const compactNumber = new Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumFractionDigits: 1,
});
const exactNumber = new Intl.NumberFormat();

const MAC_DOWNLOADS: Record<MacArch, { meta: string; href: string }> = {
  Intel: {
    meta: ".dmg · Intel",
    href: "https://drive.google.com/file/d/1u7hMJUQLxC1tzxQ8Q0GSG67QvonKpjjA/view?usp=sharing",
  },
  "Apple Silicon": {
    meta: ".dmg · M Series",
    href: "https://drive.google.com/file/d/1QDm5mBDpI0-zAyBwUH1TeT42N0c8qLHu/view?usp=sharing",
  },
};

const WIN_DOWNLOADS: { meta: string; href: string } = {
  meta: ".exe · x64",
  href: "https://github.com/desmondknunoo/innocode-desktop-download/releases/download/v1.1.0/InnoCode_v1.1.0_win_x64.exe",
};

const WIN_ASSET = "InnoCode_v1.1.0_win_x64.exe";
const LINUX_ASSET = "InnoCode_v1.1.0_linux_amd64.deb";

const LINUX_REQS = [
  "Ubuntu 20.04 / Debian 11 or newer",
  "4 GB RAM · 1.6 GB free disk space",
  "Internet connection for first-time setup",
];

function detectOS(): OS {
  const ua = navigator.userAgent;
  const uaData = (navigator as unknown as {
    userAgentData?: { platform?: string; mobile?: boolean };
  }).userAgentData;
  const platform = uaData?.platform ?? "";
  if (uaData?.mobile || /android/i.test(ua) || /iPhone|iPad|iPod/i.test(ua)) return "Other";
  if (/mac/i.test(platform) || /Mac/.test(ua)) return "macOS";
  if (/win/i.test(platform) || /Windows/.test(ua)) return "Windows";
  if (/linux/i.test(platform) || /Linux|X11/.test(ua)) return "Linux";
  return "Other";
}

async function fetchDownloadStats(): Promise<DownloadStats> {
  const response = await fetch(DOWNLOADS_API, {
    cache: "no-store",
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);

  const releases = (await response.json()) as GitHubRelease[];
  const byAsset: Record<string, number> = {};

  for (const release of releases) {
    for (const asset of release.assets ?? []) {
      byAsset[asset.name] = (byAsset[asset.name] ?? 0) + asset.download_count;
    }
  }

  return {
    byAsset,
    total: Object.values(byAsset).reduce((sum, count) => sum + count, 0),
  };
}

function DownloadCount({
  assetName,
  stats,
  error,
}: {
  assetName: string | null;
  stats: DownloadStats | null;
  error: boolean;
}) {
  if (assetName === null) {
    return (
      <div className="mt-5 border-y border-slate-200 py-4" aria-label="macOS downloads coming soon">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-400">Downloads</p>
        <p className="mt-1 text-lg font-extrabold text-slate-500">Coming soon</p>
      </div>
    );
  }

  const count = stats?.byAsset[assetName] ?? 0;
  const value = error ? "—" : stats ? compactNumber.format(count) : "...";
  const exactValue = stats ? exactNumber.format(count) : "Download count loading";

  return (
    <div
      className="mt-5 border-y border-slate-200 py-4"
      aria-label={`${exactValue} downloads`}
      aria-live="polite"
      title={stats ? `${exactValue} downloads` : undefined}
    >
      <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--navy)]">
        <Download className="h-4 w-4 text-[var(--brand)]" aria-hidden="true" />
        Downloads
      </p>
      <p className="mt-1 whitespace-nowrap text-3xl font-extrabold leading-none text-[var(--brand)] sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

async function detectMacArch(): Promise<MacArch | null> {
  const uaData = (navigator as unknown as {
    userAgentData?: {
      getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
    };
  }).userAgentData;

  try {
    const hints = await uaData?.getHighEntropyValues?.(["architecture"]);
    if (hints?.architecture === "arm") return "Apple Silicon";
    if (hints?.architecture === "x86") return "Intel";
  } catch {}

  const platform = navigator.platform ?? "";
  if (/arm/i.test(platform)) return "Apple Silicon";
  if (/intel|x86|i386/i.test(platform)) return "Intel";
  return null;
}

function Requirements({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-[var(--navy)]"
      >
        <span>System requirements</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="space-y-2 border-t border-slate-200 px-4 py-3">
          {items.map((req) => (
            <li key={req} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand)]" />
              {req}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function InnoCodeDownload() {
  const [os, setOs] = useState<OS | null>(null);
  const [macTab, setMacTab] = useState<MacArch>("Intel");
  const [downloadStats, setDownloadStats] = useState<DownloadStats | null>(null);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    const detectedOS = detectOS();
    setOs(detectedOS);
    if (detectedOS === "macOS") {
      detectMacArch().then((arch) => {
        if (arch) setMacTab(arch);
      });
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchDownloadStats()
      .then((stats) => {
        if (active) setDownloadStats(stats);
      })
      .catch(() => {
        if (active) setDownloadError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const detected: OS | null =
    os === "Windows" || os === "macOS" || os === "Linux" ? os : null;

  return (
    <>
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-[var(--brand-tint)] px-4 py-2 text-sm font-extrabold text-[var(--navy)]">
          <Download className="h-4 w-4 text-[var(--brand)]" aria-hidden="true" />
          <span title={downloadStats ? `${exactNumber.format(downloadStats.total)} total downloads` : undefined}>
            {downloadError
              ? "Downloads unavailable"
              : downloadStats
                ? `${compactNumber.format(downloadStats.total)} total downloads`
                : "Loading downloads..."}
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
      {/* macOS Card */}
      <div
        className={`card relative flex flex-col p-8 ${
          detected === "macOS" ? "card-detected" : ""
        }`}
      >
        {detected === "macOS" && (
          <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--brand)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">
            <Check size={14} strokeWidth={3} />
            Your device
          </span>
        )}
        <span className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-slate-100 bg-white shadow-[0_4px_0_0_rgba(10,42,102,0.08)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#111">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.17.05-2.61.78-3.46 1.75-.76.85-1.41 2.25-1.23 3.11 1.33.1 2.99-.88 3.68-1.71" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-[var(--navy)]">macOS</h3>
        <p className="mt-1 text-sm text-slate-500">Apple</p>
        <DownloadCount assetName={null} stats={downloadStats} error={downloadError} />

        <div className="mt-5 flex rounded-lg bg-slate-100 p-1">
          {(["Intel", "Apple Silicon"] as MacArch[]).map((arch) => (
            <button
              key={arch}
              onClick={() => setMacTab(arch)}
              className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all ${
                macTab === arch
                  ? "bg-white text-[var(--navy)] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {arch}
            </button>
          ))}
        </div>

        <Requirements
          items={[
            "macOS 11.0 (Big Sur) or newer",
            "4 GB RAM · 2 GB free disk space",
            "Internet connection for first-time setup",
          ]}
        />

        <div className="mt-auto pt-5">
          <a
            href={MAC_DOWNLOADS[macTab].href}
            target="_blank"
            rel="noreferrer"
            aria-disabled="true"
            onClick={(e) => e.preventDefault()}
            className="button red block w-full cursor-not-allowed text-center opacity-50"
          >
            Coming soon
          </a>
          <p className="mt-2 text-center text-xs text-slate-400">macOS support is coming soon</p>
        </div>
      </div>

      {/* Windows Card */}
      <div
        className={`card relative flex flex-col p-8 ${
          detected === "Windows" ? "card-detected" : ""
        }`}
      >
        {detected === "Windows" && (
          <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--brand)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">
            <Check size={14} strokeWidth={3} />
            Your device
          </span>
        )}
        <span className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-slate-100 bg-white shadow-[0_4px_0_0_rgba(10,42,102,0.08)]">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#00a1f1">
            <path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z" />
          </svg>
        </span>
        <h3 className="mt-5 text-xl font-bold text-[var(--navy)]">Windows</h3>
        <p className="mt-1 text-sm text-slate-500">x64</p>
        <DownloadCount assetName={WIN_ASSET} stats={downloadStats} error={downloadError} />

        <Requirements
          items={[
            "Windows 10 or newer (64-bit)",
            "4 GB RAM · 1.6 GB free disk space",
            "Internet connection for first-time setup",
          ]}
        />

        <div className="mt-auto pt-5">
          <a
            href={WIN_DOWNLOADS.href}
            target="_blank"
            rel="noreferrer"
            className="button red block w-full text-center"
          >
            Download
          </a>
          <p className="mt-2 text-center text-xs text-slate-400">{WIN_DOWNLOADS.meta}</p>
        </div>
      </div>

      {/* Linux Card */}
      <div
        className={`card relative flex flex-col p-8 ${
          detected === "Linux" ? "card-detected" : ""
        }`}
      >
        {detected === "Linux" && (
          <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--brand)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">
            <Check size={14} strokeWidth={3} />
            Your device
          </span>
        )}
        <span className="grid h-16 w-16 place-items-center rounded-2xl border-2 border-slate-100 bg-white shadow-[0_4px_0_0_rgba(10,42,102,0.08)]">
          <Cpu className="h-8 w-8 text-[var(--brand)]" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-[var(--navy)]">Linux</h3>
        <p className="mt-1 text-sm text-slate-500">Ubuntu / Debian</p>
        <DownloadCount assetName={LINUX_ASSET} stats={downloadStats} error={downloadError} />

        <Requirements items={LINUX_REQS} />

        <div className="mt-auto pt-5">
          <a
            href="https://github.com/desmondknunoo/innocode-desktop-download/releases/download/v1.1.0/InnoCode_v1.1.0_linux_amd64.deb"
            target="_blank"
            rel="noreferrer"
            className="button red block w-full text-center"
          >
            Download
          </a>
        </div>
      </div>
      </div>
    </>
  );
}
