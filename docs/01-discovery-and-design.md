# 01 — Discovery & Design Direction

## 1. Reference analysis (zolt-portfolio.framer.website)

| Aspect | Observation | What we adopt |
| --- | --- | --- |
| Visual language | Warm, paper-like canvas; calm, confident, single-column editorial flow with bento-style cards | Warm paper canvas, editorial flow, card surfaces |
| Typography | Satoshi (UI/body) + Inter Display (headings); large tight headlines; small eyebrows written as `// About me` | Grotesk display + clean body, `//` eyebrow labels, oversized headlines with tight tracking |
| Palette | `#FAF9F7` canvas, `#F0EDE8` surface, `#D6D0C8` hairlines, near-black ink, deep teal `#1B3A4B` / `#4E6E7E`, orange `#FF5C00` accent, green availability dot | Same family of tokens (see §3) |
| Navigation | Minimal floating pill nav, few links, availability badge | Floating pill header with active indicator + availability badge |
| Hero | Greeting, name, role, short positioning paragraph, two CTAs (Download CV / Let's connect) | Staggered headline reveal, three CTAs, portrait card |
| Projects | Large cards with duration, year, client, role and a one-line story | Project cards with year, role, industry, stack tags and hover image zoom |
| Experience | Numbered timeline (`01`, `02`…) with stack chips and highlight line | Numbered timeline with stack chips |
| Spacing | Generous vertical rhythm (~120–160px between sections on desktop) | Section spacing `clamp(5rem, 10vw, 10rem)` |
| Image treatment | Rounded cards (16–24px), soft shadows, subtle borders | `rounded-2xl/3xl`, hairline borders, image mask reveals |
| Motion | Soft fade/slide entrances, hover lifts, counters | GSAP scroll reveals, Motion micro-interactions, Lenis smooth scroll |
| Footer | Big closing statement, local time | Big closing CTA, Abuja local time, social links |

What we deliberately do **not** copy: the template's content, pricing widgets, gamified "surprise" card,
music player, and its stats/testimonials. Daniel's site is an engineering portfolio — every number shown
must come from the CV or the CMS.

## 2. Visual identity — "Engineered Editorial"

A warm editorial canvas with an engineer's precision. Paper tones and big type give it the calm of a
printed magazine; mono eyebrows, hairline grids and numbered sections give it the rigour of a technical
document. Teal is the brand's "depth" colour (dark sections, logo); orange is the signal colour used
sparingly (CTAs, focus rings, the logo dot).

### Logo
`imdanielubani` wordmark + a **monogram mark**: a rounded-square tile in deep teal containing a geometric
lowercase **"du"** with an orange signal dot. The dot doubles as the favicon accent.

## 3. Design tokens

| Token | Light | Dark |
| --- | --- | --- |
| `--canvas` | `#FAF9F7` | `#0D1820` |
| `--surface` | `#F0EDE8` | `#13222C` |
| `--surface-2` | `#FFFFFF` | `#182B37` |
| `--line` | `#D6D0C8` | `#2A3E4A` |
| `--ink` | `#111111` | `#F3F1EC` |
| `--ink-muted` | `#5C6670` | `#9AAAB4` |
| `--teal-900` | `#1B3A4B` | `#1B3A4B` |
| `--teal-600` | `#4E6E7E` | `#7E9EAE` |
| `--accent` | `#FF5C00` | `#FF6A1A` |
| `--success` | `#22A35A` | `#40C463` |

- **Fonts:** `Inter Tight` (display & UI), `Instrument Serif` italic (editorial accents in headlines),
  `JetBrains Mono` (eyebrows, metadata). Self-hosted through `next/font`.
- **Type scale:** display `clamp(2.75rem, 7vw, 6.5rem)`, h2 `clamp(2rem, 4.5vw, 3.75rem)`, h3 `1.5rem`,
  body `1.0625rem / 1.65`, small `0.875rem`, eyebrow `0.75rem` uppercase mono.
- **Weights:** 400, 500, 600 (display uses 500 with `-0.04em` tracking).
- **Radius:** `sm 8px`, `md 12px`, `lg 16px`, `xl 24px`, `pill 999px`.
- **Shadow:** `0 1px 2px rgb(0 0 0 / .05), 0 8px 24px -12px rgb(0 0 0 / .15)`.
- **Layout:** container `1280px`, gutter `clamp(1rem, 4vw, 2.5rem)`, 12-column grid.
- **Breakpoints:** Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`).
- **Motion presets:** ease `cubic-bezier(.22,1,.36,1)`, durations 0.2s (micro), 0.6s (entrance),
  0.9s (masks); stagger 0.06s. All disabled under `prefers-reduced-motion`.

## 4. Sitemap

```
/                       Home (CMS page "home" — sections)
/about                  About (CMS page "about" — sections)
/projects               Projects listing (filters, search, load more)
/projects/[slug]        Case study
/experience             Experience timeline
/skills                 Skills by category
/resume                 Resume overview + PDF download
/contact                Contact details + form
/[slug]                 Any CMS-created page (services, uses, now, faq…)
/sitemap.xml /robots.txt
```

## 5. Page layouts

- **Home:** hero (headline, copy, location, 3 CTAs, portrait) → intro → selected projects → expertise →
  experience → achievements → philosophy → contact CTA → footer.
- **About:** portrait + bio → career journey → philosophy → what I bring → interests & aspirations →
  CV download → CTA.
- **Projects:** header → featured strip → category tabs + tech filter + search → grid → load more.
- **Case study:** hero → meta bar (role, timeline, industry, status) → overview → problem → objectives →
  challenges → solution → architecture → features → stack → gallery → outcomes → lessons → links →
  prev/next → related → CTA.
- **Experience / Skills / Resume / Contact:** dedicated templates fed by CMS entities.
