# Vera

The identity of the intelligence inside Provenance.

This document governs Vera as a sub-brand. It does not govern Provenance, whose
system is defined in `DESIGN.md`. Where the two disagree, `DESIGN.md` wins:
Vera is a layer inside Provenance, never a parallel brand.

---

## 1. Brand architecture

Provenance is the master brand. Vera is a product identity inside it, in the
way a named capability sits inside an enterprise platform. Vera is not a
separate company, not a spin-off, and not a partner product.

```
PROVENANCE          the persistent memory of the property
   └── VERA         the intelligence working across that memory
```

The relationship line, used sparingly:

> Vera works with your team. Provenance remembers for the property.

A second framing, for brand material rather than product surfaces:

> Vera connects what matters. Provenance remembers it.

**The strategic rule.** Vera must never become more visually important than
Provenance at the company level. A customer says *"we use Provenance, and Vera
is the intelligence inside it."* They never say *"we use Vera."* Every decision
in this document is subordinate to that sentence. In practice: Provenance owns
the logo, the domain, the navigation, the favicon and the voice of the company.
Vera owns green, a symbol, and a way of speaking inside the product.

---

## 2. The role of Provenance

Provenance is the record. Its promise is **give every property a memory**, and
its thesis is that **buildings outlive the people who work on them, and their
context should too**.

Provenance stands for persistence, history, evidence, institutional memory,
continuity, the permanent record, and accumulated property intelligence.

Its visual world is unchanged: black and near-black, graphite, warm off-white,
restrained typography, architectural, institutional, premium, serious.

---

## 3. The role of Vera

Vera is the intelligence that reads, connects and maintains that record.

Vera stands for intelligence, connection, interpretation, attention, pattern
recognition, proactive awareness, understanding, and action.

**The mental model.** Vera is the sharpest person on the team, the one who has
followed the property for years and remembers why things happened. Not the
newest hire with the fastest search, the colleague whose memory is the reason
you ask them first.

Vera is not a chatbot, a mascot, a virtual receptionist, a cute assistant, a
feminine AI persona, a robot, a consumer AI character, or a magical oracle.

---

## 4. The brand idea

> **Scattered context becomes one understanding.**

Everything in this identity, the symbol especially, is a restatement of that
sentence. Information about a property exists, but it is spread across people,
systems and years. Vera is the act of connection, and the value only exists
because the memory underneath it persists.

The four behaviours, as a system rather than as copy:

| | |
|---|---|
| Vera tracks | what is happening now |
| Vera answers | what you need to know |
| Vera notices | what you did not think to ask |
| Vera remembers | what changed, structured into property memory |

Useful internally as a mental model. Not homepage copy unless it earns its place.

---

## 5. Personality

**Calm.** Never excited for the sake of sounding intelligent. No exclamation,
no enthusiasm as a substitute for substance.

**Observant.** Notices relationships others may miss. The value is the
connection, not the retrieval.

**Precise.** Explains exactly what changed and why it matters.

**Evidence-backed.** Can always show where an answer came from. Every
conclusion traces to the record.

**Proactive.** Surfaces relevant context without becoming noisy. Three things
that matter, never thirty that might.

**Concise.** Does not over-explain when a direct answer is enough.

**Confident but not absolute.** Distinguishes fact, professional opinion and
inference. "May now be viable" is the correct register, not "is viable."

---

## 6. Voice

Vera speaks in complete sentences, in the register of a knowledgeable colleague
giving a short briefing. Not bullets, not a memo, not a dashboard.

A Vera answer opens with a verdict, does the reasoning in two to four
sentences, then shows the evidence. The reasoning is where Vera sounds like a
teammate: it says what happened, why it matters, how the pieces connect, and
what should happen next. It never restates the evidence rows word for word.

**Hedge honestly.** "May", "appears", "should be confirmed" are correct when
the record supports inference rather than fact. False certainty is worse than
a qualified answer.

**Never say.** AI-powered, magic, supercharged, intelligent assistant, AI
copilot, AI companion, your AI sidekick, seamless, effortless, revolutionary.

---

## 7. Gender-neutral language

**Vera is gender-neutral.** Never use *she*, *her* or *hers*. Prefer the name
directly. If a pronoun is genuinely required, use *they*, *them*, *their*.

| Instead of | Write |
|---|---|
| She noticed the change. | Vera noticed the change. |
| She connected the records. | Vera connected the records. |
| Her interpretation | Vera's read |
| Everything she learns | Everything Vera learns |
| She works in your inbox. | Vera works in your inbox. |

The name repeats more often than a pronoun would, and that is a feature: it
reinforces the product name at no cost. This rule is mirrored in `DESIGN.md`
§24.6 and applies to every customer-facing surface.

---

## 8. Naming

The name is **Vera**. Nothing else.

Never: Vera AI, Vera.ai, Vera Assistant, Vera Intelligence, Vera Copilot,
Vera Bot, VERA as an acronym.

Inside product UI it is always the bare name. Outside the product, an
explanatory lockup is permitted where an audience has no context:

```
Vera
by Provenance
```

`by Provenance` is optional, never mandatory, and never appears inside the
product, where the surrounding brand is already Provenance.

**Descriptor.** *Vera connects what matters.* One line, used selectively in
brand material. It is not a tagline to place on every surface.

---

## 9. Vera Green: the semantic system

**Green means Vera is doing something.** That is the entire rule, and its value
depends completely on discipline. Provenance is black, near-black, graphite,
off-white and grey. Green is the one hue that carries meaning, and it carries
exactly one.

The scale already exists in `tailwind.config.ts` and is not being changed. It
is documented here so the semantics stay attached to the values.

| Token | Value | Role |
|---|---|---|
| `vera-50` | `#EFF5F1` | too faint to carry state, avoid for washes |
| `vera-100` | `#E1EDE6` | secondary tint, rarely needed |
| `vera-200` | `#D5E6DC` | **the reasoning wash**, ~12% tint on the light product ground |
| `vera-300` | `#A6C7B5` | Vera text on the deepest dark surfaces |
| `vera-400` | `#6FA98C` | Vera text on the dark canvas, 7.1:1 |
| `vera-500` | `#2F6B4F` | dark-canvas fill, white on it 6.3:1 |
| `vera-600` | `#2A6249` | **narrator ground**, Vera text and focus rings on light |
| `vera-700` | `#1F4A38` | **the forest edge** and active Vera labels |
| `vera-800` | `#173329` | reserved, deepest |

### The four states

**Solid green.** Vera speaking, directly and in Vera's own voice. Today: the
demo narrator, `vera-600` with white text. Solid green is the loudest thing
Vera is allowed to be, so it must stay rare.

**Pale green wash.** Vera is reasoning about this region. `vera-200` behind
the active block, at roughly 12% tint. Enough to be unmistakable across the
room, restrained enough not to read as a highlighter.

**Green edge or rule.** Vera has connected or focused this information. A 3px
`vera-700` left edge on the active block.

**Green text.** A Vera-specific label or an active intelligence state.
`vera-700` on light, `vera-400` on dark, `vera-600` for record kinds and
insight types.

### Green is never

Normal buttons. Generic selected rows. Success states unrelated to Vera.
Navigation decoration. Decorative borders. Random icons. Charts. Links.
Hover states on anything that is not Vera.

The Track the Work list is the proof of this discipline: it is a list of real
work, not a Vera output, so it earns its hierarchy from contrast and opacity
alone and contains no green at all.

---

## 10. Typography

Vera introduces **no new typeface**. It lives inside the Provenance system
defined in `DESIGN.md` §4.1.

- **Marketing and brand surfaces:** Pliant, the approved Provenance face.
- **Product interface:** Inter.
- **Mono (IBM Plex Mono):** metadata only. Dates, years, source types, record
  kinds, tiny status labels. Nothing else.

No futuristic treatment, no wide-tracked technical caps to signal "AI", no
monospace body copy. Vera's intelligence is demonstrated by what it says, not
by typography pretending to be a terminal.

---

## 11. Logo principles

The symbol carries the identity. The wordmark stays understated: **Vera** set
in the existing system face, no custom letterforms, no ligature tricks.

A Vera mark must be:

precise, architectural, intelligent, minimal, slightly technical, premium,
recognisable at 16px, strong at 32px, strong in monochrome, strong in green.

A Vera mark must never be:

a robot, a face, a person, a brain, a chat bubble, a sparkle, stars, a magic
wand, an AI atom, a neural-network blob, an infinity loop, a literal eye, or a
checkmark disguised as a V.

**A V may emerge, but is never drawn.** If the letter appears it should be in
negative space or in the angle between strokes, as a second reading rather
than the concept.

**Geometric discipline.** A 32-unit grid, a 6-unit module, one stroke weight
(3 units), square caps, few components, strong negative space.

---

## 11a. The selected mark: Convergence

**Direction 01, Convergence, is the selected Vera mark.** The exploration is
closed. Directions 02 and 03 are archived in §12a and are not active
candidates.

```
three signals in, one resolved path out
```

Three strokes enter at three different heights, meet at one node, and leave as
a single path. Scattered context, convergence, understanding. The V lives in
the negative space between the incoming strokes and is never drawn as a
letter.

**Construction.** A 32 unit grid, 3 unit stroke, square caps, one 2.6r node,
`currentColor` throughout so the mark inherits its surface and monochrome is
the default rather than an export. Source of truth:
`src/components/vera/VeraMark.tsx`, with the standalone file at
`public/brand/vera/vera-convergence.svg`.

**Sizes.** 14px inside the narrator identity row, 15px in product chrome and
beside labels, 22px in the introduction lockup, 32px and up in brand material.
Below 14px the node begins to close and the mark should not be used.

**Why it won.** It is the only candidate whose meaning survives being
explained in four words, and the only one that holds at 16px, because the
asymmetry between three incoming strokes and one outgoing stroke reads even
after the node collapses to a dot.

## 12. Selection criteria

Score every candidate against all ten. A high score is necessary and not
sufficient: the mark also has to be worth looking at for ten years.

1. Communicates connection without being literal
2. Feels intelligent without AI clichés
3. Sits comfortably beside Provenance
4. Recognisable at 16px
5. Works in one colour
6. Simple enough to remember and redraw
7. Does not read as a checkmark
8. Does not read as a fintech logo
9. Does not read as a cybersecurity logo
10. Still makes sense if Provenance moves beyond buildings

---

## 12a. Exploration archive

Closed. Kept for the record only, and not to be revived without a reason.

**02 Connection.** Two open brackets facing away from each other, joined by
one diagonal: two records that were never related, and the single intervention
that found the relationship. The better idea and the weaker mark, because the
brackets need roughly 24px before they read as brackets.

**03 Memory signal.** Three points receding in scale and opacity along a
diagonal, resolving into one present direction. The only candidate that
carried time, and the most fragile: the opacity steps that make the recession
legible are the first thing to fail in one colour and at small sizes.

**04 Datum.** Three records of different length and ragged origin, held true
against one vertical reference. Tied Convergence on the scorecard and lost on
a real risk: out of context it can read as a bar chart or an align-right
control.

## 13. Motion

Motion communicates **connection, resolution and attention**. Never magic,
loading, thinking, or processing.

The one permitted gesture: separate elements exist, converge quickly, and
settle. Or: two fragments, one brief connection, a resolved mark.

- Duration 250 to 600ms, on the system `state` easing.
- Plays once, on first appearance or on a deliberate trigger.
- **Never** an infinite loop, a pulsing orb, a breathing glow, rotating
  geometry, or a shimmer.

If motion cannot run (reduced motion, a static context), the resolved mark is
the default state. The animation is never load-bearing.

---

## 13a. The narrator: Vera's annotation system

The narrator is the most visible application of the identity, and it is a
branded annotation rather than a tooltip, a speech bubble or a demo overlay.

**Structure.** Two rows. The identity row carries the 14px mark and the word
VERA at 11px, 600, 0.08em tracking, in white at 80%. The message sits beneath
at 13.5px, 500, in full white. The identity row must never outweigh the
message: the viewer reads the message first and registers the attribution
second.

**Box.** Solid `vera-600`, white type, 6px radius, 12px by 8px padding,
content-driven width capped at 320px for most cues and 420px for the one long
Ask Vera line. No tail, no glow, no gradient, no shadow gimmick.

**Motion.** Fade in 200ms, hold, fade out 200ms, reposition while invisible,
fade in at the next anchor. Never a translation between anchors, never a
spring, never a float. Position is set with an untransitioned transform, which
is what structurally guarantees it cannot glide.

**Pacing is story beats, not word count.** A cue with no hold stays mounted
while the product keeps moving underneath it, and leaves only when the demo
reaches the next focal point. `minMs` is a floor so an early beat cannot cut a
message short. A fixed hold is only for cues the visitor triggered, where
there is no following beat to wait for. Bands: short 2.8 to 3.5s, medium 3.5
to 4.5s, long 4.5 to 5.5s, and nothing beyond about 6s.

**Smaller box, longer relevant presence.** That trade is the rule. A large box
that flashes is worse than a small one that stays for the beat it explains.

## 14. Product usage

Approved and installed today:

- The **Meet Vera introduction lockup**, 22px, the one place the visitor
  learns the identity
- The **narrator identity row**, 14px
- Beside the **Ask Vera** mode tab, 15px, and no other tab
- The **Proactive Insights** reasoning header, 14px, once per opened insight
- Product chrome beside the property name, 15px
- The single Track row whose work was captured by Vera, 15px in slate

Approved but not yet built: Vera's presence inside email and meeting
workflows, and a favicon for a Vera-specific surface only, never for
Provenance.

**Deliberately not used:** beside Vera's read (green and the forest edge
already identify the reasoning state, and a mark there was clutter), beside
connected records, beside insight rows, beside answer text, on buttons, or in
navigation.

**Do not put the mark beside every sentence Vera generates.** The mark marks
Vera's *presence*, not Vera's *output*. One per surface is usually one too
many already. Where Vera's authorship needs marking inline, the existing
neutral glyph and the green semantic system do the work.

---

## 15. Misuse

Do not: stretch, rotate, recolour outside the scale, add a gradient, add a
glow, outline the solid form, place the mark on a busy photograph, pair it
with a second mark in a lockup, animate it on a loop, use it as a bullet, use
it as a loading spinner, or place it larger than the Provenance wordmark on
any shared surface.

Do not build a Vera lockup that competes with the Provenance logo. On any
surface carrying both, Provenance is the brand and Vera is a label.

---

## 16. Vera and Provenance

> **PROVENANCE** The memory.
> **VERA** The intelligence working across it.

The narrative:

> Work happens.
> Vera understands it.
> Provenance remembers it.

Conceptual brand language. It is not homepage copy by default, and it should
not be placed prominently without a reason.

---

## 17. Example language

| Moment | Say |
|---|---|
| Asking | Ask Vera |
| The answer | Vera's read |
| The evidence | What Vera connected |
| Proactive | Vera noticed something |
| Memory | Vera updated the property memory |
| Workflow | Include Vera |
| Provenance | Everything Vera learns builds Provenance |

Never: AI-powered, magic, supercharged, intelligent assistant, AI copilot,
AI companion, your AI sidekick.

---

## 18. Future expansion

The identity must survive Provenance expanding beyond commercial real estate
into long-lived physical assets generally: infrastructure, industrial, energy.

The Vera symbol is therefore **never** a building, a house, a skyscraper, a
roof, a floor plan, or any silhouette tied to real estate. The concepts it may
express are asset-agnostic by construction: convergence, connection, and
memory resolving into a present signal. Those hold for a bridge, a plant or a
substation exactly as well as for a retail node.

The same test applies to language. "Property memory" is the current phrasing;
the underlying idea is asset memory, and nothing in this identity should have
to be redrawn when the noun changes.

---

## 19. Copy rules

**No em dashes.** Anywhere in customer-facing or brand copy. Use commas,
periods, colons, semicolons or parentheses. This mirrors `DESIGN.md` §24.5 and
applies to every word in this document's scope.

**Gender-neutral, always.** See §7.
