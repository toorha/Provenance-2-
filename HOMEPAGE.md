# Provenance — Homepage Blueprint

**Structure only. Nothing here is implementation.**
Every visual decision resolves to **DESIGN.md**, which is the source of truth. Where
this document names a surface, layout or motion token, it is quoting DESIGN.md rather
than inventing anything. Section references like §22 point there.

---

## 1. Recommended section order

Eight content sections, plus nav and footer. The user brief listed up to eleven; three
have been merged or moved, with reasoning in §4 of this document.

| # | Section | Surface | Layout (§6.2) | Density | Height | Role in the argument |
|---|---|---|---|---|---|---|
| — | Nav | `mineral-100` | — | — | 60px | Persistent |
| 1 | **Hero** | `mineral-100` | B — Anchored | quiet | 82vh | **The thesis** |
| 2 | **The problem** | `mineral-100` | A — Stated | quiet | 88vh | The pain, in plain English |
| 3 | **Meet Vera** | `mineral-050` | D — Full stage | **loud** | 190vh | Vera = today. The peak. |
| 4 | **How Vera works** | `mineral-100` | C — Staged | medium | 165vh | It fits how you already work |
| — | **▼ THE DESCENT ▼** (§6.3) | | | | — | Hard edge, no effect |
| 5 | **Everything Vera learns builds Provenance** | `basalt-700` | E — Descent | medium | 95vh | The turn: utility becomes memory |
| 6 | **Provenance over time** | `basalt-700` | A — Stated | quiet | 68vh | The property remembers |
| 7 | **FAQ** | `basalt-700` | F — Ledger | quiet | 78vh | Objection handling |
| 8 | **Final CTA** | `basalt-900` | E — Descent | quiet | 55vh | **The thesis, as an ask** |
| — | Footer | `basalt-900` | — | — | 40vh | Includes the ambition line |

**Total ≈ 8.6 screens.**

> ### Heights are pacing estimates, not implementation constraints
>
> Every `vh` figure in this document describes **intended proportion**, not a target to
> hit. Section height is determined by content and interaction — a section is as tall as
> the thing inside it needs to be, and no taller.
>
> **Never create empty scroll distance to reach a stated number.** If Meet Vera resolves
> at 150vh rather than 190vh because the product frame is tighter than estimated, that is
> a better section, not a shortfall. If the problem section wants 96vh to breathe, take
> it.
>
> What these numbers *are* for is **relative pacing**: the demos should dominate, the
> quiet sections should be genuinely quiet, and the page should land near nine screens
> rather than fifteen. Judge a revision by the ratios in the table below, not by the
> absolute values in the one above.

### Space allocation — the pacing test

| Content type | Sections | Share of page |
|---|---|---|
| **Product demonstration** | 3, 4 | **41%** |
| Explanatory copy | 1, 2, 6 | 28% |
| System explanation | 5 | 11% |
| Close and objections | 7, 8, footer | 20% |

The product demos get more space than all explanatory copy combined. That is the
correctness condition for this page. If a revision pushes copy above 30%, cut copy —
not demo.

### The one loud section

§22 permits exactly one `loud` section, and it is **Meet Vera**. Everything before it
builds quietly; everything after resolves. **How Vera works is deliberately `medium`,
not `loud`** — it is the second-biggest section but it must not compete with the first
product reveal, or both flatten. It achieves this by being one continuous calm
recording rather than a series of reveals.

---

## 2. What Vera is, and how the page proves it

### 2.1 The thesis, and the two registers

**The brand rests on one idea:**

> **Buildings outlive the people who work on them.**
> **Give every property a memory.**

A property can exist for decades. In that time employees leave, consultants change,
departments rotate, owners change, projects pause and restart, decisions get revisited,
systems get repaired and replaced, approvals evolve. The files survive. **The reasoning
behind them usually does not.** Provenance exists so the property does not have to
forget every time the people around it change.

**Vera and Provenance are not the same thing, and the page must never let them blur.**

| | **Vera** | **Provenance** |
|---|---|---|
| **Tense** | **Now** | **Over time** |
| What it is | The active AI teammate | The persistent memory of the property |
| What it does | Keeps the work moving today | Preserves what happened and why |
| User thinks | *"This would make my work easier tomorrow morning."* | *"This property is getting more understandable every year."* |
| Register | Immediate, operational | Accumulated, institutional |
| On the page | Sections 3–4, on mineral | Sections 5–6, on basalt |

The relationship, stated the same way every time:

> **Vera works with your team. Provenance remembers for the property.**

**The descent (§6.3) is what separates the registers.** Everything above it is Vera and
today; everything below it is Provenance and over time. That is why the tonal change
carries meaning — it is the moment the page stops talking about this week and starts
talking about the decade.

### 2.1a Brand language, in priority order

The first five lines are human and belong on the homepage. The last three are company
and thesis language, and belong on `/thesis` or in company-level messaging.

| # | Line | Where it lives |
|---|---|---|
| 1 | **Give every property a memory.** | Hero support, and the closing CTA headline |
| 2 | **Buildings outlive the people who work on them.** | **Hero headline**; opens `/thesis` in serif |
| 3 | **Vera keeps your team on track today.** | Meet Vera |
| 4 | **Everything Vera learns builds Provenance.** | The memory layer |
| 5 | **Teams change. The property remembers.** | Provenance over time |
| 6 | Building the memory layer for real assets. | Footer only, once (§2.4, DESIGN.md §24.1) |
| 7 | Context decay | `/thesis` only |
| 8 | Organisational amnesia | `/thesis` only |

**Lines 1 and 2 bookend the page.** The hero states the observation; the closing CTA
turns it into an instruction the visitor is now equipped to act on. Identical wording at
both ends would read as a copy error — the *shift from observation to imperative* is what
makes the echo land.

**Never lead with technical language.** No "AI-powered property intelligence", no
"knowledge graph", no "context engine", no "persistent intelligence infrastructure". The
product can be sophisticated without the copy sounding like it. The loop in §2.2 is
internal vocabulary for building the page — **it is never copy.**

### 2.2 The product loop

**This is the positioning the whole product section has to earn.**

Vera is not primarily an email summariser, a document search tool, or a generic Q&A
assistant. General AI tools can already summarise a thread or a PDF, and that capability
is commoditising fast. Building the page around it would be building on ground that is
disappearing.

Vera's differentiation is that Vera **continuously builds and maintains property context**
across meetings, decisions, documents, actions and changes — and then **proactively
surfaces what needs attention.**

The loop is:

```
OBSERVE  →  UNDERSTAND  →  REMEMBER  →  DETECT  →  RECOMMEND
```

It is **not**:

```
ASK  →  SEARCH  →  ANSWER
```

The difference is where the intelligence sits. In the second loop the user supplies the
intelligence — they must already know what to ask — and the tool supplies retrieval. In
the first, the system accumulates understanding over time and raises things the user had
not thought to ask about.

### 2.3 How each mode maps to the loop

| Mode | Loop stage | The question it answers |
|---|---|---|
| **Track the work** | OBSERVE · REMEMBER | *What is happening?* |
| **Ask Vera** | REMEMBER · UNDERSTAND | *What happened, why, and what do I need to know?* |
| **Proactive Insights** | **DETECT · RECOMMEND** | *What should I know that I did not think to ask?* |

**Proactive Insights is the differentiator**, not a secondary notifications feature. It
is the only mode that demonstrates the half of the loop general tools do not have, and it
is the reason the other two modes are worth building. Weight the section accordingly.

### 2.4 The positioning guardrail

**No competitor comparison anywhere on the homepage.** Not Copilot, not ChatGPT, not
Claude, not "unlike general AI tools". The product behaviour has to carry the argument —
a signal that could only exist because Vera connected a June meeting to a drawing from
last week *is* the comparison, and it is far more persuasive than a sentence claiming to
be different.

The FAQ answers *"Why not just use ChatGPT or Claude?"* directly (this document, §5, Section 7). That is
the only place on the site where the comparison is made in words.

---

## 3. Progressive disclosure — the eight beats

The visitor is never asked to hold more than one new idea at a time.

```
1  Buildings outlive the people who work on them              Section 1   THESIS
2  Simple questions become scavenger hunts                    Section 2   PROBLEM
3  Vera keeps your team on track TODAY                        Section 3   VERA = NOW
4  Track the work / Ask Vera / Proactive Insights           Section 3
5  Vera fits the tools you already use: @ / CC / invite       Section 4
6  Everything Vera learns builds Provenance                   Section 5   THE TURN
7  Teams change. The property remembers.                      Section 6   PROVENANCE = OVER TIME
8  Give every property a memory                               Section 8   THESIS, as an ask
```

Beats 1–5 sit on mineral; beats 6–8 sit on basalt, after the descent. **The tonal change
carries beat 6** — the reader feels the page shift from today to over time before reading
a word of it (§2.1).

Note the shape: the page opens on the thesis and closes on the thesis, with the entire
product argument in between. Beats 1 and 8 are the same idea stated twice — once as an
observation, once as an instruction.

---

## 4. Structural decisions

Three changes from a literal reading of the brief. Each removes a section without
removing an idea.

### 4.1 "Meet Vera" and "Vera product showcase" are ONE section — merged

The brief lists them as sections 3 and 4. They become one.

**Why.** Two sections would announce Vera, then announce Vera again. The headline
*"Your AI teammate across every function of your portfolio"* is a promise; the product
window is the proof. A promise and its proof belong in one breath. Splitting them puts
a section boundary between a claim and its evidence, which is the exact place a reader
decides whether to believe you.

The section is therefore: label → headline → the functions line → **the product
window** (three modes). One section, one arc, one boundary. This is what §22 already
specifies.

### 4.2 Consultant onboarding is an ASK VERA USE CASE, not a section — option B

The brief asked me to decide. **Option B.**

**Why.** *"Bring Northline Engineering up to speed before Thursday's kickoff"* is
literally a question typed into Vera. It is not a different capability — it is the most
impressive possible answer. Giving it a section would restate Ask Vera's mechanic in a
weaker frame and add ~70vh for an idea already proven.

As use case 06 of Ask Vera it costs **zero new sections**, and it lands harder, because
by then the viewer already trusts the input and the source strip. The brief said "do
not automatically create another huge homepage section" — this honours that.

> **Resolved.** DESIGN.md §22 no longer lists Consultant onboarding as a homepage
> section, and its content anchor now describes it as Ask Vera use case 06. The two
> documents agree.

### 4.3 Context decay / organisational amnesia go to /thesis — option B

The brief asked me to decide. **Option B**, and this is not really a judgment call:
**DESIGN.md §24.1 already forbids naming those concepts on the homepage.**

The homepage describes the same reality in plain English and is stronger for it. Section
2 shows it happening ("the answer is scattered"); section 6 shows its consequence
("teams change, the property persists"). The reader understands the whole idea and never
meets a piece of terminology. `/thesis` names it.

The one exception §24.1 allows is the ambition line **"Building the memory layer for
real assets"**, used once. Placement is settled in §5, Section 1 of this document.

---

## 5. Section specifications

### SECTION 1 — HERO

**Purpose.** State the thesis. Not the product, not the outcome, not Vera — the idea the
whole company rests on.

**User takeaway.** *"A property should remember what happened to it. That is obviously
true and nobody does it."*

**Headline** — `display-1`, manual line breaks, **c1–c11**:

> Buildings outlive the
> people who work on them.

**Supporting copy** — `lead`, **c1–c5, beneath the headline**:

> Preserve what happened, why it happened, and what still matters — even as the people
> around the property change.

**Why this headline and not an outcome line.** The previous draft opened with *"Keep
track of what is happening now. Never lose why it happened."* That is a good sentence
about a feature. It is not the thesis, and "keep track" is the first thing every project
tool says — it positions Provenance as a better task list.

*"Buildings outlive the people who work on them"* does something no competitor line can:
it states a fact the visitor already knows is true, that they have never seen anyone
build for. It earns the next ten seconds. The supporting copy then delivers the product
in five words — **give every property a memory** — so a visitor who reads only the hero
still knows what is being sold.

**The two-line bookend.** This headline is the observation; the closing CTA (Section 8)
is the imperative. Do not swap them and do not use identical wording at both ends (§2.1a).

> **Shared with `/thesis`.** That page opens with the same sentence plus *"Their context
> should too"*, set in serif as its one serif moment (DESIGN.md §23.3). This is deliberate:
> a brand's central line should appear in both places. The homepage states it plainly in
> sans; `/thesis` escalates it. Do not invent a different opener for either.

> **Layout constraint — measured during implementation.** This section was originally
> specified as layout B side-by-side: headline c1–c5, support c7–c11. **That is
> incompatible with `display-1`.** At 76px a hero line of ~27 characters needs about
> **980px** to set. A 5-column track gives 476px and a 7-column track gives 676px, both
> of which orphan words mid-phrase.
>
> The headline therefore takes **c1–c11 (1076px)** and the supporting copy sits beneath
> it at c1–c5. Still anchored-left and asymmetric; the empty right of the support row is
> deliberate space, not a gap to fill.
>
> **Consequence for the type scale:** `display-1` at 76px only fits above ~1280px. It
> steps 40 → 44 → 48 → 60 → 76px across breakpoints, at weight 600 throughout — display
> never thins (§17.2). `text-wrap: balance` prevents orphans at the sizes where a line
> must wrap.
>
> **Re-measure the new headline at implementation.** *"Buildings outlive the / people who
> work on them."* is shorter per line than the copy it replaces, so it should fit the
> 11-column track comfortably at 76px — but confirm the break lands after "the" and that
> no line orphans before shipping.
>
> **General rule this establishes:** layout B's column split applies to section openers
> at `display-2` and smaller. Anything set in `display-1` needs at least 11 columns and
> cannot share a row.

**The ambition line.** *"Building the memory layer for real assets"* appears **in the
footer**, set in `mono-sm` beside the wordmark — not in the hero.

*Why not the hero:* it is a company statement, not a user outcome. In the hero it
competes with the headline and reads as a second, vaguer promise; a visitor deciding
whether to keep scrolling does not need the corporate thesis. In the footer it is the
last thing read, it lands as a signature, and it satisfies §24.1's one permitted use.

**Visual concept.** Text-led and near-static. The right column (c7–c11) carries the
supporting line and the two CTAs.

**The record artefact is OPTIONAL.** A single Provenance record row — a property, a date
in mono, a source count, roughly 380px wide, no chrome beyond a top hairline — may sit
below the CTAs.

*The case for it:* it shows what the product traffics in, a sourced record, without
explaining Vera, without a dashboard and without a diagram. A texture sample, not a demo.

*The case against, and the test:* **the hero must work beautifully on typography alone.**
Build it without the artefact first. Only add it if the composition is demonstrably
better with it. If it reads as decorative, as filler in an empty column, or if it raises
a question the hero has no room to answer — cut it. A hero that is confidently empty
beats a hero with something in the corner to justify the column.

**Interaction.** One `considered` 340ms entrance on load (§15.4). Nav solidifies on
scroll. **Nothing else moves, ever.**

**Height.** 82vh — deliberately not 100vh, so section 2's label is visible at the fold
and the page reads as having somewhere to go.

**Transition out.** Full-width `mineral-300` hairline. The hero ends on an outcome; the
problem section opens on a question. Same surface, so the change is purely typographic —
the reader feels a change of voice, not a change of place.

**Do NOT include.** Vera, by name or implication. A product dashboard. The system
composition. An animated portfolio or building illustration. A video. Autoplay of any
kind. More than two CTAs. A logo strip.

---

### SECTION 2 — THE PROBLEM

**Purpose.** Make the pain legible to someone who has never worked in CRE.

**User takeaway.** *"I have lived this. The answer existed and I still had to go and
rebuild it."*

**Headline** — `display-2`, c1–c7:

> Simple questions shouldn't require a scavenger hunt.

**Framing line** — `lead`, directly under, max 56ch:

> A property can carry years of emails, meetings, reports, decisions and half a dozen
> different teams. When someone asks a simple question, the answer usually has to be
> reconstructed.

**The three questions** — `display-3`, `slate`, each on its own line, separated by
full-width `mineral-300` hairlines, 32px above and below each rule:

> "What was the issue with the last submission, and what are we doing differently now?"
>
> "When was this equipment last serviced, and what was done?"
>
> "What's still outstanding before this can move ahead?"

**The landing** — `display-3`, back to full `ink`, after the last rule:

> The information usually exists. The answer is scattered.

**Then, one line of `body` in `slate`:**

> You shouldn't have to rebuild the story before you can move the property forward.

**Visual concept.** **Typography and rules. Nothing else.** This is the emptiest section
on the page and should be the most quoted. Per §22 it is layout A — text only, c1–c7,
nothing in the right columns.

The questions being set at `display-3` in `slate` and the landing at `display-3` in
`ink` is the entire visual mechanic: the questions are the noise, the landing is the
signal, and the contrast step does the work that four cards would have done badly.

**Interaction.** Scroll reveal only. Questions stagger at 40ms, maximum three — within
§15.4's limit of four. Nothing hovers, nothing expands.

**Height.** 88vh.

**Transition out.** This section states a problem and refuses to solve it. The next
section opens with the label "Meet Vera" on a **raised surface** (`mineral-050`) — the
first surface change on the page. The step up is the answer arriving.

**Do NOT include.** Cards. Fake emails or document thumbnails. A four-column department
grid. Floating paper. Icons. Statistics. A diagram of fragmentation. The words "context
decay" or "organisational amnesia" (§24.1). Any product UI.

---

### SECTION 3 — MEET VERA *(the peak)*

**Purpose.** The first major product reveal, and the only `loud` section on the page.

**User takeaway.** *"This is what I would open at 9am tomorrow."*

#### 3a. The opening (≈45vh)

**Section label** — `section-label` 20px/600 with the `vera-700` rule above (§4.4):

> Meet Vera

**Headline** — `display-2`, c1–c7:

> Your AI teammate across every function of your portfolio.

**Transition copy** — `lead`, `slate`, directly beneath the headline. This is the line
that switches the page into the **today** register (§2.1), and it has to arrive
immediately after two sections about decades:

> Vera keeps your team on track today, tracking the work, answering questions from the
> property's record, and surfaces what might otherwise be missed.

**Why the transition needs its own line.** Sections 1 and 2 are about time — properties
outlasting people, context scattering across years. If Meet Vera opened straight into a
product frame, the visitor would still be thinking in decades while looking at Thursday's
deadlines. The word **today** does the switching, and it is the first word of the
transition sentence for that reason.

**The functions.** Not seven cards. **One line of text**, `ui` size, `slate`, with the
function names in `ink`:

> Development · Leasing · Asset management · Operations · Legal · Planning · Consultants

Set as a single wrapped line with middot separators, directly under the headline. Seven
cards would be seven containers for seven words — the exact failure §7.1 exists to
prevent. As one line it reads as *breadth*, which is the actual claim.

#### 3b. The product window (≈145vh)

**One frame. Three modes. The user switches between them.** Not three sections, not
three cards (§22).

Frame per §10.1: `mineral-000`, 14px radius, 1px `mineral-300`, `lift-2`, a 44px title
bar with the breadcrumb `Westmount Centre / South Pad` and right-aligned mono metadata.
**No macOS traffic lights.**

Mode switcher: a real `tablist` in the title bar, three tabs, arrow-key navigable (§10.5).

| Mode | Loop stage | Question it answers | Distinguishing quality |
|---|---|---|---|
| **Track the work** | OBSERVE · REMEMBER | *What is happening?* | Dense. A list your team already owns. |
| **Ask Vera** | REMEMBER · UNDERSTAND | *What happened, why, and what do I need to know?* | Focused. One question, one sourced answer. |
| **Proactive Insights** | **DETECT · RECOMMEND** | *What should I know that I did not think to ask?* | Sparse. Four signals, none of them yours yet. |

**These three questions must be legible in the product UI itself**, not only in the tab
labels. The clearest mechanic: Track rows all have an **owner**; Surface signals have
**no owner and a derivation** instead. A reader who never reads the tab names can still
tell that one list is work being managed and the other is work nobody has noticed yet.

---

**MODE 1 — TRACK THE WORK**

Rows for **Westmount Centre**: actions, deadlines, decisions, meetings, documents, open
issues, owners, follow-ups. Maximum 7 visible rows (§10.2).

Columns: type (mono) · item · **department** · owner · when (mono).

The department column is the argument — it must show Development, Leasing, Operations,
Legal and a consultant all contributing to **one property**. That communicates *one
property, many functions, shared context* through the data rather than a sentence
(§10.4).

**What the mode has to communicate:** *see what is happening now, why it matters, who
owns it, and the context behind it.*

#### The context panel is the product proof

**A drawer showing status, owner and due date could be Asana, Monday or Jira.** Rows and
a detail drawer prove nothing — every project tool has them. What separates this is that
the panel explains **why the issue exists**, using context Vera drew together from places
no single view holds at once.

The panel's information order is the argument, and it does not change:

| # | Block | Why it sits here |
|---|---|---|
| 1 | Title, status, owner, due | The ordinary facts, kept compact so they do not compete |
| 2 | **Vera's read** | The interpretation, plus what it was built from |
| 3 | **What Vera connected** | **The differentiator.** Rendered on the record line (§12) |
| 4 | What needs to happen next | The action, with its owner |
| 5 | *n* sources linked → | Expands in place. Every claim traces back |

A colleague briefing you gives the conclusion first, then the evidence. The panel reads
the same way.

**The label is "Vera's read", not "Why this matters".** A field headed *why this
matters* reads as something a person typed into a form. *Vera's read* says an
interpretation was formed. Directly beneath it sits a restrained provenance cue —
**BASED ON 3 CONNECTED RECORDS / Legal · Drawing · Meeting** — so the hierarchy states:
*Vera formed this interpretation, from this evidence.* The cue is derived from the
connected records, never hardcoded.

Not an AI disclaimer. No confidence meter, no "generated by AI" badge, no percentage. It
names what the read was built from and stops.

**"What Vera connected" must cross contexts meaningfully.** For the easement issue:
**counsel's advice (28 Aug) + a drawing (30 Aug) + a decision made in a room (01 Sep)** —
three different *kinds* of evidence, five days apart. That is the strongest form of the
proof: no single view held them together.

> **This is a requirement, not a quota.** Do not force a fixed number of departments,
> source types or dates onto an example that does not naturally support it. What must be
> true is that the pieces come from places that would not otherwise meet. The failure to
> avoid is same team + same kind of source + same moment — that is monitoring, not
> reasoning.

**Sources expand in place**, never into a second modal. Three entries, each with title,
date, originating firm where relevant, and one line of *relevant context* — enough to
feel traceable, not enough to become a document viewer.

**Vera's presence is visible without clicking.** Three rows carry a short line in Vera's
accent naming what Vera did — *6 days overdue · Vera flagged*, *Captured by Vera*, *Vera
connected 3 records* — one for each of capture, connect and flag. Not badges: no fill, no
border, no container. Three of seven rows only; more becomes noise, and the remaining
rows need to read as ordinary work.

*Interaction:* cursor hovers the easement row → row takes a restrained sage fill with a
3px `vera-700` left indicator → clicks → panel opens → **holds 2s on "What Vera
connected"**, the longest dwell in the sequence → clicks *3 sources linked* → evidence
expands → holds → collapses → closes the panel. About 8.4s (§15.6, §16.6).

---

**MODE 2 — ASK VERA** *(the strongest interaction on the site)*

Fake cursor per §16. Sequence per §15.6:

```
cursor clicks the input          600ms
question types                  ~2200ms   32–55ms/char with jitter
thinking                         700ms    a 1px rule filling left→right — not a spinner
answer appears BY BLOCK          120ms apart — never character by character
source strip appears             220ms
cursor clicks "View sources"     drawer, 340ms
cursor clicks "Share"            confirmation chip, 140ms
advance                          crossfade 220ms
```

**Six use cases**, manually navigable with `←  01 / 06  →`:

| # | Function | Question |
|---|---|---|
| 01 | Development | "What's holding up the south pad?" |
| 02 | Asset management | "Why was the remaining roof replacement deferred?" |
| 03 | Leasing | "What do I need to know before Thursday's tenant meeting?" |
| 04 | Operations | "What's the history of RTU-4?" |
| 05 | Portfolio | "Have we looked at redeveloping this site before?" |
| 06 | **Onboarding** | **"Bring Northline Engineering up to speed before Thursday's kickoff."** |

**Use case 06 is the consultant brief** (this document, §4.2). Its answer is structured
differently from the other five — instead of a paragraph plus sources, Vera returns a
**brief**: Current objective · Key decisions · Open issues · What has already been tried
· Latest materials · Relevant sources. The action button changes from `Share` to
**`Share consultant brief`**.

That difference matters: five questions return an *answer*, the sixth returns a
*document*. Ending the sequence on a deliverable is what makes the mode feel like a
product rather than a search box.

*Autoplay stops permanently on any real click inside the frame* (§16.6). The arrows and
the `01 / 06` counter are always available — a visitor can drive it themselves from the
first second.

*Anti-ChatGPT rules apply in full* (§10.6): no avatar bubble, no chat transcript, no
"Vera is typing", no sparkle icon, no send-arrow circle.

---

**MODE 3 — PROACTIVE INSIGHTS**

**This is the differentiating mode.** It is not a notifications feed and must never be
built as one. A notification reports an event. These signals are **conclusions Vera
reached by connecting things that happened at different times**, and the conclusion is
only credible if the connection is visible.

Must look **visibly different** from Track the work. Track is a dense table of things
your team owns; Surface is **four items with air around them**, none of which anyone has
claimed yet.

Optional supporting line, used once and only here:

> Vera doesn't wait for you to know what to ask.

#### The derivation is the point

Every signal shows **what Vera connected to reach it**. Two or more sources, each with
its own date and origin, resolving to one conclusion:

| Signal | Derivation | Conclusion |
|---|---|---|
| **Blocker** | Consultant commitment (12 Jun) **+** today's date **+** Thursday's submission | Turning analysis is 8 days late and now blocks Thursday's submission. |
| **Conflict** | June leasing meeting **+** latest concept drawing (Rev 07) | The latest concept reduces tenant area below the 9,000 SF minimum agreed in the June leasing meeting. |
| **Opportunity** | Concept B, paused 2024 **+** zoning amendment (last month) | A zoning change may make a previously abandoned development concept viable again. |
| **Expiry** | Warranty document **+** today's date | Roof warranty expires in 37 days. |

**Every signal must visibly demonstrate cross-context reasoning** (DESIGN.md §10.7).
It has to show Vera connecting things that no single view could have shown together —
across **time, department, source type, past decision vs. current artefact, commitment
vs. deadline, or an external change against prior work.**

**Prefer meaningful temporal separation for these homepage demos**, because a months-wide
gap is the strongest single proof that something held context the whole time — that gap
*is* the product argument, and it is why no competitor sentence is needed (§2.3). But
temporal distance is one valid proof, not a requirement: a Leasing commitment against a
Development drawing filed the same week is legitimate cross-context reasoning, because no
one person held both.

The failure to avoid is a signal whose sources are the same type, from the same team,
about the same artefact. That reads as monitoring, not reasoning.

**Conflict is the strongest of the four** and should lead. A blocker is a deadline
problem any project tool could catch. A conflict between a decision recorded in a meeting
and a drawing produced months later is only detectable with accumulated context.

#### Visual treatment

- Signal colours per DESIGN.md §3.4. **Blocker and Conflict share clay**; Opportunity is
  `vera-600`; Expiry is `ochre`. Each carries **a glyph and a word** — never colour alone
  (§18.2).
- No owner column. A **"Vera noticed"** provenance line in mono replaces it.
- The derivation renders as the **record line** (§12) at product scale: two or more
  graphite source nodes resolving to one coloured conclusion node. Orthogonal, 1px, no
  arrowheads, no curves — the curve exception is §13.4 only.
- Four signals, expanded to show derivations. Not ten rows, not a table, not a feed.

*Interaction:* cursor hovers one signal and expands it to reveal the derivation
(`base` 220ms). The expansion is the whole demonstration — it is the moment a viewer sees
that Vera reasoned rather than monitored. No autoplay beyond that.

**Height.** 190vh total.

**Transition out.** The frame is the loudest thing on the page. The next section returns
to the plain `mineral-100` canvas and a smaller, calmer window. The de-escalation is
intentional: Vera has been proved, so section 4 only has to show *where Vera lives*.

**Do NOT include.** Three separate feature sections. Feature cards with icons. A pricing
table. Logos. More than 7 rows in any mode. A second `loud` moment. Marketing copy
between the modes — the tab labels are the only explanation the modes get.

---

### SECTION 4 — HOW VERA WORKS

**Purpose.** Remove the adoption objection: *nobody has to change how they work.*

**User takeaway.** *"Vera works in my inbox and my calendar. No new workflow to learn."*

**Section label:** `How Vera works`
**Headline** — `display-2`, c1–c4 (layout C):

> Vera works where the work already happens.

**Supporting line** — `body`, `slate`:

> Vera fits into the workflows your team already uses.

**Visual concept.** **One desktop window**, positioned c5–c12 and bleeding past the
right gutter (layout C). Inside it, three workflows play in sequence in the same window
— the applications change, the window does not. It should read like one continuous
screen recording of one person working, not three mockups.

Each workflow answers the same three questions (§22 anchor): **where is Vera · what did
Vera do · what changed in Provenance.**

---

**WORKFLOW A — @VERA** *(a reply to a consultant)*

```
WHERE      cursor clicks into the reply body, types:
             "Attached are the updated drawings.
              @Vera file these under Westmount Centre → South Pad."
           @Vera highlights in vera-700 the moment it is completed
WHAT       VERA FILED
             Updated Lease Package.pdf
             Concept Plan Rev 07.pdf
CHANGED    PROVENANCE UPDATED · Westmount Centre → South Pad
```

**WORKFLOW B — CC VERA** *(an existing email chain)*

```
WHERE      cursor opens the CC field, types vera@provenance.ai
           the field lifts slightly and the token highlights in vera-700
           cursor clicks Send
WHAT       VERA CAPTURED
             Decision — preserve 9,000 SF footprint
             Open issue — turning analysis outstanding
CHANGED    PROVENANCE UPDATED · Westmount Centre
```

**WORKFLOW C — INVITE VERA** *(a calendar invite)*

```
WHERE      cursor creates "South Pad Review", clicks the attendee field,
           types Vera, adds vera@provenance.ai — the chip highlights in vera-700
WHAT       [after the meeting]  VERA CAPTURED
             Decision    — preserve the larger footprint
             Rationale   — turning radius for the loading court
             Action      — complete turning analysis · Owner Sarah Chen · Due Thu
             Open issue  — utility easement unconfirmed
CHANGED    PROVENANCE UPDATED · Westmount Centre → South Pad
```

**This workflow is doing more work than the other two, and the copy must show it.**
Vera does not produce generic meeting notes. Vera identifies and connects **decisions,
rationale, changes, commitments, blockers, owners, deadlines and unresolved issues**, and
attaches each to the relevant property and project in Provenance.

**Rationale is the line that matters most.** Most of the reasoning behind a real estate
decision never reaches a formal document — it is said once in a room and then lives only
in the memory of whoever was there. "Preserve the larger footprint" is a decision any
notetaker could record. "*Because of the turning radius for the loading court*" is the
part that disappears, and it is the part that someone will need in two years when the
decision is questioned.

Show at most four captured lines so the rationale is not buried. If space forces a cut,
cut the open issue — never the rationale.

**This workflow is where the Conflict signal comes from.** Proactive Insights flags
that a later drawing breaches the 9,000 SF minimum "agreed in the June leasing meeting" —
and a meeting-captured decision is exactly what this workflow produces. Keep the two
consistent so an attentive viewer sees the loop close: something captured in Section 4
is what Vera reasons over in Section 3.

Note that the 9,000 SF decision itself is captured in **Workflow B** (the email chain).
Either origin works, provided the conflict cites a source the page has actually shown
being captured. Do not have Surface cite a record the viewer has never seen created.

**Interaction and motion.** Should feel like a polished screen recording. One cursor
throughout. Natural typing with jitter (§16.5). 500–800ms dwell between steps so the
viewer can read what changed (§16.6).

**The one permitted zoom.** When Vera is added — the `@Vera` token, the CC token, the
attendee chip — the surrounding field scales to **1.04 over 340ms** and returns. This is
the single scale transform allowed anywhere on the site, and it exists because it is the
moment the whole section is about. It is a focus pull, not a flourish.

**Beat structure per workflow** (§15.6): WHERE 200ms → WHAT +400ms delay, 340ms → CHANGED
+400ms delay, 340ms. Each beat holds 900ms. ~5s per workflow, ~15s for all three.

Workflow selector: three tabs, always clickable. Sequence pauses on hover, stops on real
click.

**Height.** 165vh.

**Transition out.** This is the last mineral section. It ends having shown three separate
captures all landing in the same place — which is precisely the question the descent
answers. **Then the hard edge** (§6.3): full-bleed, no fade, no gradient. Light to `ink`
in one boundary.

**Do NOT include.** Three feature cards. Three disconnected mockups. Giant arrows between
steps. A paragraph explaining each action — the interaction is the explanation. Real
brand chrome (Gmail, Outlook, Google Calendar logos): the surfaces are generic and
recognisable by layout alone. More than three workflows.

---

### ▼ THE DESCENT ▼

Per §6.3, the page descends **once**, here, and never returns to light. Everything below
is basalt — a graphite-green stone at L* 25.8, not a dark theme (§3.5, §6.3).

This is the structural pivot of the whole page: above it, Vera helping people work;
below it, what that work becomes. The reader feels the argument turn before reading it.

---

### SECTION 5 — EVERYTHING VERA LEARNS BUILDS PROVENANCE

**Purpose.** The turn. Immediate utility becomes persistent memory.

**User takeaway.** *"The work my team is already doing is building something that
outlasts the work."*

**Section label:** `The memory layer`
**Headline** — `display-2`:

> Everything Vera learns builds Provenance.

**Supporting copy** — `lead`, `on-deep-muted`. **This is the handoff between the two
registers (§2.1) and the most important transition on the page:**

> Vera works with your team. Provenance remembers for the property. The property's
> memory builds in the background as your team works.

**Why this is where Provenance is finally named as a thing.** Until this section the
visitor has met a useful teammate. Here they learn that the useful teammate has been
building something the whole time. That reveal only works if Vera has already earned
trust in Sections 3 and 4 — which is why Provenance is not explained earlier, and why
this section must not arrive before the product has been shown working.

**The tense changes here, permanently.** Above the descent the page speaks in the present
about this week. From this line onward it speaks about what accumulates. Copy below this
point should never describe a task, a deadline or a person's workload.

**Visual concept.** **The system composition — DESIGN.md §13 in full.** It is the
section; it needs no supporting diagram and no feature list beside it (§22).

Work in (7 thin rows) → convergence curves → the lifted `mineral-000` core panel (Vera
above, `↓ BUILDS`, Provenance below) → divergence curves → work out (4 structured
entries with real content and provenance lines).

**The asymmetry is the argument** (§13.2): left is uniform and thin, right is short and
specific. Do not make the columns symmetrical.

**Motion.** Four states, ~6.6s, **emphasis only**, once per viewport entry (§13.6):

```
state 1   WORK IN, all seven rows and inbound curves, as one group   1500ms
state 2   VERA + PROVENANCE, the core panel                          1500ms
state 3   WORK OUT, all four entries and outbound curves, one group  1500ms
state 4   everything, settled — permanent rest
```

Every element exists from the first frame. Nothing enters, nothing draws, nothing moves.
**Never animate the inputs one at a time.** State 4 is the resting state and is the most
complete state — which is the argument the section makes.

**Height.** 95vh.

**Transition out.** The composition ends in its complete state. Section 6 is typography
only on the same `ink` ground, so the reader moves from a system to a sentence about
time with no visual break — one continuous deep passage (§22).

**Do NOT include.** Arrowheads on the curves (§13.9). Four cards. A second diagram.
A feature list beside the composition. Any per-token animation.

---

### SECTION 6 — PROVENANCE OVER TIME

**Purpose.** The long-term thesis, briefly. This is where context decay lives — in plain
English, unnamed.

**User takeaway.** *"People will leave. This won't."*

**Section label:** `Over time`
**Headline** — `display-2`, two lines, manual break:

> Teams change.
> The property remembers.

**Body** — `body`, `on-deep-muted`, max 62ch, two short paragraphs:

> Employees leave. Consultants change. Departments rotate. Projects pause and restart.
> Owners change. Each time, the property used to start over.
>
> Every decision, issue and source captured through Vera stays with the property — what
> happened, why, and what was still unresolved. If the owner chooses, it can transfer
> with the asset.

**Why "remembers" and not "persists".** The previous draft read *"Teams change. The
property persists. Its context should too."* Three lines, and the payoff was a
conditional — *should* too. Properties persisting is not news; the reader already knows
buildings outlast staff. **The claim is that the property now remembers**, which is the
thing that has never been true before. Two lines, active verb, no hedge.

The first body paragraph is deliberately a list of losses ending in *"the property used
to start over"* — past tense, because the section's whole job is to say that this is the
part that changes.

**Visual concept.** Layout A — typography only, no product UI, no dashboard.

**One restrained device**, if it earns its place: a single fixed horizontal line
representing the asset, with the surrounding roles — Development, Leasing, Asset
management, Consultants, Ownership — set above it and **fading in and out at different
intervals** while the asset line stays constant and unbroken.

Strict limits: 1px lines, no icons, no timeline ticks, no dates, no years. The roles
change opacity only; nothing translates. If it cannot be done in under nine elements
(§19.2), cut it and ship the typography alone — **the three-line headline already makes
the argument**.

**Height.** 68vh.

**Transition out.** A `hairline-deep` rule. FAQ opens directly beneath on the same
ground — a ledger under a statement.

**Do NOT include.** Year 1 / Year 3 / Year 7 timeline diagrams (§20). Another product
dashboard. A re-explanation of Vera. The terms "context decay" or "organisational
amnesia" (§24.1). Ownership-transfer legal detail.

---

### SECTION 7 — FAQ

**Purpose.** Answer the six objections that stop a serious buyer.

**User takeaway.** *"They have thought about the boring questions."*

**Section label:** `Questions`
Layout F — ledger. Full-width rows, `hairline-deep` between them, **no cards, no
containers, no boxes** (§7.1).

| # | Question |
|---|---|
| 1 | Why not just use ChatGPT or Claude? |
| 2 | How is our information kept private? |
| 3 | What data does Provenance actually use? |
| 4 | Do our teams have to change how they work? |
| 5 | Does this replace our project management or document system? |
| 6 | What happens to the record when a property changes ownership? |

Questions at `heading-2`, answers at `body-sm` in `on-deep-muted`, max 62ch.

**Interaction.** Simple accordion. Row expands on `base` 220ms `ease-state`, chevron
rotates 90°. First row may open by default. Nothing else.

**Height.** 78vh.

**Transition out.** Last FAQ row's rule, then air, then the closing statement.

**Do NOT include.** Cards. Two columns. Icons. Search. Categories or tabs. A "still have
questions?" support widget. More than six.

---

### SECTION 8 — FINAL CTA

**Purpose.** The ask. Nothing new — and the close of the bookend the hero opened.

**Headline** — `display-2`, c2–c8:

> Give every property a memory.

**Supporting line** — `lead`, `on-deep-muted`:

> Start with the work your team is already doing.

**One button:** `inverse` — *Request early access*. One filled button, per §8.4.

**Why this line lands here and would not land in the hero.** In the hero, *"give every
property a memory"* is a nice phrase attached to nothing. Here it arrives after the
visitor has seen Vera track real work, answer from a real record, and build something
underneath — so the same five words now describe something they have watched happen. The
hero opened with an observation about the world; the page closes by turning it into an
instruction they are equipped to act on (§2.1a).

**Visual concept.** The deepest surface on the page — `basalt-900`,
continuous into the footer. No frame, no artefact, no illustration.

**Height.** 55vh, flowing into the footer.

**Footer.** Wordmark, four link columns, legal. **The ambition line sits here**, in
`mono-sm` beside the wordmark:

> Building the memory layer for real assets.

Its one permitted homepage appearance (§24.1), as a signature rather than a claim.

**Do NOT include.** A new product concept. A second CTA. A newsletter capture. Social
proof. A logo strip. A demo booking calendar embed.

---

## 6. Transition logic — the connective tissue

Each boundary is a specific handoff, not just a gap.

| From → To | Mechanism | What the reader feels |
|---|---|---|
| Hero → Problem | Hairline. Same surface. Statement becomes question. | A change of voice |
| Problem → Meet Vera | **Surface steps up** to `mineral-050` | The answer arriving |
| Meet Vera → How Vera works | Surface steps **back down**; frame shrinks and moves right | De-escalation; "and it fits where you already are" |
| How Vera works → Memory | **THE DESCENT.** Hard edge onto basalt, full bleed | The argument turning |
| Memory → Over time | `hairline-deep`. Same ground. | A system becomes a sentence |
| Over time → FAQ | `hairline-deep` | Statement becomes ledger |
| FAQ → CTA | Air, then `basalt-900` | Settling |

**The rhythm rule** (§6.4): no two adjacent sections share the same
`(surface, layout, density)` triple. Verified across all eight — no adjacent pair
matches.

---

## 7. Mobile considerations

| Section | Below 768px |
|---|---|
| **Hero** | Headline 76 → 44px, weight stays 600 (§17.2). Artefact row moves below the CTAs. CTAs stack full-width. |
| **Problem** | Questions 40 → 28px. Hairlines stay full-bleed — they are the structure. Section unchanged otherwise; it works best of all on mobile. |
| **Meet Vera** | Frame switches to the **focused variant** (§17.2): one panel at a time, mode switcher becomes a horizontally scrollable strip. Track shows 4 rows, not 7. |
| **Ask Vera** | **Cursor autoplay does not run** (§16.7). Replaced by the `← 01/06 →` stepper, which becomes the primary control. Answers render in their final state. |
| **How Vera works** | Cursor sequence off. Each workflow becomes three stacked static beats — WHERE / WHAT / CHANGED — advanced by a swipeable step control. The zoom-on-Vera is dropped. |
| **Memory composition** | **Curves removed entirely** (§13.4) — a squeezed fan reads as noise. Three zones stack: work in, core panel, work out. Vertical order preserved, because the order is the meaning. Work in caps at 5 rows; **work out keeps all four entries and all three lines** — never strip the provenance line (§13.9). |
| **Over time** | Device dropped. Typography only. |
| **FAQ** | Unchanged. All rows collapsed by default. |
| **CTA** | Button full-width. |

**Mobile total ≈ 11 screens.** Acceptable, because sections 3 and 4 become steppers the
reader controls rather than sequences they wait through.

---

## 8. What gets cut

Removed deliberately. Each would have added length without adding understanding.

| Cut | Why |
|---|---|
| **Consultant onboarding as a section** | Becomes Ask Vera use case 06. Same idea, stronger frame, ~70vh saved (this document, §4.2). |
| **A separate "Vera product showcase" section** | Merged into Meet Vera. A promise and its proof belong together (this document, §4.1). |
| **Context decay / organisational amnesia as a section** | To `/thesis`. Homepage says it in plain English (this document §4.3; DESIGN.md §24.1). |
| **Seven department cards** | One line of text. Seven containers for seven words (§7.1). |
| **A customer logo strip** | Nothing to show yet, and a thin one damages credibility more than none. |
| **Testimonials** | Same. |
| **Pricing** | Not a self-serve product. |
| **An integrations grid** | Section 4 demonstrates the integrations by using them. |
| **A "features" section** | The product window is the feature list. |
| **Security / compliance section** | FAQ questions 2 and 3 carry it. |
| **A second CTA band mid-page** | One ask, at the end (§8.4). |
| **A stats / metrics band** | No credible numbers yet. Fabricating them fails §1's honesty test. |
| **Animated hero** | §22: the hero gets one 340ms entrance and nothing else. |

---

## 9. What belongs on /thesis instead

Structure is already specified in **DESIGN.md §23**. Summary of what moves off the
homepage:

- **Context decay**, named and explained
- **Organisational amnesia**, named and explained
- The progression device: context decay → organisational amnesia → Provenance (§23.4)
- *"Buildings outlive the people who work on them. Their context should too."*
- *"Context decays. Organisations forget. Properties persist."*
- The belief that property knowledge should compound rather than reset
- Commercial real estate as a starting point, and the broader ambition
- The **one serif moment** on the entire site (§4.6, §23.3)

`/thesis` is reachable from the nav and from one text link in section 6 — *"Why we
think this matters"* — and from nowhere else. **No product UI on that page at all**
(§23.5). It descends once, like the homepage, at the turn from diagnosis to belief.

---

## 10. THE 20-SECOND TEST

What a visitor knows at each depth. If any of these fails in review, the section above
it is wrong.

### After 5 seconds — *hero, without scrolling*

> **"Buildings outlast the people who work on them — and this gives the property a
> memory of what happened to it."**

They have read the headline and the supporting line, and nothing else. They know it is
about property, about time, and about a record that belongs to the building rather than
to a team. From the mineral ground, the ink weight and the restraint they also know it is
**serious software, not a startup landing page**.

They do **not** know what Vera is. That is correct — Vera arrives in Section 3.

*Fails if:* they think it is a document search tool, a CRM, an AI chatbot, or an
architecture practice. The last one is the new risk with a thesis-led hero: if the
headline reads as philosophy with no product behind it, the supporting line is not doing
its job and *"give every property a memory"* needs to sit closer to the top.

### After 10 seconds — *hero + the problem section*

> **"Simple questions about a property turn into scavenger hunts. The information
> exists — it's just scattered across people, email and time."**

They have recognised the pain from their own working life. This is the moment they
decide to keep reading, and it is carried **entirely by typography** — no product has
appeared yet.

*Fails if:* they read it as "search is hard" rather than "context is fragmented" (§20).

### After 20 seconds — *into the Meet Vera product window*

> **"Vera is an AI teammate that works across every function on a property. I can see
> the actual product — this is something I'd open tomorrow morning."**

They have seen a real interface with a real property name, real dates, real departments
and real sources. The claim and the proof have arrived together.

*Fails if:* they have seen only marketing copy about Vera and no product, or if the
product looks like a chat window.

### After 60 seconds — *the full scroll*

> **"Vera helps my team today by working inside my email and calendar. Everything Vera
> captures builds a permanent record of the property that outlives whoever is working
> on it."**

Both halves: immediate utility, and the reason it compounds. **The descent is what
delivers the second half** — the reader feels the turn from working surface to
substrate before reading a word of it.

### The register test — *are Vera and Provenance distinct?*

The single most likely way this page fails. Ask a reader who has finished it:

> **"What is the difference between Vera and Provenance?"**

A correct answer is some form of: *"Vera is the assistant that helps the team now.
Provenance is the memory of the property that builds up underneath."*

*Fails if:* they describe them as the same product with two names, cannot say which one
is which, or think Provenance is simply "where Vera stores things" (a database, not a
memory). If the answer is vague, the handoff copy in Section 5 is not doing enough work,
and the descent is carrying meaning the words are not.

### The differentiation test — *did Proactive Insights land?*

Separate from the timing test, and the one most likely to fail quietly:

> **"It noticed something I would have missed."**

A visitor who leaves describing Vera as "AI that summarises your emails and answers
questions about your property" has read the page correctly and we have positioned it
wrongly. The correction is never a sentence claiming to be different (§2.3) — it is
making the Conflict signal's derivation impossible to miss: two sources, months apart,
resolving to something that might otherwise be missed.

*Fails if:* Proactive Insights reads as notifications, its signals look like calendar
reminders, or the derivation is collapsed behind an interaction the visitor never
performs.

---

## 11. Review checklist

Before any code is written, this blueprint should satisfy every line:

- [ ] Eight content sections. Nothing added without something removed.
- [ ] Product demos hold ≥40% of page height; explanatory copy ≤30%.
- [ ] Exactly one `loud` section (Meet Vera). How Vera works is `medium`.
- [ ] No two adjacent sections share a `(surface, layout, density)` triple (§6.4).
- [ ] The page descends exactly once and never returns to light (§6.3).
- [ ] The hero leads with the thesis, not an outcome or a feature.
- [ ] The hero does not mention Vera.
- [ ] Vera is only ever described in the present tense; Provenance only in the accumulated tense.
- [ ] A reader can state the difference between Vera and Provenance after one pass.
- [ ] "Give every property a memory" appears twice: hero support, and the closing CTA headline.
- [ ] No technical positioning language anywhere ("knowledge graph", "context engine", "AI-powered", "intelligence layer/infrastructure").
- [ ] The OBSERVE/UNDERSTAND/REMEMBER/DETECT/RECOMMEND loop never appears as copy.
- [ ] The problem section contains zero product UI and zero cards.
- [ ] "Context decay" and "organisational amnesia" appear nowhere on the homepage (§24.1).
- [ ] The ambition line appears exactly once, in the footer.
- [ ] Track the work and Proactive Insights are visibly distinguishable — owners vs. no owners.
- [ ] Proactive Insights shows a **derivation** for every signal that demonstrates cross-context reasoning (time, department, source type, decision vs. artefact, or external change).
- [ ] Proactive Insights is not a notifications feed and its signals are not calendar reminders.
- [ ] The Conflict signal leads, and cites a record the page has shown being captured.
- [ ] The meeting workflow captures **rationale**, not just decisions.
- [ ] No competitor comparison anywhere on the page except the FAQ answer.
- [ ] Ask Vera answers reveal by block, never character by character (§10.6).
- [ ] Every How Vera works workflow answers WHERE / WHAT / CHANGED.
- [ ] The memory composition's two columns are asymmetrical (§13.2).
- [ ] The memory composition never animates inputs individually (§13.6).
- [ ] Every autoplaying sequence stops permanently on a real click (§16.6).
- [ ] No sequence runs below 768px (§16.7).
- [ ] One filled button per band; ink-primary and vera-primary never share a viewport (§8.4).

---

**Next step:** review this architecture. Once the section order, the three structural
decisions in §3, and the 20-second test are agreed, the homepage can be built section by
section against DESIGN.md.
