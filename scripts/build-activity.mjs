import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const output = path.join(root, "public", "activity.json");

const USER = "LDKhangg";
const API = "https://api.github.com";

function defaultActivity() {
  return {
    generatedAt: new Date().toISOString(),
    leetcodeProgress: {
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      repoUrl: `https://github.com/${USER}/leetcode`,
    },
    latestUpdates: [],
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-activity-script",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}) for ${url}`);
  }

  return response.json();
}

async function readExisting() {
  try {
    const content = await readFile(output, "utf8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

async function fetchRepoTree(name) {
  const repo = await fetchJson(`${API}/repos/${USER}/${name}`);
  const tree = await fetchJson(`${API}/repos/${USER}/${name}/git/trees/${repo.default_branch}?recursive=1`);
  return { repo, tree: Array.isArray(tree.tree) ? tree.tree : [] };
}

function countDifficultyFiles(tree) {
  const counts = { easy: 0, medium: 0, hard: 0 };

  for (const item of tree) {
    if (item.type !== "blob" || !item.path.endsWith(".java")) continue;
    if (item.path.startsWith("src/easy/")) counts.easy += 1;
    if (item.path.startsWith("src/medium/")) counts.medium += 1;
    if (item.path.startsWith("src/hard/")) counts.hard += 1;
  }

  return counts;
}

async function fetchLatestCommit(name, repoLabel) {
  const commits = await fetchJson(`${API}/repos/${USER}/${name}/commits?per_page=1`);
  const latest = Array.isArray(commits) ? commits[0] : null;

  if (!latest) {
    return {
      repo: name,
      repoLabel,
      url: `https://github.com/${USER}/${name}`,
      message: "",
      pushedAt: "",
      relativeRepo: name,
      available: false,
    };
  }

  return {
    repo: name,
    repoLabel,
    url: latest.html_url ?? `https://github.com/${USER}/${name}`,
    message: latest.commit?.message?.split("\n")[0] ?? "",
    pushedAt: latest.commit?.committer?.date ?? "",
    relativeRepo: name,
    available: true,
  };
}

async function fetchRecentRepoUpdates(limit = 4) {
  const repos = await fetchJson(`${API}/users/${USER}/repos?per_page=100&sort=updated`);
  const candidates = Array.isArray(repos)
    ? repos
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.pushed_at ?? 0).getTime() - new Date(a.pushed_at ?? 0).getTime())
        .slice(0, limit)
    : [];

  const updates = await Promise.all(
    candidates.map(async (repo) => {
      const commit = await fetchLatestCommit(repo.name, repo.name);
      return {
        ...commit,
        repoLabel: repo.name,
      };
    }),
  );

  return updates.filter((update) => update.available && update.pushedAt);
}

function readLocalPortfolioUpdate() {
  try {
    const sha = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
    const message = execFileSync("git", ["log", "-1", "--pretty=%s"], { cwd: root, encoding: "utf8" }).trim();
    const pushedAt = execFileSync("git", ["log", "-1", "--pretty=%cI"], { cwd: root, encoding: "utf8" }).trim();

    return {
      repo: "portfolio",
      repoLabel: "portfolio",
      url: `https://github.com/${USER}/portfolio/commit/${sha}`,
      message,
      pushedAt,
      relativeRepo: "portfolio",
      available: true,
    };
  } catch {
    return null;
  }
}

function mergePortfolioFallback(existing) {
  const localPortfolio = readLocalPortfolioUpdate();
  const latestUpdates = Array.isArray(existing?.latestUpdates) ? [...existing.latestUpdates] : [];

  if (localPortfolio) {
    const withoutPortfolio = latestUpdates.filter((update) => update.repo !== "portfolio");
    latestUpdates.splice(0, latestUpdates.length, localPortfolio, ...withoutPortfolio);
  }

  return {
    ...(existing ?? defaultActivity()),
    generatedAt: new Date().toISOString(),
    latestUpdates: latestUpdates.slice(0, 4),
  };
}

async function buildActivity() {
  const existing = await readExisting();

  try {
    const [{ repo: leetcodeRepo, tree }, recentUpdates] = await Promise.all([
      fetchRepoTree("leetcode"),
      fetchRecentRepoUpdates(4),
    ]);

    const { easy, medium, hard } = countDifficultyFiles(tree);

    return {
      generatedAt: new Date().toISOString(),
      leetcodeProgress: {
        totalSolved: easy + medium + hard,
        easy,
        medium,
        hard,
        repoUrl: leetcodeRepo.html_url,
      },
      latestUpdates: recentUpdates,
    };
  } catch (error) {
    console.warn("[activity] Falling back to existing activity data.");
    console.warn(error instanceof Error ? error.message : error);
    return mergePortfolioFallback(existing);
  }
}

const data = await buildActivity();

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(data, null, 2)}\n`, "utf8");

console.log(`[activity] Wrote ${path.relative(root, output)}`);
