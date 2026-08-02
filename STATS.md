# STATS - sources & how to recompute

Every figure used on the CV/résumé, with its **source** and the **exact command**
to refresh it. Re-run these to update (e.g. in a year or two).

_Baseline captured: **2026-07-29**._ Requires: `node`, `python3`, `curl`, and the
generated content (`npm run markdown` → `public/content/*.json`).

---

## 1. Years of experience

- **19 years** professional (first job 2007) · **Freelance since 2013**.
- Method: manual (fixed dates). `2026 − 2007 = 19`.

---

## 2. Projects & clients (from the résumé markdown)

- **~20 projects · ~15 clients** since going freelance (2013).
- Source: `content/resume/*.md` → `public/content/resume.json`.
- Note: Kisio Digital was renamed to **Hove** in the markdown (rebrand), so it
  counts as one client with no special case in the code.

```sh
npm run markdown   # regenerate the JSON first
node -e '
const d=require("./public/content/resume.json");
const since=x=>x.dateStart && x.dateStart>="2013-01-01";
const missions=d.filter(x=>since(x) && !x.openSource && !x.education);
const clients=[...new Set(missions.map(x=>x.company).filter(Boolean))];
console.log("missions:", missions.length, "| clients:", clients.length);
console.log(clients.join(", "));
'
```

---

## 3. Talks & blog posts

- **17 talks · 49 blog posts** = 27 on moox.io (counted) + **22 on
  putaindecode.io** (manual, `putaindecodeArticles` in `src/profile.tsx`).
  Source for the manual figure: <https://putaindecode.io/articles?search=moox>.
  (Secondary stats, not hero tiles.)
- Source: `content/talks/*.md`, `content/blog/*.md`.

```sh
node -e 'console.log("talks:", require("./public/content/talks.json").length,
  "| blog:", require("./public/content/blog.json").length)'
```

---

## 4. Open-source downloads - "created by me"

**Headline: +200M downloads / month** on packages I created (~207M/mo at
baseline). These are the cssnext-era PostCSS plugins I authored, now bundled in
postcss-preset-env - so the downloads are of my code.

### Method (important)

- npm's `author` field is **unreliable** (overwritten by later maintainers).
- The reliable signal for "who created it" is the **first npm publisher**
  (`_npmUser` of the earliest published version). The **definitive** source is
  the repo's **git history (first commit)** - spot-check the big ones there.
- "Created by me" = packages whose **first publisher is `moox`**.

### Recompute (list + total)

```sh
python3 - <<'PY'
import urllib.request, json, urllib.parse
def get(u):
    try: return json.load(urllib.request.urlopen(u, timeout=20))
    except Exception: return None
def dl(p):
    d=get("https://api.npmjs.org/downloads/point/last-month/"+urllib.parse.quote(p,safe="@/"))
    return d.get("downloads") if d and isinstance(d.get("downloads"),int) else 0
def first_publisher(p):
    d=get("https://registry.npmjs.org/"+urllib.parse.quote(p,safe="@/"))
    if not d: return None
    t=sorted([(v,x) for v,x in d.get("time",{}).items()
              if v not in ("created","modified")], key=lambda x:x[1])
    for v,_ in t:
        u=(d.get("versions",{}).get(v,{}) or {}).get("_npmUser",{})
        if isinstance(u,dict) and u.get("name"): return u["name"]
    return None
names=set()
for q in ["maintainer:moox","author:moox"]:
    d=get("https://registry.npmjs.org/-/v1/search?text="+urllib.parse.quote(q)+"&size=250")
    if d:
        for o in d.get("objects",[]): names.add(o["package"]["name"])
mine=[]
for n in names:
    downloads=dl(n)
    if downloads < 500: continue
    if first_publisher(n) == "moox": mine.append((downloads, n))
mine.sort(reverse=True)
total=sum(x[0] for x in mine)
print(f"CREATED by moox: {total:,}/month  (~{total//4:,}/week)")
for d,n in mine[:20]: print(f"  {d:>12,}  {n}")
PY
```

### Baseline result (2026-07-29) - created by moox

| package                                                                         | downloads / month               |
| ------------------------------------------------------------------------------- | ------------------------------- |
| postcss-calc                                                                    | 75.7M                           |
| postcss-custom-properties                                                       | 33.9M                           |
| postcss-color-rebeccapurple                                                     | 32.4M                           |
| postcss-color-hex-alpha                                                         | 32.4M                           |
| postcss-font-variant                                                            | 29.9M                           |
| postcss-message-helpers                                                         | 2.6M                            |
| react-svg-inline · react-topbar-progress-indicator · markdown-it-toc-and-anchor | ~460k                           |
| **TOTAL**                                                                       | **~207M / month (~52M / week)** |

### Named OSS projects (own entries in `content/resume/`)

| project               | figure                                                        | source                                                            |
| --------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| cssnext               | successor postcss-preset-env ~7.8M/wk; cssnext itself ~130/wk | `curl api.npmjs.org/downloads/point/last-week/postcss-preset-env` |
| stylelint             | ~10M/wk (I instigated it - issue #1, community-built)         | `curl api.npmjs.org/downloads/point/last-week/stylelint`          |
| phenomic              | 3.2k ★ · precursor of Next.js SSG                             | GitHub stars (below)                                              |
| rescript-react-native | 35 repos · ~1.2k ★ across the org                             | GitHub org (below)                                                |

**Excluded** (only maintainer, not creator): postcss-selector-parser (611M/mo,
beneb) · postcss-media-minmax (yisi) · postcss-nesting (jonathantneal) ·
color-name (1.36B/mo, dfcreative).

---

## 5. GitHub - followers, total stars, per-repo/org stars

Baseline (2026-07-30): **1 269 followers** · on GitHub **since 2009** · public
repos 158 · **~12 338 stars** across 89 owned non-fork repos.
(For the OSS card use **stars + followers**, NOT repo count - repo count is a
vanity metric. Unauthenticated GitHub API = 60 req/hour.)

```sh
# profile + total stars across owned (non-fork) repos
python3 - <<'PY'
import urllib.request, json
def get(u):
    r=urllib.request.Request(u, headers={"Accept":"application/vnd.github+json","User-Agent":"cv"})
    try: return json.load(urllib.request.urlopen(r, timeout=20))
    except Exception as e: return {"error":str(e)}
u=get("https://api.github.com/users/MoOx")
print("followers:",u.get("followers"),"| public_repos:",u.get("public_repos"),"| since:",u.get("created_at","")[:4])
stars=n=0
for page in range(1,4):
    r=get(f"https://api.github.com/users/MoOx/repos?per_page=100&type=owner&page={page}")
    if not isinstance(r,list) or not r: break
    for x in r:
        if not x.get("fork"): stars+=x.get("stargazers_count",0); n+=1
print("owned non-fork repos:",n,"| total stars:",stars)
PY

# single repo / whole org
curl -s "https://api.github.com/repos/MoOx/phenomic" | grep -oE '"stargazers_count":[0-9]+'
curl -s "https://api.github.com/orgs/rescript-react-native/repos?per_page=100" \
 | python3 -c "import sys,json;r=json.load(sys.stdin);print('repos',len(r),'stars',sum(x['stargazers_count'] for x in r))"
```

Baseline: phenomic **3 173 ★** · rescript-react-native org **35 repos, ~1 226 ★**.

---

## 6. Per-project stats (external / manual)

Some figures come from clients / public data, not computable here - recorded in
each entry's `stats:` frontmatter (`content/resume/*.md`).

- **Hove** (`2019-transport-mobile-app.md`): 900M+ trips/year, 4M+ people,
  ~3M app downloads - **public network data** (TCL, Ilévia, TBM). Team/lead &
  CI numbers = personal record.
- **Aardvark** (`2024-aardvark.md`): 50k+ virtualized rows, 2-week releases,
  team of 3 - personal record.
- **IUT** (`2020-teacher-university.md`): ~200 students = 1–2 classes of 20 over
  the taught years (estimate). **6 academic years, not 8** - the 2012–2020 span
  has a 2015–2017 gap; count the `group: iut-blagnac` entries to recheck:
  `ls content/resume/*teacher-university.md | wc -l`.

---

## 7. Where the numbers live in the code

- Global profile stats → `src/profile.tsx` (`profileStats`).
- Per-entry stats → `content/resume/*.md` frontmatter (`stats:`), typed as
  `ResumeStat` in `src/api.tsx`.
