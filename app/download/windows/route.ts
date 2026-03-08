import { NextResponse } from "next/server";

const RELEASES_URL = "https://github.com/mwierciak/pentad-desktop/releases";
const LATEST_RELEASE_URL =
  "https://api.github.com/repos/mwierciak/pentad-desktop/releases/latest";

type GitHubReleaseAsset = {
  browser_download_url: string;
  name: string;
};

type GitHubRelease = {
  assets?: GitHubReleaseAsset[];
  html_url?: string;
};

function scoreWindowsAsset(name: string) {
  const normalizedName = name.toLowerCase();
  let score = 0;

  if (normalizedName.endsWith(".exe")) score += 4;
  if (normalizedName.endsWith(".msi")) score += 3;
  if (normalizedName.includes("windows")) score += 2;
  if (normalizedName.includes("win")) score += 2;
  if (normalizedName.includes("setup")) score += 1;
  if (normalizedName.includes("installer")) score += 1;

  return score;
}

async function getLatestWindowsDownloadUrl() {
  const token =
    process.env.PENTAD_DESKTOP_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "pentad-landing",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(LATEST_RELEASE_URL, {
    headers,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    return RELEASES_URL;
  }

  const release = (await response.json()) as GitHubRelease;
  const bestAsset = (release.assets ?? [])
    .map((asset) => ({ asset, score: scoreWindowsAsset(asset.name) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)[0]?.asset;

  return bestAsset?.browser_download_url ?? release.html_url ?? RELEASES_URL;
}

export async function GET() {
  const targetUrl = await getLatestWindowsDownloadUrl();
  return NextResponse.redirect(targetUrl, 307);
}
