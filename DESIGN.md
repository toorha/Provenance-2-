---
version: 1.0
name: Provenance-design-system
description: >
  A mineral-ground institutional system for the memory layer of real assets.
  The page sits on a cool mineral canvas (#E9ECEB) rather than white or cream,
  with near-black green-tinted ink (#1E2422) at 13:1 contrast doing the heavy
  lifting. Hierarchy is carried by typographic mass, surface steps and grid
  logic, not by cards. One variable grotesque (Pliant) covers display through
  dense product UI; IBM Plex Mono is reserved for aligned numerals and system
  metadata. Two product identities share one system: Vera is forest green and
  active, Provenance is graphite and persistent. The page makes exactly one
  tonal descent, from a mineral working surface onto basalt — a graphite-green
  stone at L* 25.8, a change of material rather than a dark mode — and never
  returns, replacing the light/dark patchwork with a single narrative arc.
  Its central composition — work in, Vera builds Provenance, work out — is a
  convergence field rather than a flowchart: many thin inputs collapse into one
  lifted panel and fan back out as fewer, richer, fully sourced artefacts. That
  asymmetry between the two sides is the value proposition stated visually.

colors:
  # --- mineral neutrals: the ground and its steps -------------------------
  mineral-000: "#FBFCFB"   # highest lift, product surfaces
  mineral-050: "#F4F6F5"   # raised band
  mineral-100: "#E9ECEB"   # CANVAS, the default page ground
  mineral-200: "#DCE1DF"   # recessed band, quiet fills, inner rules
  mineral-300: "#C9D0CD"   # hairline
  mineral-400: "#A8B2AF"   # structural rule, disabled ink
  mineral-500: "#7E8A88"   # 3.0:1 — large text, borders, disabled only
  slate: "#56636A"         # secondary ink, Provenance register
  graphite: "#323A3B"      # structural graphite, diagram nodes, record spine
  graphite-lift: "#3D4749" # one step up from graphite, emphasis state on the light half
  ink: "#1E2422"           # primary ink and primary button fill — NOT a page ground
  ink-deep: "#161B1A"      # deepest, footer floor, pressed ink

  # --- Vera: the active layer ---------------------------------------------
  vera-050: "#EFF5F1"
  vera-100: "#E1EDE6"      # Vera tint, touched rows, badges
  vera-300: "#A6C7B5"
  vera-400: "#6FA98C"      # mid Vera — light-half use only (fails AA on basalt)
  vera-600: "#2A6249"      # Vera link / hover fill / focus ring
  vera-700: "#1F4A38"      # VERA PRIMARY, fills, buttons, active nodes
  vera-800: "#173329"      # Vera pressed, deep forest

  # --- signals: product surfaces only -------------------------------------
  clay-100: "#F3E4DE"
  clay-600: "#A35F45"      # blocker, dots, bars, fills
  clay-700: "#8F5038"      # blocker, text-safe
  ochre-100: "#EFE9DA"
  ochre-600: "#9A7B3F"     # expiry, dots, bars, fills
  ochre-700: "#7D6229"     # expiry, text-safe

  # --- basalt: the descent surfaces ---------------------------------------
  # A graphite-green stone family. NOT a dark theme — basalt-700 sits at
  # L* 25.8, nearly double the lightness of the old near-black ink ground.
  basalt-500: "#4A5852"    # hover / emphasis step
  basalt-600: "#3E4C46"    # lifted surface on the descent
  basalt-700: "#33403B"    # THE DESCENT CANVAS
  basalt-800: "#2B3833"    # recessed band
  basalt-900: "#262F2B"    # the floor — closing CTA and footer

  # --- on the descent -----------------------------------------------------
  on-deep: "#E9ECEB"       # 9.1:1 on basalt-700
  on-deep-muted: "#C8D2CD" # 7.0:1
  on-deep-subtle: "#A9B5B0"# 5.1:1 — passes AA, unlike its predecessor
  vera-on-deep: "#A6C7B5"  # vera-300, 5.9:1 — Vera's text colour on basalt
  hairline-deep: "rgba(233,236,235,0.14)"
  hairline-deep-strong: "rgba(233,236,235,0.24)"

typography:
  display-1:      { family: Pliant, size: 76px, weight: 600, lineHeight: 1.00, tracking: -0.020em }
  display-2:      { family: Pliant, size: 56px, weight: 600, lineHeight: 1.04, tracking: -0.018em }
  display-3:      { family: Pliant, size: 40px, weight: 600, lineHeight: 1.10, tracking: -0.015em }
  heading-1:      { family: Pliant, size: 30px, weight: 600, lineHeight: 1.18, tracking: -0.012em }
  heading-2:      { family: Pliant, size: 22px, weight: 600, lineHeight: 1.28, tracking: -0.008em }
  heading-3:      { family: Pliant, size: 18px, weight: 600, lineHeight: 1.38, tracking: -0.005em }
  section-label:  { family: Pliant, size: 20px, weight: 600, lineHeight: 1.20, tracking: -0.006em }
  lead:           { family: Pliant, size: 20px, weight: 430, lineHeight: 1.50, tracking: -0.005em }
  body:           { family: Pliant, size: 17px, weight: 430, lineHeight: 1.60, tracking: -0.003em }
  body-sm:        { family: Pliant, size: 15px, weight: 430, lineHeight: 1.55, tracking: 0 }
  ui:             { family: Pliant, size: 14px, weight: 500, lineHeight: 1.40, tracking: 0 }
  ui-sm:          { family: Pliant, size: 13px, weight: 500, lineHeight: 1.35, tracking: 0.004em }
  micro:          { family: Pliant, size: 12px, weight: 500, lineHeight: 1.30, tracking: 0.010em }
  button:         { family: Pliant, size: 15px, weight: 500, lineHeight: 1.00, tracking: 0 }
  mono:           { family: IBM Plex Mono, size: 13px, weight: 400, lineHeight: 1.45, tracking: 0.020em }
  mono-sm:        { family: IBM Plex Mono, size: 11.5px, weight: 500, lineHeight: 1.30, tracking: 0.040em }
  quote-serif:    { family: EB Garamond, size: 44px, weight: 500, lineHeight: 1.22, tracking: -0.010em }

rounded:
  chip: 3px       # tags, status chips, diagram nodes
  control: 6px    # buttons, inputs, selects, tabs
  panel: 10px     # inner panels nested inside a product frame
  frame: 14px     # the product frame itself
  full: 9999px    # avatars and live status dots only

spacing:
  base: 4px
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  band: 80px
  section: 128px

components:
  button-primary:   { background: "{colors.ink}",         text: "{colors.mineral-050}", rounded: "{rounded.control}", padding: "0 20px", height: 44px }
  button-vera:      { background: "{colors.vera-700}",    text: "{colors.mineral-050}", rounded: "{rounded.control}", padding: "0 20px", height: 44px }
  button-secondary: { background: "transparent",          text: "{colors.ink}",         rounded: "{rounded.control}", padding: "0 20px", height: 44px, border: "1px solid {colors.mineral-400}" }
  button-ghost:     { background: "transparent",          text: "{colors.ink}",         rounded: "{rounded.control}", padding: "0 8px",  height: 40px }
  button-inverse:   { background: "{colors.mineral-100}", text: "{colors.ink}",         rounded: "{rounded.control}", padding: "0 20px", height: 44px }
  product-frame:    { background: "{colors.mineral-000}", rounded: "{rounded.frame}",   border: "1px solid {colors.mineral-300}", shadow: "{elevation.lift-2}" }
  product-bar:      { background: "{colors.mineral-000}", text: "{colors.slate}",       height: 44px, border-bottom: "1px solid {colors.mineral-200}" }
  product-row:      { background: "transparent",          text: "{colors.ink}",         height: 52px, padding: "0 16px", border-bottom: "1px solid {colors.mineral-200}" }
  inner-panel:      { background: "{colors.mineral-050}", rounded: "{rounded.panel}",   border: "1px solid {colors.mineral-200}", padding: "16px" }
  signal-chip:      { rounded: "{rounded.chip}", padding: "2px 7px", typography: "{typography.micro}" }
  text-input:       { background: "{colors.mineral-000}", text: "{colors.ink}",         rounded: "{rounded.control}", padding: "0 12px", height: 40px, border: "1px solid {colors.mineral-400}" }
  top-nav:          { background: "{colors.mineral-100}", text: "{colors.ink}",         height: 60px, typography: "{typography.ui}" }
  faq-row:          { background: "transparent",          text: "{colors.on-deep}",     padding: "24px 0", border-bottom: "1px solid {colors.hairline-deep}" }
  footer:           { background: "{colors.ink-deep}",    text: "{colors.on-deep-muted}", padding: "64px 0 40px" }

elevation:
  lift-0: "none"
  lift-1: "surface step only, no shadow"
  lift-2: "0 1px 1px rgba(30,36,34,.03), 0 2px 4px rgba(30,36,34,.04)"
  lift-3: "0 1px 2px rgba(30,36,34,.04), 0 8px 24px rgba(30,36,34,.08)"

motion:
  instant: 90ms
  quick: 140ms
  base: 220ms
  considered: 340ms
  deliberate: 520ms
  hold: 1500ms          # state hold in the system composition (§13.6)
  ease-entrance: "cubic-bezier(0.16, 1, 0.30, 1)"
  ease-state: "cubic-bezier(0.40, 0.00, 0.20, 1)"
  ease-exit: "cubic-bezier(0.40, 0.00, 1.00, 1)"
  ease-cursor: "cubic-bezier(0.33, 0.00, 0.15, 1)"
---

# Provenance — Design System

**Single source of truth.** Every page, component and animation on the Provenance
site resolves to this document. When a decision is not covered here, resolve it in
the direction of *more structure and less decoration*, then write the rule down.

Provenance is building the memory layer for real assets, starting with commercial
real estate. **Vera works with your teams. Provenance remembers for the property.**
Vera is a product experience inside Provenance, not a second brand.

---

## 1. Brand personality

The site should read as software used by teams responsible for billions of dollars
of physical assets, buildings that will outlive every person currently working on
them. That posture produces eleven adjectives, and each one has a design consequence.

| Trait | What it means in the build |
|---|---|
| **Smooth** | Every state change is animated on a defined curve. Nothing snaps, nothing bounces. |
| **Technical** | Real data, real dates, real property names. Never lorem, never "Feature One". |
| **Premium** | Restraint and precision, not ornament. Value is signalled by what is left out. |
| **Confident** | Sentence-case statements that end in a period. No hedging, no exclamation. |
| **Enterprise** | Density is allowed. The reader is a professional and expects to see the work. |
| **Architectural** | Orthogonal geometry, structural rules, drafting-grade line weights. |
| **Product-driven** | The product is the protagonist of every section that has one. |
| **Intelligent** | The interface demonstrates understanding rather than claiming it. |
| **Tactile** | Interactive elements respond within 90ms and have real pressed states. |
| **Modern** | Variable type, grid logic, no skeuomorphic or retro cues. |
| **Substantial** | Ink at 13:1, display at weight 600, generous type sizes. Nothing dainty. |

### What it is not

Not a generic AI startup. Not an architecture studio portfolio. Not a luxury
editorial site. Not a beige SaaS template. Not a consulting deck. Not a dashboard
template. Not a crypto site. Not a futuristic AI gimmick.

**The sharpest single test:** if a section would look equally at home on any
AI-company homepage with the words swapped out, it is wrong. Provenance's material
is *commercial real estate work*, submissions, RTUs, warranties, zoning, tenant
meetings, consultants, drawings, and that material should be visible in the pixels,
not only in the copy.

---

## 2. Design principles

These are ordered. When two principles conflict, the earlier one wins.

**1. Weight before decoration.**
The previous site failed by being pale. Hierarchy comes from ink contrast, then type
mass, then size. Before adding a border, a tint, a shadow or an icon, try making the
important thing bigger and darker and the unimportant thing smaller.

**2. A container must earn its border.**
The default state of any block of content is *no container*. A border is earned only
by (a) genuine product UI, or (b) a single list-style component per page. Ideas are
separated by rules and space, never by boxes. See §7.

**3. Rules are structural, not decorative.**
A 1px line either spans the grid, separates rows of real data, or does not exist.
Hairlines never close into a rectangle around prose. This is the specific fix for
"too dependent on 1px grey borders".

**4. One continuous system, one descent.**
The page does not alternate light and dark. It runs on the mineral canvas, then makes
exactly one tonal descent into the deep substrate, and never returns. See §6.3.

**5. Motion must carry meaning.**
Every animation communicates state, relationship, workflow or transformation. If an
animation takes longer to understand than the sentence explaining it, delete the
animation and keep the sentence.

**6. Show the work, do not illustrate it.**
Render real product UI as real DOM. Never draw an abstract picture of something the
product actually does. A table of open issues beats an illustration of "tracking".

**7. Vera and Provenance are one system in two registers.**
Green is active and present tense. Graphite is persistent and past tense. A reader
should know which layer a section belongs to from the corner of their eye, without
reading a word, and should never doubt that they are the same product.

**8. Scarce at the element, generous at the band.**
Accent colour appears rarely on individual elements and decisively at full-band
scale. That is what makes an accent read as a signal rather than as styling.

**9. Density is a feature of the product, calm is a feature of the page.**
Product surfaces may be dense. The marketing chrome around them must be quiet enough
that the density reads as capability rather than noise.

---

## 3. Colour system

### 3.1 The ground

The canvas is **mineral `#E9ECEB`**, a cool grey-green ground, not white and not
cream. This is the most consequential colour decision in the system.

- It is not white, so **white becomes a lift**. Product surfaces at `#FBFCFB` rise
  off the canvas without needing a shadow.
- It is not cream, so the site reads institutional rather than editorial.
- It carries a faint green cast, which lets Vera's forest green sit on it as a
  *material* rather than as ink on paper.

Every neutral sits on the same cool grey-green axis, with one deliberate exception:
`slate #56636A` is a degree cooler and bluer. That is not a mistake. It is what
separates the Provenance register from the Vera register.

### 3.2 Neutral ramp

| Token | Hex | Role |
|---|---|---|
| `mineral-000` | `#FBFCFB` | Product surfaces, the highest lift. Never a page background. |
| `mineral-050` | `#F4F6F5` | Raised band; inner panels; the Meet Vera section ground. |
| `mineral-100` | `#E9ECEB` | **Canvas.** The default ground for the entire light half. |
| `mineral-200` | `#DCE1DF` | Recessed band, row rules inside product frames, quiet fills. |
| `mineral-300` | `#C9D0CD` | Hairline. 1.32:1 against canvas, present but not loud. |
| `mineral-400` | `#A8B2AF` | Structural rule, input borders, disabled ink. 1.84:1 against canvas. |
| `mineral-500` | `#7E8A88` | **3.0:1 — fails AA for body.** Large text, UI borders and disabled states only. |
| `slate` | `#56636A` | **Secondary ink.** Lead paragraphs, metadata, Provenance register. |
| `graphite` | `#323A3B` | Structural graphite. Diagram nodes, the record spine. Rarely text. |
| `ink` | `#1E2422` | **Primary ink** and primary button fill. Not a page ground — the descent uses basalt (§3.5). |
| `ink-deep` | `#161B1A` | Pressed primary button only. |

### 3.3 Vera, the active layer

| Token | Hex | Role |
|---|---|---|
| `vera-050` | `#EFF5F1` | Faintest wash. A row Vera is currently working on. |
| `vera-100` | `#E1EDE6` | Vera tint. Badge fills, captured-by-Vera rows. |
| `vera-300` | `#A6C7B5` | Quiet Vera on light; borders of Vera-tinted elements. |
| `vera-400` | `#6FA98C` | Mid Vera. Light-half use only — it measures 3.99:1 on basalt and fails AA there. Use `vera-300` on the descent. |
| `vera-600` | `#2A6249` | Vera link, hover fill, focus ring. 6.0:1 on canvas. |
| `vera-700` | `#1F4A38` | **Vera primary.** Button fills, active nodes, the Vera mark. |
| `vera-800` | `#173329` | Vera pressed state. |

`vera-700` is dark enough (8.5:1) that as text it reads almost as ink.
**Therefore `vera-700` is a fill colour, not a text colour.** For green text on the
light canvas use `vera-600`; on basalt use `vera-300` (§3.5).

### 3.4 Signals, product surfaces only

**Four signals, three hues.** They exist so that Proactive Insights can differentiate
the kinds of thing Vera detects. **They never appear on marketing chrome** — not in
headlines, not in buttons, not as section accents.

| Signal | Meaning | Fill / dot | Text-safe | Tint |
|---|---|---|---|---|
| **Conflict** | Two records disagree | `clay-600 #A35F45` | `clay-700 #8F5038` (5.2:1) | `clay-100 #F3E4DE` |
| **Blocker** | Progress is stopped | `clay-600 #A35F45` | `clay-700 #8F5038` | `clay-100 #F3E4DE` |
| **Opportunity** | Something became possible | `vera-600 #2A6249` | `vera-700 #1F4A38` | `vera-100 #E1EDE6` |
| **Expiry** | A clock is running out | `ochre-600 #9A7B3F` | `ochre-700 #7D6229` (4.9:1) | `ochre-100 #EFE9DA` |

**Conflict and Blocker deliberately share clay.** §3.6 forbids a fourth chromatic
family, and the two do not need one: both mean *something is wrong and needs resolving*,
and both demand the same response — look now. The hue carries the response; the **glyph
and the word** carry the distinction. Three hues map cleanly to three responses: clay is
wrong, ochre is time, green is possible.

Every signal carries a **glyph and a word** in addition to its colour. Colour is never
the only channel — and here it deliberately cannot be, since two signals share a hue.
See §18.

### 3.5 The dark environment

**DARK IS THE PRIMARY BRAND CANVAS. LIGHT IS A PRODUCT SURFACE, NOT A SECTION.**

This supersedes the earlier mineral-canvas and basalt-descent system. The page is one
continuous dark environment; light appears only where real software, a document or a
source preview does. That contrast is what makes the product demos the brightest thing
on the page — which is exactly where the eye should go.

| Token | Hex | L* | Role |
|---|---|---|---|
| `canvas` | `#0D0F0E` | 4.1 | **The primary canvas.** Hero, Meet Vera, closing. |
| `canvas-2` | `#131614` | 6.9 | One step up. Quiet bands, footer. |
| `canvas-3` | `#171A18` | 8.9 | Two steps up. Raised regions. |
| `canvas-4` | `#1E221F` | 12.7 | Deepest lift on dark. Rare. |

| Token | Hex | Ratio on canvas | Role |
|---|---|---|---|
| `paper` | `#F3F4F0` | **17.4:1** | Primary text. Warm off-white, never pure white. |
| `paper-muted` | `#A9B0AA` | **8.7:1** | Secondary text. |
| `paper-subtle` | `#7E867F` | **5.1:1** | Tertiary. Still passes AA. |
| `vera-400` | `#6FA98C` | **7.1:1** | **Vera text on dark.** |
| `vera-500` | `#2F6B4F` | 3.1:1 | **Fill only** — white on it is 6.3:1. Never text. |
| hairline | `rgba(243,244,240,0.10)` | — | Rules and borders. |
| hairline strong | `rgba(243,244,240,0.18)` | — | Emphasised rules. |

**Tonal variation, never theme flipping.** Do not alternate dark section / light section
as a rhythm. Rhythm comes from composition, typography, scale, product windows, motion
and density. The four-step canvas ladder is the only tonal device, and adjacent steps are
deliberately close — felt, not seen.

**The light product surface.** The `mineral-*` / `ink` / `slate` family documented
below is no longer the page ground. It is now the palette of the **light surfaces that
float inside the dark environment**: product windows, documents, source previews. A
product frame at `mineral-000` sits at **18.7:1** against the canvas — the strongest
contrast on the site, spent deliberately on the one thing that should dominate.

**What it must not become.** Not crypto, not gaming, not cyberpunk, not neon AI, not
black-and-purple SaaS, not glassmorphism. The register is institutional software and real
estate infrastructure: black, white, graphite, one restrained green.

### 3.6 Colour discipline

- **The system primary is ink, not green.** Generic conversion CTAs are ink-filled.
  Green is reserved for Vera product actions. This is what stops Vera from becoming
  the entire brand identity.
- **Never place an ink-primary button and a Vera-primary button in the same
  viewport.** One filled button per band.
- **No gradients.** Not on backgrounds, not on text, not on buttons, not subtle ones.
- **No fourth chromatic family.** Mineral, Vera green, graphite/slate and the three
  muted signals are the entire system. Adding a blue, a purple or a bright accent
  breaks it.
- Tints (`vera-100`, `clay-100`, `ochre-100`) are for product surfaces and never span
  a full section band.

---

## 4. Typography system

### 4.1 Families

| Role | Family | Notes |
|---|---|---|
| **Marketing / brand** | **Pliant** (variable, self-hosted, OFL) | Everything outside a product frame: hero, sections, nav, footer. |
| **Product UI** | **Inter** | Everything **inside** a Vera frame. See below. |
| ~~Metadata~~ | ~~IBM Plex Mono~~ | **Retired.** See below. |
| **Thesis page only** | **EB Garamond** | The opening statement and pull quotes on `/thesis`. Nowhere else. |

Pliant and EB Garamond are vendored in `src/app/fonts/`; Inter and Plex Mono come from
`next/font/google`.

**The marketing / product split is deliberate.** A product frame depicts software, and
software has its own typeface — a real screenshot would never be set in the marketing
face. Pliant outside the frame and Inter inside is what makes the frame read as a
different artefact rather than a styled table. This is a considered exception to the
one-family principle, and the boundary is the frame edge: never mix them within one
surface.

**Mono is retired.** The monospaced face was doing the work of a label typeface
and reading as a terminal rather than as software. Dates, years, source types
and status labels are now set in the product face (Inter) at 11 to 12px, medium,
uppercase, with the tracking they already carried. Inter has real tabular
figures, so `tabular-nums` preserves the vertical alignment of the date and year
columns that was mono's only structural justification (§4.2). Marketing labels
follow the same rule in Pliant.

**The superseded rule, kept for the reasoning.** Inside product surfaces it is
restricted to dates, years and tiny status labels. Section labels, block headings and
answer copy are all sans. An earlier pass set every product label in tracked mono caps,
which flattened the hierarchy — when everything is a small uppercase label, nothing
outranks anything.

### 4.2 Verified facts about Pliant

These were measured directly against the shipped `Pliant.woff2`. Do not design
around assumptions that contradict them.

1. **The `wght` axis is real and spans 100–900.** Weight 600 is genuinely
   substantial and is the display weight. Never set display below 500.
2. **The `wdth` axis is extended-only.** Values below 100 render identically to 100;
   the axis only widens (110, 125, …). **Pliant cannot be condensed.** Do not attempt
   a condensed headline via `font-stretch` or `wdth`; it will silently do nothing.
   Keep `wdth` at 100 everywhere.
3. **Pliant has no tabular figures.** `tnum` has no effect, and digit advance widths
   vary by roughly 40% (a `1` is nearly half the width of a `0`). **Columns of
   numerals set in Pliant will never align.** This is the reason for the mono rule in
   §4.5. It is a structural requirement, not a stylistic preference.
4. **Pliant is drawn tight.** It needs far less negative tracking than the display
   faces in the reference corpus. Linear runs -3.0px at 80px; applying that to Pliant
   collides words ("what is" closes to "whatis"). The measured ceiling is about
   **-0.020em**, which is where `display-1` sits.

### 4.3 The scale

| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display-1` | 76px | 600 | 1.00 | -0.020em | Hero headline. Once per page. |
| `display-2` | 56px | 600 | 1.04 | -0.018em | Section opener headline. |
| `display-3` | 40px | 600 | 1.10 | -0.015em | Sub-section; the problem-section questions. |
| `heading-1` | 30px | 600 | 1.18 | -0.012em | In-section heading. |
| `heading-2` | 22px | 600 | 1.28 | -0.008em | Product panel title, FAQ question. |
| `heading-3` | 18px | 600 | 1.38 | -0.005em | Small heading inside product UI. |
| `section-label` | 20px | 600 | 1.20 | -0.006em | **Section labels. See §4.4.** |
| `lead` | 20px | 430 | 1.50 | -0.005em | Supporting paragraph under a headline. |
| `body` | 17px | 430 | 1.60 | -0.003em | Default body. |
| `body-sm` | 15px | 430 | 1.55 | 0 | Dense body, FAQ answers. |
| `ui` | 14px | 500 | 1.40 | 0 | Product rows, nav links, labels. |
| `ui-sm` | 13px | 500 | 1.35 | +0.004em | Dense product UI, table headers. |
| `micro` | 12px | 500 | 1.30 | +0.010em | Chips, badges, fine print. |
| `button` | 15px | 500 | 1.00 | 0 | All button labels. |
| `mono` | 13px | 400 | 1.45 | +0.020em | Dates, counts, IDs, sources. |
| `mono-sm` | 11.5px | 500 | 1.30 | +0.040em | Row metadata, diagram axis labels. |
| `quote-serif` | 44px | 500 | 1.22 | -0.010em | `/thesis` only. |

**Tracking ramp principle.** Tracking runs continuously from -0.020em at 76px to
+0.010em at 12px. Large type tightens, small type opens. Mono opens furthest, because
positive tracking is what marks it as taxonomy rather than prose, the same signal
Linear uses to distinguish an eyebrow from a headline.

**Body weight is 430, not 400.** Pliant's variable axis makes sub-default weights
available, and 430 gives body copy the extra optical weight the previous site lacked.
Never ship body below 400.

### 4.4 Section labels, a specific correction

Section labels are **not** tiny tracked all-caps breadcrumbs, and **not** mono. They
are:

- `section-label`, **20px, weight 600, sentence case, `ink` coloured**
- preceded by a **2px x 24px rule** in `vera-700` (light half) or `vera-300` (descent)
- on their own line, 14px between the rule and the label, 20px between the label and
  the headline

"The problem", "Meet Vera", "How Vera works", "The memory layer" must read as real
labels with presence. A 12px grey tracked caps eyebrow is exactly the daintiness this
system exists to eliminate.

### 4.5 The mono rule

Mono is an accent with two jobs, both derived from real constraints.

**Job 1, numerals that must align.** Because Pliant has no tabular figures, any
numeral that sits in a column, or that a reader will compare against the numeral in
the row above, is set in IBM Plex Mono. That covers dates, deadlines, day counts,
currency, square footage, unit and equipment IDs (`RTU-4`), version and revision
numbers, source counts and timestamps.

**Job 2, system metadata.** Source types, capture timestamps, technical states, file
references. The things Provenance records *about* a record.

Mono is **never** used for navigation, section labels, eyebrows, headlines, body
copy, button labels, or any sentence a person would read aloud. A numeral inside a
flowing sentence stays in Pliant.

At 13px, mono sits optically level with 14px Pliant. Do not set mono at the same
numeric size as adjacent sans.

### 4.6 The serif rule

EB Garamond appears on `/thesis` only: the opening statement, and at most two pull
quotes. It never appears on the homepage, never below 28px, never for body copy,
never for a product surface, never for a section label.

The homepage is sans-serif. If a homepage moment feels like it needs a serif, the
composition is wrong. Fix the composition.

---

## 5. Grid and spacing system

### 5.1 Base

**4px base unit.** Every spacing value, height and offset is a multiple of 4.

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 80 · 128`

### 5.2 Grid

- **12 columns**, 24px gutters.
- **Content track:** 1240px max width, 32px page margins (24px below 768px).
- **Wide track:** 1440px max, available only to product frames that need to breathe.
- **Full bleed:** edge to edge, available only to tonal bands (§6.3).

Columns are referenced as `c1`–`c12`. A layout spec such as *"label and headline
c1–c5, body c7–c11"* is the unit of layout decision-making in this system.

### 5.3 Vertical rhythm

| Token | Value | Use |
|---|---|---|
| `section` | 128px | Between major sections (desktop). |
| `band` | 80px | Interior padding of a full-bleed tonal band. |
| `xxl` | 48px | Headline block to product frame. |
| `xl` | 32px | Between paragraph groups. |
| `lg` | 24px | Product frame interior padding. |
| `md` | 16px | Product row horizontal padding. |
| `sm` | 12px | Chip and control interior. |
| `xs` | 8px | Icon to label. |

Section rhythm scales `128 → 88 → 64` at desktop, tablet, mobile.

### 5.4 Measure

- `lead`: max 56 characters
- `body`: max 62 characters
- `display-1`: max 16 characters per line. Hero headlines break by meaning, not by container.
- `display-2`: max 20 characters per line

Set line breaks in display type **manually**. A hero headline that reflows into an
orphan is a design defect, not an acceptable responsive outcome.

---

## 6. Layout philosophy

### 6.1 The problem being solved

The failure modes to design against: everything centred; endless identical 1200px
containers; repetitive feature grids; identical section structures; every section
being headline plus three cards.

The fix is a **named layout vocabulary**. Every section declares which layout it
uses, and **no two adjacent sections may use the same layout**.

### 6.2 Named layouts

| Layout | Structure | Character | Used for |
|---|---|---|---|
| **A — Stated** | Text only, c1–c7. Nothing else in the section. | Quiet, declarative | The problem; Provenance over time |
| **B — Anchored** | Label and headline c1–c5; body and detail c7–c11 | Asymmetric, restrained | Section openers at `display-2` and smaller |
| **C — Staged** | Heading c1–c4; product frame c5–c12, bleeding past the right gutter | Off-balance, product-forward | How Vera works |
| **D — Full stage** | Heading block c1–c7 above; product frame spans all 12 | Centred weight on the product | Meet Vera |
| **E — Descent** | Full-bleed tonal band; content c2–c11 | Enveloping | The memory layer; closing |
| **F — Ledger** | Full-width list with row rules, no containers | Dense, quiet | FAQ; source lists |

Layout A is as important as layout D. The page needs quiet sections for the loud ones
to register. A section that is *only typography* is a legitimate, finished section.
The problem section should be exactly that.

**`display-1` cannot share a row.** Measured against Pliant: at 76px the line "Never
lose why it happened." needs 980px, and a full sentence of hero copy needs ~1290px —
wider than the 1176px content track. So `display-1` requires **at least 11 columns** and
the copy beside it must move beneath it instead. Layout B's c1–c5 / c7–c11 split applies
to `display-2` and smaller. This is why the hero stacks rather than splitting
(HOMEPAGE.md §4, Section 1).

### 6.3 One continuous dark environment

**The page does not alternate light and dark bands, and it no longer descends.**
It is one continuous dark environment from nav to footer. This replaces the earlier
mineral-to-basalt descent.

```
canvas    ▸ nav, hero
canvas-2  ▸ the problem            (one tonal step — deeper, not different)
canvas    ▸ meet Vera              ◀ the LIGHT PRODUCT WINDOW sits here
canvas    ▸ how Vera works
canvas-2  ▸ the memory layer
canvas    ▸ Provenance over time
canvas-2  ▸ FAQ
canvas-2  ▸ closing and footer
```

**Light is a product surface, not a section.** The only bright things on the page are
product windows, documents and source previews. A `mineral-000` frame against `canvas`
is **18.7:1** — the strongest contrast the site contains, spent on the one thing that
should dominate. That is the whole rhythm device: the page is quiet and dark, and the
product is bright.

**Never solve rhythm by flipping theme.** Adjacent canvas steps are close on purpose —
felt, not seen. Rhythm comes from composition, typography, scale, product windows, motion
and density (§6.4). A hard black-then-white-then-black sequence is the specific failure
this rule exists to prevent.

**If a section feels undifferentiated, the fix is never a lighter background.** Change
the layout, change the density, or put a product window in it.

### 6.4 Rhythm rule

Each section declares a triple: **(surface, layout, density)** where density is
`quiet | medium | loud`. **No two adjacent sections may share the same triple**, and
**the page has exactly one `loud` section**, Meet Vera. Everything else is quiet or
medium. That is what makes the product reveal land.

---

## 7. Surface, border and radius rules

### 7.1 The anti-card doctrine

This is the direct fix for "too many cards".

**Rule 1. Default to no container.** Content sits on the canvas. A heading, a
paragraph and a list need no box.

**Rule 2. Only two things get a bordered frame:**
(a) genuine product UI, a real interface rendering real data;
(b) exactly one list-style component per page (the FAQ), and it uses row rules rather
than per-item boxes.

**Rule 3. Never nest a bordered container inside a bordered container.** Maximum
nesting depth is product frame → inner panel → row. The row gets a bottom hairline
only, never a full border.

**Rule 4. Concepts are separated by rules and space.** Three related ideas become
three text blocks separated by a full-width hairline and 32px, not three cards.

**Rule 5. Hairlines never close into a rectangle around prose.** A rule either spans
the grid edge to edge, spans a defined column range, or separates rows of real data.
A 1px border that outlines a paragraph is forbidden.

**Rule 6. No icon-in-a-box.** No feature tiles with a rounded-square icon container at
the top. That pattern is the clearest single tell of a SaaS template.

### 7.2 Surface steps

Hierarchy on the light half runs `mineral-100` (canvas) → `mineral-050` (raised band)
→ `mineral-000` (product surface). On the descent: `basalt-700` → `basalt-600` → `basalt-500`.

**Never skip a step, and never use more than three steps in one viewport.**

### 7.3 Radius vocabulary

Radius encodes scale and nesting. A reader should be able to infer what kind of thing
something is from its corner.

| Token | Value | Applies to |
|---|---|---|
| `chip` | 3px | Tags, status chips, diagram nodes |
| `control` | 6px | Buttons, inputs, selects, tabs, mode switcher |
| `panel` | 10px | Inner panels nested inside a product frame |
| `frame` | 14px | The product frame itself |
| `full` | 9999px | Avatars and live status dots, nothing else |

**No pill-shaped buttons.** 6px is deliberately tighter than the 8px that reads
"consumer app" and softer than the 0px that reads "Carbon". It is the system's own
value, and it makes the 14px product frame read as a distinctly larger object.

### 7.4 Elevation

| Level | Treatment | Use |
|---|---|---|
| `lift-0` | Nothing | Default for all content |
| `lift-1` | Surface step only, no shadow | Raised bands, inner panels |
| `lift-2` | `0 1px 1px rgba(30,36,34,.03), 0 2px 4px rgba(30,36,34,.04)` | Product frames |
| `lift-3` | `0 1px 2px rgba(30,36,34,.04), 0 8px 24px rgba(30,36,34,.08)` | Floating menus, tooltips, drawers, nothing else |

Four shadow values exist in the system. There are no others. No shadow on the descent
— surface step and hairline carry elevation on basalt. The one exception is the composition core panel (§13.5), which carries `lift-3` because it is the object the whole composition lifts toward.

### 7.5 Hairlines

| Context | Value |
|---|---|
| Section rule on canvas | 1px `mineral-300` |
| Structural rule, input border | 1px `mineral-400` |
| Row rule inside a product frame | 1px `mineral-200` |
| Any rule on deep | 1px `rgba(233,236,235,0.14)` |
| Emphasised rule on deep | 1px `rgba(233,236,235,0.24)` |

---

## 8. Button system

### 8.1 Variants

| Variant | Fill | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `ink` | `mineral-050` | — | The conversion action. **The system primary is ink.** |
| `vera` | `vera-700` | `mineral-050` | — | Vera product actions only: Ask Vera, Share brief, in-frame actions. |
| `secondary` | transparent | `ink` | 1px `mineral-400` | The paired secondary action. |
| `ghost` | transparent | `ink` | — | Tertiary; label and chevron. |
| `inverse` | `mineral-100` | `ink` | — | Primary action on the descent. |

### 8.2 Sizes

| Size | Height | Padding | Type |
|---|---|---|---|
| `sm` | 32px | 0 12px | `ui-sm` |
| `md` | 38px | 0 16px | `ui` |
| `lg` | 44px | 0 20px | `button` |

`lg` for section CTAs, `md` for nav and product chrome, `sm` inside product rows.
Minimum 44px on touch viewports regardless of declared size.

### 8.3 States

| State | Treatment | Duration |
|---|---|---|
| hover | Background darkens one step (`ink`→`ink-deep`, `vera-700`→`vera-800`); secondary gains `mineral-050` fill | `instant` 90ms |
| active | Background darkens one further step. **No transform.** | `quick` 140ms |
| focus-visible | 2px `vera-600` ring, 2px offset (descent: `vera-300`) | `instant` |
| disabled | `mineral-300` fill, `mineral-500` text, no pointer events | — |

**Buttons never scale, never lift, never gain a shadow on hover.** The response is
colour and nothing else. That is what makes it feel like software rather than
marketing.

### 8.4 Discipline

- **One filled button per band.** A section has one primary action, optionally paired
  with one `secondary` or `ghost`. Never two filled buttons.
- **Never place `primary` and `vera` in the same viewport.** Ink means "engage with
  the company", green means "this is Vera doing something". Mixing them makes both
  meaningless.
- Button labels are sentence case, verb-first, and never end in a period.

---

## 9. Navigation system

### 9.1 Structure

60px tall. Logo left. Links left of centre, starting at `c3`. One `md` primary action
right. **Sans-serif at `ui` 14px weight 500, never mono.**

### 9.2 Behaviour

- **At rest over the hero:** transparent, no border, ink-coloured.
- **After 24px of scroll:** solid `mineral-100` fill with a 1px `mineral-300` bottom
  rule. Transition `base` 220ms on `ease-state`. **No backdrop blur**, a solid fill,
  because blur is on the banned list and reads generic.
- **On the descent:** the nav inverts its ink to `on-deep` and its rule to
  `hairline-deep`. **The geometry does not change**, same height, same positions,
  same type. Chrome stays constant; only polarity flips.
- Link hover: underline grows from 0 to full width, left origin, `quick` 140ms. No
  colour change, no background.
- Below 768px: links collapse to a full-height overlay panel, not a dropdown,
  entering on `considered` 340ms. Logo and primary action stay on the bar.

### 9.3 Routes

`Product` · `The memory layer` · `Thesis` · `FAQ`, plus the primary action. Four
links maximum. The nav is not a sitemap.

---

## 10. Product UI rules

The product frames are the most important thing on the site. They are not
screenshots. They are **real DOM, built to the same standard as the product**.

### 10.1 The frame

- Background `mineral-000`, 1px `mineral-300` border, `frame` 14px radius, `lift-2`.
- **Title bar:** 44px, `mineral-000`, 1px `mineral-200` bottom rule. Contains a left
  breadcrumb (`Westmount Centre / South Pad`), an optional centre mode switcher, and
  right-aligned mono metadata (`Updated 14:02 · 6 sources`).
- **No fake OS chrome.** No macOS traffic lights, no browser address bar, no window
  controls. The frame is Provenance's own chrome. Imitation OS furniture is the
  second-clearest tell of a template site.

### 10.2 Density

| Element | Spec |
|---|---|
| Row height | 52px (44px in compact panels) |
| Row padding | 0 16px |
| Row rule | 1px `mineral-200`, bottom only, none on the last row |
| Row text | `ui` 14px |
| Row metadata | `mono-sm` or `mono`, `slate` |
| Max visible rows | **7.** More than that reads as a screenshot dump. |
| Column gap | 14px minimum |

### 10.3 Data standards

**Every value in a product frame is specific and plausible.** Real property names,
real-looking dates, real disciplines, real equipment tags: `Westmount Centre`,
`South Pad`, `RTU-4`, `Northline Engineering`, `Turning analysis overdue by six
days`, `Roof warranty expires in 42 days`.

Never "Project A", "Task 1", lorem ipsum, "Team Member", placeholder avatars, or a
generic `Document.pdf`.

**Every row carries provenance:** a source and a timestamp, in mono, at `slate`. That
is literally what the company does, and the interface should demonstrate it in every
row rather than claim it in a headline.

### 10.4 Departments

Product frames must show multiple functions contributing to one property: development,
leasing, asset management, operations, legal, planning, consultants. The department
label sits in its own column in `ui-sm` `slate`. The message is **one property, many
functions, shared context**, carried by the data rather than by a sentence.

### 10.5 States and interaction

- Row hover: background steps to `mineral-050` **and** a 2px `vera-600` bar appears on
  the left edge. `instant` 90ms. No shadow, no lift, no scale.
- Row selected: background `vera-050`, left bar persists at `vera-700`.
- Tabs and mode switcher: a real `tablist` with arrow-key support. The selected tab
  gets `mineral-000` fill, `ink` text and a 2px `ink` bottom rule. Unselected is
  `slate` with no fill. Transition `base` 220ms.
- Expandable rows animate height on `base` 220ms `ease-state`, and the disclosure
  chevron rotates 90 degrees on the same curve.

**Two levels of navigation, two levels of affordance.** Product modes (Level 1) and
in-mode perspective switches such as the Ask Vera role selector (Level 2) must not look
identical, and neither may be an underline alone. An underline by itself reads as website
navigation, not as software.

| | Level 1: product modes | Level 2: role selector |
|---|---|---|
| Target | 46px min height, 16-20px padding | 40px min height, 12px padding |
| Rest | `slate`, 14px/500, transparent | `slate`, 13px/400, transparent |
| Hover | `mineral-050` fill, `ink` text | `mineral-050` fill, `ink` text |
| Active | `mineral-100` fill, 14px/600 `ink`, plus a 2px `ink` bottom rule | `mineral-100` fill, 13px/600 `ink`, no rule |
| Radius | `control` on the top corners only (it is a tab) | `control` on all four |
| Transition | `base` (220ms) on background and colour | same |
| Focus | the standard 2px `vera-600` ring at 2px offset | same |
| Cursor | pointer, set globally on every enabled control | same |

Selection is never signalled with green. Green appears only in the focus ring, where it
is the system's standard focus colour and carries no state meaning.

### 10.6 Anti-ChatGPT rules for Ask Vera

The Ask Vera answer must not look like a chat product.

- **Answers reveal by block, never character by character.** Blocks appear 120ms
  apart. Character streaming is the strongest single visual signal of "wrapped LLM".
- Answers are **structured**: a one-line direct answer, then supporting points, then a
  source strip. Not a wall of prose.
- The source strip is always present and always populated, in mono, with source type
  and date. Sources are the product.
- **No avatar bubble, no chat transcript, no "Vera is typing…", no send-arrow circle,
  no sparkle icon.** The input is a field in a product, not a chat box.
- The thinking state is a **1px progress rule that fills left to right over 700ms**,
  not a spinner and not three bouncing dots.

### 10.7 The derivation — how a detected signal is shown

Proactive Insights displays **conclusions Vera reached**, not events that occurred.
A conclusion is only credible if the reasoning behind it is visible, so every signal
carries a **derivation**: the sources it was drawn from, and the dates of each.

```
Consultant commitment    12 Jun, due 6 Aug   ▪
Today                    14 Aug              ▪ ──▸  ▪ BLOCKER
Submission               Thu 20 Aug          ▪         8 days late, blocks Thursday
```

- Renders as the **record line** (§12) at product scale: two or more `graphite` source
  nodes resolving to one signal-coloured conclusion node.
- Each source shows **type, date and origin** — mono for the date, `ui-sm` for the label.
- **Orthogonal, 1px, no arrowheads on the joins.** The curve exception belongs to §13.4
  and nowhere else. Maximum five sources (§19.2's nine-node ceiling applies).
- The conclusion node takes the signal's fill; sources stay `graphite` regardless of
  signal type, so the eye lands on the conclusion.

**Every derivation must visibly demonstrate cross-context reasoning.** That is the
requirement. A signal has to show that Vera connected things a single view could not
have shown together — otherwise it reads as a calendar reminder, which is the exact
thing this pattern exists not to be.

Cross-context can be demonstrated along any of these axes, and a strong derivation
usually spans more than one:

| Axis | Example |
|---|---|
| **Time** | A decision from June against a drawing filed last week |
| **Department** | A leasing commitment against a development drawing |
| **Source type** | A meeting against a document; a commitment against a deadline |
| **State** | A past decision against a current artefact |
| **External change** | A previously rejected concept against a new zoning amendment |

**Temporal separation is the strongest single proof of persistence** — a months-wide gap
can only be bridged by something that held context the whole time — so prefer it where
it strengthens the story. But it is **not** a universal requirement. A conflict between
Leasing's commitment and Development's drawing filed the same week is legitimate
cross-context reasoning: no single person or view held both.

The failure to avoid is a derivation whose sources are the same type, from the same
team, about the same artefact. That is monitoring, not reasoning.

**Detected signals never carry an owner.** Tracked work has owners; detected signals have
derivations instead. That single structural difference is what makes the two modes
legible without reading their labels.

---

## 11. Vera visual language

Vera is the teammate: active, present tense, doing work now.

### What Vera is, in one loop

Every product surface should be recognisable as one stage of this:

```
OBSERVE  →  UNDERSTAND  →  REMEMBER  →  DETECT  →  RECOMMEND
```

**Not** `ASK → SEARCH → ANSWER`. Vera is not primarily an email summariser, a document
search tool or a generic Q&A assistant — general tools already do that, and designing
around it would date the product. Vera continuously builds and maintains property
context, then proactively surfaces what needs attention.

The design consequence: **`DETECT` and `RECOMMEND` are the stages that must look most
impressive.** Proactive Insights gets the most considered treatment of the three modes
(§10.7), because it is the only one demonstrating the half of the loop that retrieval
tools do not have. If Ask Vera ends up the most polished surface on the site, the
emphasis is wrong.

| Channel | Treatment |
|---|---|
| **Colour** | `vera-700` fills on light, `vera-300` text on basalt. `vera-100` tint for rows Vera touched. |
| **Surface** | Vera lives on the **lifted** surfaces: `mineral-000` product frames on a `mineral-050` band. |
| **The Vera mark** | A small solid glyph (12px) placed inline at the start of any row Vera generated or captured. It is how a user tells Vera's contribution from a person's without a label. |
| **Motion** | Vera is the only thing on the site that initiates motion. Vera's actions animate; Provenance's record does not. |
| **Voice** | Sentence case, verb-first. Past tense for capture ("Captured lease revision"), present for state ("Waiting on turning analysis"). |
| **Tense** | Now. |

**Vera is a product section, not the brand.** Vera green never appears in the logo
lockup, never in the nav, never as a page background, and never as the fill of a
generic marketing CTA. If a viewport contains Vera green and no product UI, something
is wrong.

---

## 12. Provenance visual language

Provenance is the substrate: persistent, accumulated, past and future tense.

| Channel | Treatment |
|---|---|
| **Colour** | `basalt-600` structures on the `basalt-700` ground. `graphite` and `slate` in the light half. |
| **Surface** | Provenance lives on the **recessed and deep** surfaces: `mineral-200` on the light half, the full `ink` canvas after the descent. |
| **Geometry** | Orthogonal. Rectangles at `chip` 3px radius. Nothing rounded, nothing organic. |
| **Motion** | Provenance does not animate on its own. It accumulates. When it changes, the change is a state that appears, never a thing that moves. |
| **Tense** | Then, and still. |

### The record line, the recurring device

A **1px vertical rule with small square nodes** running down the left edge of any
record: a decision history, an evidence chain, a project timeline.

- Node: 7px square, `chip` 3px radius, centred on the rule.
- **`vera-700` node** means something Vera captured.
- **`graphite` node** means something already in the record.
- Rule: `mineral-300` on light, `hairline-deep` on deep.
- Labels sit 16px to the right, left aligned, `ui` size. Date in mono above.

This device states *"Vera works with your teams, Provenance remembers for the
property"* at the scale of a single record, without a diagram and without a sentence.
It recurs inside product surfaces: a decision history, the consultant brief, an
expanded row. Use it deliberately, not decoratively.

**Its most important use is the derivation** (§10.7). Where a decision history runs the
line downward through time, a derivation runs several sources *inward* to a single
conclusion — same nodes, same 1px rule, same rules about arrowheads. That is why the
device is worth having: it shows a record accumulating and a conclusion being reached
with one vocabulary.

**The site has two signature devices, and they do not overlap.** The record line works
at record scale, inside product UI, wherever one thing's history is shown. The system
composition (§13) works at system scale, once, in the memory layer section. Never put
the composition inside a product frame, and never scale the record line up into a
section-level graphic.

---

## 13. The system composition

**Work in → Vera builds Provenance → Work out.**

This is the one visual concept carried forward from the previous site, and it is the
most important single composition on the homepage. The mental model and the layout are
preserved. The styling is reinterpreted against this system.

### 13.1 The mental model

The composition must communicate four things, without a caption:

1. **The team is already generating information.** Nothing is being asked of them.
2. **Vera captures, connects, understands and tracks it.**
3. **That activity builds Provenance**, the persistent memory of the property.
4. **Useful context comes back out to the team.**

### 13.2 The argument is the asymmetry

This is the single most important thing about the composition, and the reason it works.

**The left side is uniform and thin. The right side is structured and specific.**

Work in is a plain list of artefact *types*: `Email`, `Meeting`, `Report`. Seven
identical rows, an icon and a word each. Raw material, undifferentiated.

Work out is not a list of types. Every entry is a **real, structured artefact** with
three lines: a category label, actual content, and the provenance behind it.

```
ASK VERA                          ← category, mono caps
"What's holding up the south pad?"  ← the actual thing
Answered from 4 sources             ← where it came from
```

The two sides are deliberately unequal in density and specificity. **That difference
is the entire value proposition, stated visually.** A reader who never reads a word of
the surrounding copy can see that something thin went in and something useful came out.

If the two columns are ever made symmetrical — matching lengths, matching treatments,
work out reduced to bare labels — the composition stops making its argument and
becomes decoration. Protect the asymmetry above every other property here.

### 13.3 The layout

```
  WORK IN                    VERA BUILDS PROVENANCE                    WORK OUT

  ▫ Email          ╲                                        ╱   ASK VERA
                    ╲      ┌──────────────────────────┐    ╱    "What's holding up
  ▫ Meeting          ╲     │ ⟨V⟩ Vera   THE AI TEAMMATE│   ╱      the south pad?"
                      ╲    │                          │  ╱      Answered from 4 sources
  ▫ Report             ╲   │ CAPTURES CONNECTS        │ ╱
                        ╲  │ UNDERSTANDS TRACKS       │╱        TASK
  ▫ Drawing              ╲ ├──────────────────────────┤         Complete turning analysis
                          ▸│        ↓ BUILDS          │◂        Sarah Chen · Development
  ▫ Lease memo           ╱ ├──────────────────────────┤╲
                        ╱  │ ⟨P⟩ Provenance           │ ╲       SHARED CONTEXT
  ▫ Correspondence     ╱   │                          │  ╲      South pad status
                      ╱    │ The shared memory of the │   ╲     Development · Leasing · Legal
  ▫ Invoice          ╱     │ property, built from     │    ╲
                    ╱      │ everyday work.           │     ╲   MEETING PREP
                   ╱       └──────────────────────────┘      ╲  Thursday South Pad Review
                                                              ╲ 5 relevant updates
```

Three zones across the full content width:

- **Left, work in.** Seven rows, icon plus label, `ui` 14px. Even vertical rhythm of
  about 75px. Icons per §14 — 20px, 1.5px stroke, square caps, matching the row's ink.
- **Centre, the core.** One lifted panel, vertically centred, roughly 400px wide.
- **Right, work out.** Four entries, each with a 1px left rule and three lines.

Field labels — `WORK IN`, `VERA BUILDS PROVENANCE`, `WORK OUT` — sit above their zones
in `mono-sm`, uppercase, `on-deep-muted`. These are internal field labels inside a
composition, not section labels, so mono is correct here and §4.4 does not apply.

### 13.4 The convergence field

Curved hairlines run from each work-in row to a **single focal point** on the left
edge of the core panel, and fan out again from a matching point on the right edge to
each work-out entry.

- **They converge to one point.** That is what separates this from a flowchart: a
  flowchart pairs each input to its own output. Here, many things collapse into one
  system and something different comes back. The convergence is the mechanism.
- **No arrowheads. Ever.** Direction is carried by the fan geometry.
- Stroke 1px, `vera-300` at 22% opacity at rest, rising to 45% when its side is
  emphasised. Not grey — sage. This is the "less dependent on thin grey lines"
  correction: the lines stay, but they carry the brand's material rather than reading
  as diagram furniture.
- Each curve leaves its row **horizontally** and arrives at the focal point
  **horizontally**. Use a cubic with both control points pulled toward the centre on
  the x-axis, so the curve is flat at both ends and bends only in the middle.
- The curves **do not draw, animate, dash, or flow.** They exist at rest and change
  opacity. See §13.6.
- Below 1024px the curve field is removed entirely rather than compressed. It is the
  first thing to go, because a squeezed fan reads as noise.

**This is the only place on the site where a curve is permitted** (§19.3).

### 13.5 The core panel

The one earned container in the composition (§7.1 rule 2 is extended here: this panel
is earned because it is the object the whole composition lifts toward).

- `mineral-000` fill on the `basalt-700` ground, `frame` 14px radius, `lift-3`. It is the
  brightest and most forward object in the section, and on the deep ground it reads as
  genuinely lifted. **This is where the dimensionality comes from** — not from
  gradients, blur or 3D, but from a white plane sitting above a dark one.
- Three horizontal zones, divided by 1px `mineral-200`:

**Zone 1 — Vera.** The Vera mark plus `Vera` in `heading-2`, with `THE AI TEAMMATE`
right-aligned in `mono-sm` uppercase `slate`. Below, on one line:
`CAPTURES · CONNECTS · UNDERSTANDS · TRACKS` in `mono-sm` uppercase, `graphite`.

**Zone 2 — the hinge.** A shallow band on `mineral-050`, centred: `↓ BUILDS` in
`mono-sm` uppercase `slate`. This is the only arrow in the composition and it is a
*label*, not a connector — it names the relationship between the two halves of the
panel rather than joining two nodes.

**Zone 3 — Provenance.** The Provenance mark plus `Provenance` in `heading-2`, then
one line of `body-sm`: *The shared memory of the property, built from everyday work.*

Vera sits above Provenance inside the panel, because Vera's activity is what settles
into the record. The vertical order is the argument and never inverts.

### 13.6 Motion — four states, once per viewport entry

**Every element exists in the composition from the first frame.** Nothing enters,
nothing draws, nothing is built up. The animation explains the transformation
**through emphasis alone**.

| State | Emphasised | Hold |
|---|---|---|
| **1** | **Work in** — all seven rows and the inbound curves, as one group | 1500ms |
| **2** | **The core panel** — Vera and Provenance together | 1500ms |
| **3** | **Work out** — all four entries and the outbound curves, as one group | 1500ms |
| **4** | **Everything.** The full system settles and rests. | permanent |

Crossfade between states is `deliberate` 520ms on `ease-state`.
**Total: about 6.6s.** It must land between 6 and 8 seconds — if a change pushes it
outside that window, adjust the holds, not the crossfades.

**Emphasis is carried by these properties and nothing else:**

| Element | Dimmed (transient only) | Emphasised / at rest in state 4 |
|---|---|---|
| Work-in row label | `on-deep-subtle` | `on-deep` |
| Work-out content line | `on-deep-subtle` | `on-deep` |
| Work-out provenance line | `on-deep-subtle` | `on-deep-muted` |
| Entry category label | `on-deep-subtle` | `vera-300` |
| Icons | `on-deep-subtle` | `on-deep` |
| Curves | `vera-300` at 22% | `vera-300` at 45% |
| Left rule on work-out entries | `hairline-deep` | `vera-300` |
| Core panel | `lift-2`, contents at `slate` | `lift-3`, contents at full ink |

**Never:** scale, translate, rotate, per-item stagger, glow, stroke-draw, dash-flow,
or any movement at all.

**On the dimmed column.** `on-deep-subtle` is 4.0:1 and fails AA (§18.1), so it is
permitted here **only as a transient state**. State 4 is the permanent resting state
and every element reaches a compliant contrast there; under `prefers-reduced-motion`
the composition renders state 4 directly and the dim state never occurs. No information
in this composition is ever left below 4.5:1 at rest.

**States 1 and 3 emphasise their whole column in one transition.** Seven rows lighting
up one at a time is precisely the failure this spec exists to prevent — it converts a
system into a list, and takes four times as long to say the same thing.

**In state 4 nothing is dimmed.** The rest state is the entire system at full emphasis,
held indefinitely. The composition's resting state is its most complete one, which is
the argument the section is making.

Plays **once per viewport entry**, then rests. Under `prefers-reduced-motion` the
composition renders directly in state 4 and never animates.

### 13.7 Ground and grid

The composition sits on **basalt** (`basalt-700`), in the memory layer section. The
previous version lived on a light ground; moving it below the descent is deliberate —
this is Provenance's register (§12), and the `mineral-000` core panel lifting off the
stone at **10.5:1** is what makes it read as dimensional rather than drawn.

A **faint structural grid** may sit behind the composition: 1px lines in `on-deep` at
low opacity, aligned to the actual 12-column grid and its 80px horizontal rhythm. It is
the one background texture permitted anywhere on the site, and it must align to the
real grid rather than being a decorative pattern.

**Calibrate it by test, not by taste — and re-measure it on basalt.** The opacity is
ground-dependent: a value tuned against a near-black ground is too faint here, because
basalt is roughly twice as light and the same white line has less to contrast against.
Start around **0.05** and tune by eye. The check: at arm's length the grid should
register as a change in the surface, never as a set of lines you could count. If you can
count them it is too strong; if it competes with the curve field it is much too strong,
because the curves are the thing that must be seen.

### 13.8 Contents

**Work in** — seven rows, in this order. Each is an artefact *type*, nothing more:

`Email` · `Meeting` · `Report` · `Drawing` · `Lease memo` · `Correspondence` · `Invoice`

**Work out** — four entries. Each is a real artefact with real content:

| Category | Content | Provenance line |
|---|---|---|
| `ASK VERA` | "What's holding up the south pad?" | Answered from 4 sources |
| `TASK` | Complete turning analysis | Sarah Chen · Development · Due Thursday |
| `SHARED CONTEXT` | South pad status | Development · Leasing · Legal |
| `MEETING PREP` | Thursday South Pad Review | 5 relevant updates |

Four entries, not seven. **Work out is deliberately shorter than work in** — the
system does not return more things, it returns better ones. Do not pad it to match the
left column.

Type spec per entry: category `mono-sm` uppercase in `vera-300`; content `ui` 14px in
`on-deep`; provenance line `ui-sm` in `on-deep-muted` (7.4:1 — **not**
`on-deep-subtle`, which fails AA at this size). 1px left rule at 12px offset, spanning
the entry's own height. Entries are distributed evenly across the column so the group
spans the same vertical extent as work in — equal extent, unequal content.

### 13.9 Rules

- This composition appears **once on the site**, in the memory layer section. It is
  not a reusable component and must not be reduced to a small diagram elsewhere.
- **Never make the two columns symmetrical** (§13.2).
- **No arrowheads on the curves**, at any size. The `↓ BUILDS` label inside the panel
  is the only arrow glyph in the composition.
- The four zones are never separated into four cards, four columns, or four
  scroll-triggered steps.
- Below 1024px: curves are removed, and the three zones stack — work in, core panel,
  work out. The vertical order is preserved at every breakpoint, because the order is
  the meaning.
- Below 768px: work in caps at five visible rows, work out stays at four entries and
  keeps all three lines. **Never strip the provenance line to save space** — it is the
  thing that makes the right side different from the left.
- Every work-in row is a real artefact type from the domain. Do not add a generic row
  such as "Data" or "Files".

## 14. Iconography

- **20px and 24px grids. 1.5px stroke. Square caps and square joins.** Lucide is the
  base set, restroked with `stroke-linecap: square; stroke-linejoin: miter`. Round
  caps read friendly-consumer; square caps read drafting and instrument.
- **No filled icons** except status dots and the Vera mark.
- **Icons are structural, not decorative.** An icon appears when it identifies a type
  of thing (a document, a meeting, an item of equipment, a drawing) or an action. It
  never appears as ornament beside a heading.
- **No icon-per-feature.** There are no feature cards, so there is no place for the
  icon-in-a-tinted-square pattern.
- **No emoji anywhere**, including in product data.
- Domain glyphs to draw custom, because no generic set has them: property, drawing
  sheet, permit/submission, lease, equipment/RTU, decision, blocker, consultant.
- Icons inherit `currentColor` and sit optically centred on the cap height of adjacent
  text, not on its bounding box.

---

## 15. Motion system

### 15.1 Philosophy

Motion should feel like **high-end productivity software responding**, not like a
marketing animation reel. Three consequences.

1. **Nothing bounces.** No spring overshoot anywhere in the marketing chrome. The
   single permitted exception is the fake cursor's click contraction (§16).
2. **Entrances decelerate, exits accelerate.** Things arrive and settle. Things leave
   quickly and are not mourned.
3. **The interface responds before it animates.** Hover and focus feedback lands in
   90ms. Anything slower feels broken regardless of how nice the curve is.

### 15.2 Curves

| Token | Value | Use |
|---|---|---|
| `ease-entrance` | `cubic-bezier(0.16, 1, 0.30, 1)` | Reveals, panels arriving, drawers opening |
| `ease-state` | `cubic-bezier(0.40, 0.00, 0.20, 1)` | Tabs, toggles, height changes, nav solidify |
| `ease-exit` | `cubic-bezier(0.40, 0.00, 1.00, 1)` | Anything leaving |
| `ease-cursor` | `cubic-bezier(0.33, 0.00, 0.15, 1)` | Fake cursor travel only |

### 15.3 Durations

| Token | Value | Use |
|---|---|---|
| `instant` | 90ms | Hover colour, focus ring, row highlight |
| `quick` | 140ms | Button press, chip toggle, underline growth |
| `base` | 220ms | Tab change, row expand, panel swap, nav solidify |
| `considered` | 340ms | Scroll reveal, product state change, drawer |
| `deliberate` | 520ms | The memory-system stage change |

**Nothing on the site exceeds 600ms** except the once-per-viewport sequences in §15.6,
and those are composed of steps that each obey the table above.

### 15.4 Scroll reveals

- `opacity 0 → 1` and `translateY 12px → 0`
- `considered` 340ms on `ease-entrance`
- Trigger at 25% of the element in viewport
- Stagger 40ms, **maximum 4 staggered children**. Beyond that, reveal as one block.
- **Once only.** Never re-animate on scroll back up. Re-animation is the fastest way
  to make a site feel cheap.
- 12px of travel, not 40px. Long travel reads as marketing.

### 15.5 Hover and state

| Target | Behaviour |
|---|---|
| Button | Background darkens one step. No transform, no shadow. |
| Product row | Background steps up plus a 2px `vera-600` left bar. No lift. |
| Link | Underline grows 0 to 100%, left origin, `quick`. |
| Nav link | Same underline growth. No colour change. |
| Product frame | **Nothing.** Frames never respond to hover as a whole. |
| Tab | Fill and rule cross-fade on `base`. |
| Diagram node | Border strengthens one step on `instant`. Never scales. |

### 15.6 Sequences

Four choreographed sequences exist. Each plays **once per viewport entry**, then
rests. None loops indefinitely.

**ASK VERA** (about 9–11s per use case)

```
click field                     600ms   ▸ field gains focus ring
type question                  ~2200ms  ▸ 32–55ms/char with jitter (§16)
thinking                        700ms   ▸ 1px rule fills left to right
answer blocks appear            —       ▸ blocks 120ms apart, ease-entrance
source strip appears            220ms
click "View sources"            —       ▸ drawer slides in, considered 340ms
click "Share"                   —       ▸ confirmation chip, quick 140ms
advance to next use case        —       ▸ crossfade base 220ms plus 200ms hold
```

**TRACK WORK** (about 7s)

```
hover issue row                 instant 90ms
open context panel              base 220ms, ease-state
change tab                      base 220ms
reveal ownership column         considered 340ms
```

**HOW VERA WORKS** (about 5s per surface). Three beats per surface, each holding 900ms:

```
WHERE IS VERA        200ms  ▸ highlight the CC field / invite / attachment
WHAT VERA DID        340ms  ▸ capture line appears, delayed 400ms
WHAT CHANGED         340ms  ▸ Provenance update appears, delayed 400ms
```

Every How Vera works use case must answer all three. A surface that shows only one or
two beats is incomplete.

**THE SYSTEM COMPOSITION**, exactly four states, about 6.6s. Full spec in **§13.6**.
**Never animate tokens individually.**

```
state 1  WORK IN at full emphasis, as one group        hold 1500ms
state 2  VERA and PROVENANCE at full emphasis          hold 1500ms
state 3  WORK OUT at full emphasis, as one group       hold 1500ms
state 4  entire system at full emphasis, settled       permanent
```

Crossfade between states is `deliberate` 520ms on `ease-state`. Every element is
present from the first frame; the sequence explains the transformation **through
emphasis alone**. Emphasis is carried by text colour, fill step and border strength.
**Nothing moves, scales or re-layouts.** Total must land between 6 and 8 seconds.
Plays once on viewport entry, then rests in state 4 indefinitely.

### 15.7 What never animates

Headlines never animate per letter or per word. Numbers never count up. Nothing
parallaxes. Logo strips never marquee. **Nothing pins or scroll-jacks**; the memory
system plays on entry rather than capturing the scroll. No page transitions. No cursor
trails, no magnetic buttons, no tilt-on-hover, no reveal masks on images. No looping
ambient motion of any kind.

---

## 16. Fake cursor behaviour

The fake cursor is the site's highest-risk element. Done well it is the most
convincing thing on the page; done badly it is the most embarrassing.

### 16.1 The distinction

**The real user's cursor is never customised or replaced.** No custom pointer, no
follower dot, no blend-mode circle. The fake cursor exists **only inside product demo
frames**, as a drawn element belonging to the demo.

### 16.2 Appearance

- A drawn arrow, 16x16, `ink` fill with a 1px `mineral-000` outline so it stays
  legible on any surface it crosses.
- Not a screenshot of an OS cursor. Not a circle, not a dot, not a ring.
- Stacked above the frame content and clipped to the frame. It never escapes the
  product frame onto the page.

### 16.3 Travel

- Duration 380–520ms, scaled to distance, on `ease-cursor`.
- **Never travels in a straight line over long distances.** Follow a quadratic curve
  with the control point offset perpendicular to the path by about 8% of the distance.
  Straight-line travel is what reads as "robot" rather than "hand".
- Settle pause of 80ms at the target before clicking.
- **An idle cursor rests.** It does not drift, float, breathe or orbit.

### 16.4 Click

1. The cursor scales to 0.88 over 90ms and back over 90ms. *(The one permitted spring.)*
2. A 20px ring pulses from the click point: 1px `vera-600`, opacity 0.5 to 0, 320ms.
3. **The target element shows its real `:active` state simultaneously.** The demo
   drives actual component states; it does not fake them with overlays.

### 16.5 Typing

- 32–55ms per character with random jitter. Never a constant interval.
- Plus 180ms after a comma, plus 320ms after the final character before submitting.
- The caret blinks at a 1.06s period.
- Occasional realism is permitted but must be rare: at most one brief hesitation per
  sequence. Never fake a typo and correction; it reads as a gimmick.

### 16.6 Pacing and control

- **500–800ms dwell between steps** so a viewer can read what changed. The most common
  failure is a demo that is technically correct and too fast to follow.
- **Pauses on real hover** over the frame.
- **Stops permanently on any real click** inside the frame. The user has taken over and
  the demo must not fight them for control. This is non-negotiable.
- **Pauses when the section leaves the viewport**, resuming from the same step.
- A visible step indicator (small dots or a segment rule) shows position in the
  sequence and is clickable to jump.

### 16.7 Accessibility and small screens

- Under `prefers-reduced-motion` the sequence does not play. It renders the **final
  state of each step**, with the step selector as the control. All content is reachable
  without motion.
- **Below 768px the cursor sequence does not run at all.** It is replaced by the same
  states advanced by a swipeable step control. Autoplaying a pointer demo on a touch
  device is incoherent, because there is no pointer.
- The demo is fully operable by keyboard independently of the sequence.

---

## 17. Responsive principles

### 17.1 Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Wide | 1440px and up | Wide track available to product frames |
| Desktop | 1240px | Default 12-column layout |
| Laptop | 1024px | Layout C loses its right bleed; frames go full width |
| Tablet | 768px | Single column; nav collapses; cursor sequences stop |
| Mobile | 480px | Compact product variants |

### 17.2 Principles

- **Product frames do not shrink into illegibility.** Below 1024px a frame switches to
  a *focused* variant showing one panel at a time, with the mode switcher becoming a
  horizontally scrollable strip. It never renders a 5-column table at 320px.
- **Display type scales but never thins.** `display-1` runs 76 → 60 → 48 → 40px. Weight
  stays 600 at every size. Tracking relaxes slightly as size drops.
- **Section labels never shrink below 17px.** They are the thing that must keep
  registering.
- Section rhythm `128 → 88 → 64`. Page margins `32 → 24`.
- **Layouts collapse to a declared order**, not to source order. Layout C's product
  frame moves *below* its heading; layout B's two columns stack heading then body.
- Touch targets 44px minimum, with 8px minimum between adjacent targets.
- **The descent holds at every breakpoint.** It is structural, not decorative.

---

## 18. Accessibility and contrast

### 18.1 Verified ratios

| Pair | Ratio | Verdict |
|---|---|---|
| `ink` on `mineral-100` | **13.3:1** | AAA, the system default |
| `slate` on `mineral-100` | **5.2:1** | AA body, AAA large |
| `vera-600` on `mineral-100` | **6.0:1** | AA body, the green text colour on light |
| `vera-700` on `mineral-100` | **8.5:1** | AAA, but reads as ink; use as a fill |
| `clay-700` on `mineral-100` | **5.2:1** | AA body |
| `ochre-700` on `mineral-100` | **4.9:1** | AA body |
| `graphite` on `mineral-000` | **11.3:1** | AAA, mono lines inside the core panel |

**On basalt (`basalt-700 #33403B`) — the descent:**

| Pair | Ratio | Verdict |
|---|---|---|
| `on-deep` on `basalt-700` | **9.1:1** | AAA, the descent default |
| `on-deep-muted` on `basalt-700` | **7.0:1** | AAA |
| `on-deep-subtle` on `basalt-700` | **5.1:1** | **AA body.** Passes — no exception needed |
| `vera-300` on `basalt-700` | **5.9:1** | AA body, the green text colour on the descent |
| `vera-400` on `basalt-700` | **4.0:1** | **Fails.** Light-half use only |
| `mineral-000` panel on `basalt-700` | **10.5:1** | The core panel's lift |
| `mineral-100` above / `basalt-700` below | **9.1:1** | The descent boundary |

**Only one token in the system now falls below 4.5:1:**

- `mineral-500 #7E8A88` on the light canvas — **3.0:1**. Meets the 3:1 floor for large
  text and UI borders only; never for body.

The descent's tertiary text used to be the second one. Moving the ground from near-black
to basalt lifted it from 4.0:1 to **5.1:1**, which removed the one sanctioned exception
this system carried. **Do not reintroduce a sub-AA text token by darkening the descent.**

### 18.2 Rules

- Body text at least 4.5:1. Large text (24px and up, or 19px and up at weight 600) at
  least 3:1. UI borders and state indicators at least 3:1.
- **Never encode meaning in colour alone.** Every signal carries a colour, a glyph and
  a word. A blocker is a clay dot *and* a distinct glyph *and* the word "Blocker".
- **Focus is always visible.** A 2px `vera-600` ring at 2px offset on light, `vera-300`
  on deep. `:focus-visible` is never removed, including on demo frames and the mode
  switcher.
- Product demos are keyboard operable: the mode switcher is a real `tablist` with
  arrow-key navigation, rows are focusable, and the drawer traps and restores focus.
- All sequence content is present in the DOM as text, not painted into canvas or
  SVG-only, so it is reachable by screen readers.
- `prefers-reduced-motion: reduce` makes reveals instant, renders sequences as static
  end states with manual controls, and drops hover transitions to 0ms. **The descent
  still happens**, because it is a colour rather than a motion.
- Text over any tint must independently meet 4.5:1 against that tint, not against the
  canvas behind it.
- Minimum body size is 15px. Nothing below 11.5px anywhere, and 11.5px is mono metadata
  only.

---

## 19. Illustration and diagram rules

### 19.1 Illustration

There is **no illustration system**. No stock illustration, no 3D renders, no isometric
buildings, no abstract shapes, no mascots, no spot illustrations.

One permitted device: a **line drawing derived from a plan or section**, orthogonal,
1px, at `mineral-300` or `hairline-deep`, used at most **once per page** as a structural
background element behind a statement. It is never a hero, never coloured, never
animated, and never the subject.

Photography is not part of the system. If a real product screenshot is ever needed, it
goes inside a `product-frame` and follows §10.

### 19.2 Diagrams

- **Orthogonal only.** Lines run at 0 and 90 degrees, with 4px radius on turns. No
  beziers, no curves, no diagonal connectors, no neural-network spaghetti.
- **Nodes are rectangles** at `chip` 3px radius. Never circles, never blobs, never
  hexagons. Fill `basalt-600` on the descent, `mineral-200` on light, 1px border.
- **Labels sit inside nodes** at `ui-sm`, or outside and left aligned for group labels.
  Group labels are `mono-sm` in `vera-300` (descent) or `slate` (light).
- **Maximum 9 nodes** in any diagram. If it needs more it is the wrong diagram: split
  it, or replace it with a table.
- **Arrowheads only at terminal outputs.** Direction is carried by node order and
  reading direction, not by decorating every connector.
- Diagrams sit on a recessed surface (`mineral-200` on light, `basalt-600` on the descent).
  **A diagram is never inside a bordered card.**
- Line weight is 1px throughout. A diagram with three line weights is a diagram that
  has not decided what matters.

### 19.3 Compositions are not diagrams

**The system composition (§13) and the Thesis progression (§23.4) are compositions,
not diagrams**, and they are governed by their own specs rather than by §19.2. The
distinction matters:

| | Diagram | Composition |
|---|---|---|
| Structure carried by | Nodes and connectors | Convergence, adjacency and surface lift |
| Lines | 1px orthogonal connectors, arrowheads at terminals | **Curved hairlines that converge to a single point. No arrowheads, ever.** |
| Depth | Flat | Material — a lifted plane over stone |
| Pairing | Each input maps to its own output | Many collapse into one; something different returns |
| Purpose | Explains a mechanism | States a relationship |

**The curve exception.** §19.2 forbids curves and beziers. The system composition
(§13.4) is the single, named exception on the entire site, and it earns it: the curves
there converge to one focal point, which is precisely what a flowchart's connectors do
*not* do. A flowchart pairs each input to its own output down a track. A convergence
field collapses many things into one system and fans something different back out.
That geometric difference is the whole distinction between a process diagram and a
statement about how a system works.

The exception is bounded: curves appear **only** in §13.4, only converging to a single
point, only at 1px in `vera-300`, and never with an arrowhead. Anywhere else on the
site, §19.2 holds and curves are forbidden.

Everything else that needs to show a relationship is a diagram and obeys §19.2. Do not
create a third category.

---

## 20. Things to avoid

### Absolutely forbidden

Purple gradients · glowing orbs · neural-network spaghetti · particle fields · AI
sparkle icons · glassmorphism · backdrop blur as decoration · gradient blobs · floating
abstract shapes · dark-mode toggle · light/dark patchwork banding · pill-shaped buttons
· all-caps tracked micro-eyebrows · mono navigation · mono body copy · serif on the
homepage · magazine layouts · stock photography · emoji · fake macOS window chrome ·
icon-in-a-rounded-square feature tiles · counting numbers · marquee logo strips ·
scroll-jacking · pinned sections · parallax · per-letter headline animation ·
character-by-character answer streaming · custom replacement cursors for the real user
· looping ambient animation · drop shadows outside the four defined levels · any fifth
colour family.

### The specific failures of the previous site

| Failure | The rule that fixes it |
|---|---|
| Too beige, too pale, too delicate | Mineral canvas, 13.3:1 ink, weight 600 display, body at 430 (§3, §4) |
| Too dependent on 1px grey borders | Rules are structural and never close around prose (§7.1 rule 5) |
| Too many cards | A container must earn its border; only product UI and one list get frames (§7.1) |
| Too much monospace | Mono has exactly two jobs, both derived from real constraints (§4.5) |
| Too much serif, too editorial | Serif is confined to `/thesis` (§4.6) |
| Dark/light patchwork | One descent, never returning (§6.3) |
| Over-animation | Motion must carry meaning; four sequences, each once per entry (§15) |
| Too thin typographically | No weight below 400 anywhere; display never below 500 (§4.2) |
| Everything centred, identical sections | Named layout vocabulary; no two adjacent sections share a triple (§6) |

### Content traps

- **Do not position the problem as "document search is hard".** The problem is
  fragmented property context across people, departments, emails, meetings, documents,
  consultants, drawings, decisions, systems and time.
- **Do not explain Vera in the hero.** The hero establishes outcome and ambition.
- **Do not let Vera become the brand.** Vera is a product section inside Provenance.
- **Do not use Year 1 / Year 3 / Year 7 marketing timeline diagrams.**
- **Keep "persistent intelligence layer for physical assets" and similar abstraction on
  `/thesis`**, not on the homepage.
- **Do not name the concepts on the homepage.** "Context decay" and "organisational
  amnesia" are `/thesis` vocabulary. The homepage describes the same reality in plain
  English and is stronger for it (§24.1).
- **Do not put arrowheads on the system composition's curves.** They converge to a
  point; arrowheads turn a convergence field back into the flowchart it was rebuilt to
  stop being (§13.4, §19.3).
- **Do not make the system composition's two columns symmetrical.** Work in is thin
  and uniform, work out is short and specific. The asymmetry is the argument (§13.2).
- **Do not turn the homepage into an investor manifesto.** No market sizing, no
  roadmap, no thesis language. The homepage sells the product; `/thesis` makes the
  argument.

---

## 21. Reference patterns learned from awesome-design-md

Studied: Linear, IBM, Superhuman, Intercom, Stripe, HashiCorp, Vercel, Figma, Warp,
ClickHouse, Sanity, Raycast, Sentry. What each contributed, and where this system
deliberately diverges.

| Source | Pattern adopted | Where it lives | How Provenance diverges |
|---|---|---|---|
| **Linear** | Surface ladder carries hierarchy without shadow; product UI is the protagonist; accent is scarce (mark, CTA, focus only); positive tracking marks taxonomy against negative-tracked display | §7.2, §10, §3.6, §4.3 | Linear is a pure dark canvas. Provenance is predominantly light and descends once. Linear's -3px display tracking would collide Pliant; ours is measured at -0.020em. |
| **IBM / Carbon** | Light canvas plus one grey step plus charcoal covers 95% of surfaces; depth from hairline and surface change, never shadow; **sentence-case section labels rather than all-caps tracked eyebrows**; 4px grid; only the footer inverts | §3.1, §7.4, §4.4, §5.1 | Carbon's signature is weight-300 display at 0px radius. Provenance uses weight 600 and 6px radius: we want mass and tactility where Carbon wants lightness and flatness. |
| **Intercom** | **The canvas is not white, so white becomes a lift**; and the decisive one, **Fin Orange is the AI-product colour used only on AI-product CTAs, while charcoal remains the system primary** | §3.1, §3.6, §8.4, §11 | This is the direct precedent for Vera green versus ink. Intercom's canvas is warm cream; ours is cool mineral, because institutional beats editorial for this audience. |
| **Superhuman** | **One filled CTA per band, never two**; sub-default variable weights for warmth; tight display leading; ink is never pure black; a page has a designated resolving chord | §8.4, §4.3, §6.3 | Superhuman flips polarity three times per page. Provenance flips once; the patchwork is exactly what we are correcting. |
| **Stripe** | **Tabular figures wherever money and numerics appear**, the quiet financial-data signal | §4.5, §10.2 | Pliant has no tabular figures, so the same goal is met by routing aligned numerals to IBM Plex Mono. The constraint produced a better rule than the original. |
| **HashiCorp** | **You should know which product a section belongs to from the corner of your eye**; never mix two product accents in one viewport; tight display leading against relaxed body leading; 8px CTAs read engineered, pills read consumer | §11, §12, §8.4, §4.3 | HashiCorp gives seven products seven colours. Provenance has two *layers* of one product, so the split is green-active versus graphite-persistent, not brand versus brand. |
| **Vercel** | Stacked micro-shadows with tiny offsets instead of one heavy drop; a deliberate step for every divider, border and disabled state; sentence case with negative tracking; display ceiling at 600 | §7.4, §3.2, §4.3 | Vercel's mesh gradient is its entire decoration system. Provenance has no decoration system: the product is the decoration. |
| **Figma** | **Body hierarchy comes from weight, not opacity**; mono is a taxonomy tool, never a reading face; return to the canvas between statements so each one reads as deliberate | §4.5, §6.4, §7.1 | Figma's colour blocks are the narrative. Provenance's narrative is the descent, one directional move rather than a rotation through pastels. |
| **ClickHouse** | **Scarce at the element, generous at the band**; **show the query, do not paint a picture of the query**; never repeat a surface mode in two consecutive bands | §2.8, §2.6, §6.4 | ClickHouse's voltage is one electric colour on black. Provenance's is contrast and density on mineral. |
| **Warp** | Every neutral carries a consistent tint, dividers included; tight button radii read engineered; a quiet hero display weight is more confident than a loud one | §3.1, §7.3 | Warp has no chromatic accent at all. Provenance needs two registers, so green does real semantic work. |
| **Sanity** | A single consistent activation colour across every interactive element; structured content deserves a structured stage | §8.3, §18.2 | Sanity uses vivid neon signal colours. Ours are muted and mineral, because the assets are real rather than digital. |
| **Raycast** | **Radius encodes scale and nesting**; category accents appear only inside product imagery, never on chrome; a signature device used once per page maximum | §7.3, §3.4, §19.1 | Raycast is a four-step dark ladder. Ours is a three-step light ladder plus one descent. |
| **Sentry** | Chrome geometry stays constant when polarity flips; a keyword highlight is a typographic device rather than a swatch | §9.2, §6.3 | Sentry alternates polarity per page type. Ours descends once per page. |

**The synthesis in one line.** Intercom's product-colour architecture and non-white
canvas, on IBM's institutional light discipline and honest section labels, with
Linear's product-as-protagonist and surface-ladder hierarchy, Superhuman's one-CTA
restraint, Stripe's numeric precision and HashiCorp's layer legibility, resolved by a
structural idea none of them use: **a page that descends once, from working surface
into substrate, and does not come back.**

---

## 22. Homepage visual rhythm

| # | Section | Surface | Layout | Density | Motion budget |
|---|---|---|---|---|---|
| — | Nav | `mineral-100` | — | — | Solidify on scroll, 220ms |
| 1 | **Hero** | `mineral-100` | B — Anchored | quiet | One 340ms entrance. Nothing else. |
| 2 | **The problem** | `mineral-100` | A — Stated | quiet | Reveal only. Typography alone. |
| 3 | **Meet Vera** | `mineral-050` | D — Full stage | **loud** | About 60% of the page's total motion. Track / Ask / Surface in one frame. |
| 4 | **How Vera works** | `mineral-100` | C — Staged | medium | Three-beat sequence per surface. |
| — | **▼ THE DESCENT ▼** | | | | Hard edge. No transition effect. |
| 5 | **The memory layer** | `basalt-700` | E — Descent | medium | **The system composition (§13).** Four-state emphasis sequence, about 6.6s, once. |
| 6 | **Provenance over time** | `basalt-700` | A — Stated | quiet | Reveal only. Three lines. |
| 7 | **FAQ** | `basalt-700` | F — Ledger | quiet | Row expand, 220ms. About six questions. |
| 8 | **Closing** | `basalt-900` | E — Descent | quiet | One headline, one `inverse` button. |
| — | Footer | `basalt-900` | — | — | None. Carries the ambition line. |

**Heights are not specified here on purpose.** Section height is determined by content
and interaction, never by a target number. See **HOMEPAGE.md §1** for pacing estimates
and the rule that governs them.

**Consultant onboarding is not a section.** It is use case 06 inside Ask Vera — a
question typed into the product, not a separate band. See HOMEPAGE.md §3.2.

### Notes on the arc

- **Exactly one `loud` section.** Meet Vera is the first major product reveal and the
  peak. Everything before it builds tension quietly; everything after it resolves. A
  second loud section would flatten the page.
- **Sections 1, 2, 6, 7 and 8 are quiet.** Five of eight are calm. That ratio is what
  makes the product moment land and what stops the page feeling busy.
- **Section 2 is typography only:** no product UI, no diagram, no cards, no animation
  beyond the reveal. Three questions at `display-3` separated by full-width hairlines,
  then the two-line resolution. This is deliberately the emptiest section on the page,
  and it should be the most quoted.
- **The descent sits after the working half and before the substrate half**, so the
  tonal change is doing semantic work.
- **Sections 5–8 are one continuous basalt passage.** They are not four dark bands, and
  they are not a dark theme. They are one stone half with internal rules (§6.3).

### Section content anchors

- **Hero** — *"Keep track of what is happening now. Never lose why it happened."*
  Supporting: one shared record of what is happening, what happened, and why, across
  every property in the portfolio. Does not explain Vera. Does not show an architecture
  diagram. Does not autoplay anything.
- **The problem** — *"Simple questions shouldn't require a scavenger hunt."* Three real
  questions, then *"The information usually exists. The answer is scattered."*
- **Meet Vera** — *"Your AI teammate across every function of your portfolio."* One
  frame, three modes: **Track the work**, **Ask Vera**, **Proactive Insights**. The
  user switches between them. Not three sections, not three cards.
- The three modes answer three different questions, and the product UI must make that
  legible without the tab labels: **Track the work** — *what is happening?* ·
  **Ask Vera** — *what happened, why, and what do I need to know?* ·
  **Proactive Insights** — *what should I know that I did not think to ask?*
- **Proactive Insights is the differentiating mode**, not a notifications feature.
  Track is what your team is already managing; Surface is what Vera noticed. Four signals
  only — a conflict, a blocker, an opportunity, an expiry — each showing its **derivation**
  (§10.7). Tracked rows have owners; detected signals have derivations. Supporting line,
  used once: *"Vera doesn't wait for you to know what to ask."*
- **How Vera works** — every use case answers *where is Vera*, *what did Vera do*,
  *what changed in Provenance*.
- **Consultant onboarding** — Ask Vera use case 06, not a section of its own
  (HOMEPAGE.md §3.2). It is a question typed into the product, and it returns a brief
  rather than an answer.
- **The memory layer** — *"Everything Vera learns builds Provenance."* Hosts **the
  system composition (§13)**: work in → Vera → Provenance → work out. The composition
  is the section; it needs no supporting diagram and no feature list beside it.
- **Provenance over time** — *"Teams change. The property persists. Its context should
  too."* Plain English only. This is where a reader would meet "context decay" and
  "organisational amnesia" if those words were allowed on the homepage — they are not
  (§24.1). The concepts are described here in ordinary language and named on
  `/thesis`.

---

## 23. The Thesis page

`/thesis` is where the argument lives. The homepage stays product-focused and
concrete; this page is allowed to be conceptual. It is the **only** place the
company's abstract vocabulary appears at length.

### 23.1 The argument

Physical assets often live for decades. The people, teams, consultants and owners
around them do not. Most organisations preserve documents but do not preserve usable
context. Property knowledge should compound instead of resetting.

Vera creates immediate utility by helping teams work.
Provenance turns that daily work into persistent asset memory.

Commercial real estate is the starting point. The ambition is **building the memory
layer for real assets.**

### 23.2 The two concepts

**Context decay** begins while people are still actively working on a property. A
decision gets made in a meeting. The rationale lives in someone's email. A consultant
holds one part of the story. A drawing changes. Someone else tracks the outstanding
issue. The records exist, but the connections between them weaken. Over time the
context becomes harder to reconstruct.

**Organisational amnesia** is what context decay compounds into. People leave.
Consultants change. Departments rotate. Projects pause. Years pass. Properties change
ownership. The organisation still has the files, but it increasingly forgets why
decisions were made, what was tried before, why something failed, which assumptions
changed, which issues remain unresolved, who knew what, and what evidence supported a
decision.

The through-line:

> **Context decays. Organisations forget. Properties persist.**

Alternates, for use in different positions on the page — pick one per page, never two:

> The files survive. The context doesn't.

> Context decay becomes organisational amnesia.

### 23.3 Structure

| # | Section | Surface | Layout | Treatment |
|---|---|---|---|---|
| 1 | Opening statement | `mineral-100` | A — Stated | **The one serif moment.** `quote-serif` 44px, c1–c7. |
| 2 | Context decay | `mineral-100` | A — Stated | Typography only. The five-clause sequence set as separate lines. |
| 3 | Organisational amnesia | `mineral-050` | A — Stated | The forgetting list, set as a ledger (layout F), not as cards. |
| 4 | The progression | `mineral-100` | B — Anchored | **Three stacked bands.** See §23.4. |
| — | **▼ THE DESCENT ▼** | | | Same hard edge as the homepage. |
| 5 | What we believe | `basalt-700` | A — Stated | Typography only, `display-2`. |
| 6 | Vera and Provenance | `basalt-700` | B — Anchored | Two paragraphs, no diagram — the homepage already showed it. |
| 7 | Where this goes | `basalt-700` | E — Descent | Commercial real estate as the starting point. |
| 8 | Closing | `basalt-900` | E — Descent | *Building the memory layer for real assets.* One `inverse` button. |

The Thesis page uses **the same descent** as the homepage (§6.3). Two pages, one
structural idea. It descends at the point where the page turns from diagnosis to
belief.

### 23.4 The progression device

```
CONTEXT DECAY            ↓            the connections weaken while work is live
ORGANISATIONAL AMNESIA   ↓            the organisation forgets why
PROVENANCE                            the persistent memory layer for the asset
```

Three horizontal bands, stacked. Each is a real surface with a 1px top edge highlight,
so the group reads as a section through ground rather than as three list items.
**No arrows and no connectors** — this device does not get §13's curve exception
(§19.3), because nothing here converges; it accumulates.

The bands get progressively more solid down the stack. **Context decay** is drawn as
the most broken: its fill is interrupted at intervals, the gaps standing for the
connections that have weakened. **Organisational amnesia** is a partial fill. **Provenance**
is a single unbroken band, the only whole surface in the group. The argument is legible
from the fills alone, before any label is read.

The vertical order is fixed and never inverts: decay on top, because it happens first
and nearest the surface; Provenance at the bottom, because it is the substrate.

This is a **static composition.** It reveals on scroll and does nothing else. The
Thesis page has no sequences, no fake cursor and no product demos. It is the quiet
page.

### 23.5 Rules

- **No product UI on this page.** Not one frame. If the argument needs a screenshot to
  land, the argument is not written well enough.
- **Serif appears exactly once**, in section 1, and never below 28px (§4.6).
- Vera green appears only in the §23.4 stratum labels and the closing button. This
  page belongs to Provenance's register.
- Long-form measure: `body` at max 62 characters. This is the only page on the site
  with sustained reading, and it should be genuinely pleasant to read.
- No statistics, no market-size framing, no investor language, no roadmap.

---

## 24. Language and terminology

Where each register is allowed to appear. This is a guardrail, not a style
suggestion — the homepage failing to the abstract register is a real risk.

| Register | Allowed on | Example |
|---|---|---|
| **Plain English** | Homepage, product UI, nav, buttons | "Simple questions shouldn't require a scavenger hunt." |
| **Concept vocabulary** | `/thesis`, company-level messaging | "Context decay", "organisational amnesia" |
| **Ambition language** | `/thesis` closing, About, investor and press material | "The memory layer for real assets", "persistent intelligence layer for physical assets" |

### 24.1 The homepage rule

**The homepage explains the problem in plain English and never names the concepts.**

It says: *"Simple questions shouldn't require a scavenger hunt."* It shows three real
questions. It says *"The information usually exists. The answer is scattered."*

It does **not** say "context decay", "organisational amnesia", "institutional memory",
"persistent intelligence layer", or "compounding knowledge". A reader should
understand the problem completely without meeting a single piece of terminology.

The one exception is the tagline **"Building the memory layer for real assets"**,
which may appear once, in the footer or as the closing line, as a statement of
ambition rather than an explanation.

### 24.2 Naming

- **Provenance** is the company and the memory layer. Always capitalised, never
  "the Provenance".
- **Vera** is the AI teammate. Always capitalised, never "the Vera", never "Vera AI",
  never "your Vera".
- The relationship, stated the same way every time:
  **Vera works with your teams. Provenance remembers for the property.**
- Never describe Vera as a chatbot, an assistant, a copilot or an agent. Vera is a
  **teammate** — the word does real work, because it sets the expectation that Vera is
  present across functions rather than summoned to a text box.
- Never write "AI-powered". The product demonstrates it.
- **Never describe Vera by what Vera retrieves.** Not "summarises your email", not
  "searches your documents", not "answers questions about your property". Those describe
  a capability that is commoditising, and they position Vera on ground it does not need
  to defend. Describe what Vera *maintains* and what Vera *notices* (§11).

### 24.3 No competitor comparison

**No competitor is named anywhere on the site except one FAQ answer.** Not Copilot, not
ChatGPT, not Claude. No "unlike general AI tools", no comparison table, no "not just
another chatbot".

The product behaviour is the comparison. A signal that exists only because Vera connected
a June meeting to a drawing filed months later demonstrates the difference more
convincingly than any sentence claiming it. **If the page needs a sentence to explain why
it is different, the product surfaces are not doing their job** — fix the surfaces, not
the copy.

The single exception is the FAQ question *"Why not just use ChatGPT or Claude?"*, which
answers plainly and without disparagement.

### 24.4 Voice

- Sentence case everywhere, including buttons and section labels.
- Statements end in a period. Confidence is punctuation, not exclamation.
- Present tense for what the product does. Past tense for what it captured.
- No em dashes. Full sentences.
- Specific over general: "Turning analysis overdue by six days" beats "track your
  deadlines".

### 24.5 Copy rule: no em dashes

**Never use an em dash in Provenance customer-facing copy.** Not on the homepage,
not on the Thesis page, not in product demo text, buttons, metadata, helper text,
FAQ answers, source descriptions, or any future marketing copy.

Use a comma, a period, a colon, parentheses, or a semicolon instead. Most em dashes
are two sentences avoiding the decision to be two sentences, and the rewrite is
almost always shorter and more direct:

- A dash joining a qualifier becomes a comma: `Yes, but 3 things need to be resolved.`
- A dash joining two independent statements becomes two sentences:
  `Not yet. The delivery condition is at risk.`
- A dash introducing a definition becomes a colon.
- A dash holding an aside becomes parentheses, or the aside is cut.

This rule applies to strings a visitor can read. Source comments are not customer-facing
copy and are exempt.

### 24.6 Vera voice rule

**Vera is gender-neutral.** Avoid gendered pronouns in customer-facing copy.
Prefer using "Vera" directly. If a pronoun is required, use they/them/their.

Never *she*, *her* or *hers*. The name repeats more often than a pronoun would,
which is a feature: it reinforces the product name at no cost.

| Instead of | Write |
|---|---|
| She noticed the change. | Vera noticed the change. |
| Her interpretation | Vera's read |
| Everything she learns | Everything Vera learns |

**Green means Vera.** Solid green is Vera speaking, a pale `vera-200` wash is
Vera reasoning about a region, a 3px `vera-700` edge is Vera having connected
or focused something, and green text is a Vera label. Green is never a normal
button, a generic selected row, a success state unrelated to Vera, or
decoration. The Track the Work list contains no green for exactly this reason.

**The Vera mark is Convergence.** Three strokes enter at three heights, meet at
one node, and leave as a single path: scattered context, convergence,
understanding. 32 unit grid, 3 unit stroke, `currentColor`, implemented once in
`src/components/vera/VeraMark.tsx`. It appears at the Meet Vera lockup, in the
narrator identity row, beside the Ask Vera tab, on the Proactive Insights
reasoning header and in product chrome, and nowhere else. It never sits beside
every generated sentence, evidence row or green highlight.

**The narrator is a branded annotation**, not a tooltip: a 14px mark and VERA
over the message, solid `vera-600`, white type, and pacing driven by story
beats rather than word count. A cue with no fixed hold stays mounted while the
product keeps moving underneath it and leaves when the demo reaches the next
focal point. It fades, repositions while invisible and fades in; it never
glides.

The full sub-brand system, including the selected mark, the semantic green
scale and the motion rules, lives in `VERA_BRAND.md`. That document is
subordinate to this one: Vera is a layer inside Provenance, never a parallel
brand.

## 25. Tokens and example components

### 25.1 CSS custom properties

```css
:root {
  /* mineral ground */
  --mineral-000: #FBFCFB;
  --mineral-050: #F4F6F5;
  --mineral-100: #E9ECEB;   /* canvas */
  --mineral-200: #DCE1DF;
  --mineral-300: #C9D0CD;   /* hairline */
  --mineral-400: #A8B2AF;   /* structural rule */
  --mineral-500: #7E8A88;   /* 3.0:1 — large text, borders, disabled only */
  --slate:       #56636A;
  --graphite:      #323A3B;
  --graphite-lift: #3D4749;   /* emphasis step on deep */
  --ink:         #1E2422;
  --ink-deep:    #161B1A;

  /* Vera */
  --vera-050: #EFF5F1;
  --vera-100: #E1EDE6;
  --vera-300: #A6C7B5;
  --vera-400: #6FA98C;      /* Vera text on deep */
  --vera-600: #2A6249;      /* Vera text and focus on light */
  --vera-700: #1F4A38;      /* Vera fill */
  --vera-800: #173329;

  /* signals, product surfaces only */
  --clay-100: #F3E4DE;  --clay-600: #A35F45;  --clay-700: #8F5038;
  --ochre-100:#EFE9DA;  --ochre-600:#9A7B3F;  --ochre-700:#7D6229;

  /* on deep */
  /* basalt — the descent. A stone family, not a dark theme. */
  --basalt-500: #4A5852;    /* hover / emphasis step */
  --basalt-600: #3E4C46;    /* lifted surface */
  --basalt-700: #33403B;    /* THE DESCENT CANVAS — L* 25.8 */
  --basalt-800: #2B3833;    /* recessed band */
  --basalt-900: #262F2B;    /* floor — closing CTA and footer */

  --on-deep: #E9ECEB;          /* 9.1:1 */
  --on-deep-muted: #C8D2CD;    /* 7.0:1 */
  --on-deep-subtle: #A9B5B0;   /* 5.1:1 — passes AA */
  --vera-on-deep: #A6C7B5;     /* vera-300, 5.9:1 */
  --hairline-deep: rgba(233,236,235,.14);
  --hairline-deep-strong: rgba(233,236,235,.24);

  /* radius */
  --r-chip: 3px; --r-control: 6px; --r-panel: 10px; --r-frame: 14px;

  /* elevation */
  --lift-2: 0 1px 1px rgba(30,36,34,.03), 0 2px 4px rgba(30,36,34,.04);
  --lift-3: 0 1px 2px rgba(30,36,34,.04), 0 8px 24px rgba(30,36,34,.08);

  /* motion */
  --d-instant: 90ms;  --d-quick: 140ms;  --d-base: 220ms;
  --d-considered: 340ms; --d-deliberate: 520ms;
  --e-entrance: cubic-bezier(.16, 1, .30, 1);
  --e-state:    cubic-bezier(.40, 0, .20, 1);
  --e-exit:     cubic-bezier(.40, 0, 1, 1);
  --e-cursor:   cubic-bezier(.33, 0, .15, 1);
}

/* the descent — a scope, not a theme toggle. There is no dark mode. */
.descent {
  background: var(--basalt-700);
  color: var(--on-deep);
  --hairline: var(--hairline-deep);
  --vera-text: var(--vera-on-deep);   /* vera-300, never vera-400 here */
  --surface-lift: var(--basalt-600);
}
.descent-floor { background: var(--basalt-900); }   /* closing CTA + footer */
```

### 25.2 Tailwind mapping

```ts
// tailwind.config.ts — theme.extend
colors: {
  mineral: { 0:'#FBFCFB', 50:'#F4F6F5', 100:'#E9ECEB', 200:'#DCE1DF',
             300:'#C9D0CD', 400:'#A8B2AF', 500:'#7E8A88' },
  slate:    '#56636A',
  graphite: { DEFAULT:'#323A3B', lift:'#3D4749' },
  ink:      { DEFAULT:'#1E2422', deep:'#161B1A' },   // text and fills — NOT a page ground
  basalt:   { 500:'#4A5852', 600:'#3E4C46', 700:'#33403B', 800:'#2B3833', 900:'#262F2B' },
  onDeep:   { DEFAULT:'#E9ECEB', muted:'#C8D2CD', subtle:'#A9B5B0' },
  vera:     { 50:'#EFF5F1', 100:'#E1EDE6', 300:'#A6C7B5',
              400:'#6FA98C', 600:'#2A6249', 700:'#1F4A38', 800:'#173329' },
  clay:     { 100:'#F3E4DE', 600:'#A35F45', 700:'#8F5038' },
  ochre:    { 100:'#EFE9DA', 600:'#9A7B3F', 700:'#7D6229' },
},
fontSize: {
  'display-1':    ['4.75rem',  { lineHeight:'1.00', letterSpacing:'-0.020em', fontWeight:'600' }],
  'display-2':    ['3.5rem',   { lineHeight:'1.04', letterSpacing:'-0.018em', fontWeight:'600' }],
  'display-3':    ['2.5rem',   { lineHeight:'1.10', letterSpacing:'-0.015em', fontWeight:'600' }],
  'heading-1':    ['1.875rem', { lineHeight:'1.18', letterSpacing:'-0.012em', fontWeight:'600' }],
  'heading-2':    ['1.375rem', { lineHeight:'1.28', letterSpacing:'-0.008em', fontWeight:'600' }],
  'section-label':['1.25rem',  { lineHeight:'1.20', letterSpacing:'-0.006em', fontWeight:'600' }],
  'lead':         ['1.25rem',  { lineHeight:'1.50', letterSpacing:'-0.005em', fontWeight:'430' }],
  'body':         ['1.0625rem',{ lineHeight:'1.60', letterSpacing:'-0.003em', fontWeight:'430' }],
  'ui':           ['0.875rem', { lineHeight:'1.40', letterSpacing:'0',        fontWeight:'500' }],
  'ui-sm':        ['0.8125rem',{ lineHeight:'1.35', letterSpacing:'0.004em',  fontWeight:'500' }],
  'micro':        ['0.75rem',  { lineHeight:'1.30', letterSpacing:'0.010em',  fontWeight:'500' }],
  'mono':         ['0.8125rem',{ lineHeight:'1.45', letterSpacing:'0.020em',  fontWeight:'400' }],
  'mono-sm':      ['0.719rem', { lineHeight:'1.30', letterSpacing:'0.040em',  fontWeight:'500' }],
},
borderRadius: { chip:'3px', control:'6px', panel:'10px', frame:'14px' },
boxShadow: {
  'lift-2':'0 1px 1px rgba(30,36,34,.03), 0 2px 4px rgba(30,36,34,.04)',
  'lift-3':'0 1px 2px rgba(30,36,34,.04), 0 8px 24px rgba(30,36,34,.08)',
},
```

### 25.3 Section label

```tsx
<div>
  {/* vera-300 on the descent */}
  <div className="h-0.5 w-6 bg-vera-700 mb-3.5" />
  <p className="text-section-label text-ink mb-5">The problem</p>
  <h2 className="text-display-2 text-ink max-w-[20ch]">
    Simple questions shouldn’t require a scavenger hunt.
  </h2>
</div>
```

### 25.4 Product frame and row

```tsx
<div className="bg-mineral-0 border border-mineral-300 rounded-frame shadow-lift-2 overflow-hidden">
  {/* title bar: breadcrumb left, mono metadata right. No OS chrome. */}
  <div className="h-11 flex items-center gap-2.5 px-4 border-b border-mineral-200 text-ui-sm text-slate">
    <span className="text-ink font-medium">Westmount Centre</span>
    <span>/</span>
    <span>South Pad</span>
    <span className="ml-auto font-mono text-mono-sm">Updated 14:02 · 6 sources</span>
  </div>

  {/* row: 52px, bottom hairline only, vera bar on hover */}
  <div className="group relative grid grid-cols-[16px_1fr_128px_132px_96px] gap-3.5
                  items-center h-[52px] px-4 border-b border-mineral-200 last:border-0
                  hover:bg-mineral-50 transition-colors duration-[90ms]">
    <span className="absolute left-0 inset-y-0 w-0.5 bg-vera-600 opacity-0
                     group-hover:opacity-100 transition-opacity duration-[90ms]" />
    <span className="w-[7px] h-[7px] rounded-chip bg-clay-600" />
    <span className="text-ui text-ink">
      Turning analysis overdue
      <span className="ml-2.5 text-micro rounded-chip px-1.5 py-0.5 bg-clay-100 text-clay-700">
        Blocker
      </span>
    </span>
    <span className="text-ui-sm text-slate">Development</span>
    {/* mono: aligns across rows, because Pliant has no tabular figures */}
    <span className="font-mono text-mono-sm text-slate">Due 12 Aug 2026</span>
    <span className="text-ui-sm text-slate">R. Okonjo</span>
  </div>
</div>
```

### 25.5 The record line

```tsx
<ol className="relative pl-6">
  {/* hairline-deep on the descent */}
  <span className="absolute left-[3px] inset-y-1 w-px bg-mineral-300" />
  {entries.map((e) => (
    <li key={e.id} className="relative pb-6">
      <span
        className={`absolute -left-[18px] top-1.5 w-[7px] h-[7px] rounded-chip
                    ${e.capturedByVera ? "bg-vera-700" : "bg-graphite"}`}
      />
      <p className="font-mono text-mono-sm text-slate">{e.date}</p>
      <p className="text-ui text-ink mt-1">{e.label}</p>
    </li>
  ))}
</ol>
```

### 25.6 Buttons

```tsx
const base =
  "inline-flex items-center rounded-control text-button transition-colors " +
  "duration-[90ms] focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-vera-600 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-mineral-100";

const primary   = `${base} h-11 px-5 bg-ink text-mineral-50 hover:bg-ink-deep`;
const vera      = `${base} h-11 px-5 bg-vera-700 text-mineral-50 hover:bg-vera-800`;
const secondary = `${base} h-11 px-5 border border-mineral-400 text-ink hover:bg-mineral-50`;
const inverse   = `${base} h-11 px-5 bg-mineral-100 text-ink hover:bg-mineral-0`;
// no scale, no shadow, no lift on any state
```

---

## 26. Applying this document

1. **Every section declares its triple** — `(surface, layout, density)` — before any
   markup is written. If it matches its neighbour, one of them changes.
2. **Reach for typography and space before any container.** If a card feels necessary,
   re-read §7.1 and try rules and spacing first.
3. **Product UI is built, not drawn.** Real DOM, real data, real states.
4. **Every animation names what it communicates.** If the answer is "it looks nice",
   delete it.
5. **Check contrast against §18.1** before shipping any new colour pairing. Do not
   invent a neutral that is not in the ramp.
6. **Green means Vera.** If green appears in a viewport with no product UI in it, that
   is a bug.
7. When a genuinely new pattern is needed, add it here first, then build it.
