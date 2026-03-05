const REPO_OWNER = "mwierciak";
const REPO_NAME = "pentad-desktop";
const FALLBACK_URL = "/pentad-desktop-0.1.0-win-setup.exe";
const FALLBACK_VERSION = "v0.1.0";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface ReleaseResponse {
  tag_name: string;
  assets: ReleaseAsset[];
}

async function getLatestRelease(): Promise<{ url: string; version: string }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      return { url: FALLBACK_URL, version: FALLBACK_VERSION };
    }

    const data: ReleaseResponse = await res.json();
    const exe = data.assets.find((a) => a.name.endsWith("-win-setup.exe"));

    return {
      url: exe?.browser_download_url ?? FALLBACK_URL,
      version: data.tag_name || FALLBACK_VERSION,
    };
  } catch {
    return { url: FALLBACK_URL, version: FALLBACK_VERSION };
  }
}

export async function DownloadButton() {
  const { url, version } = await getLatestRelease();

  return (
    <div className="animate-fade-in-up delay-700 flex flex-col items-center gap-4">
      <a
        href={url}
        download
        className="group relative flex h-14 items-center gap-3 rounded-sm border-2 border-[var(--ink)] bg-[var(--ink)] px-8 font-[family-name:var(--font-geist-sans)] text-sm font-semibold text-[var(--paper)] transition-all duration-200 hover:bg-[var(--paper)] hover:text-[var(--ink)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-y-0.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download for Windows
      </a>
      <span className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-wide text-[var(--pencil)]">
        {version} &middot; Windows 10+
      </span>
    </div>
  );
}
