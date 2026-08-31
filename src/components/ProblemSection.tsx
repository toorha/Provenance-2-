"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CONTEXT_DECAY } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const F = CONTEXT_DECAY.fragments;
type Frag = (typeof F)[number];

/* where each fragment lands — a loose left/right zigzag, staggered
   down, each one turned a degree or two so nothing lines up */
const PLACE = [
  "lg:col-start-1 lg:col-span-5 lg:mt-0 rotate-[-1deg]",
  "lg:col-start-8 lg:col-span-5 lg:mt-10 rotate-[1.4deg]",
  "lg:col-start-2 lg:col-span-5 lg:mt-6 rotate-[0.8deg]",
  "lg:col-start-8 lg:col-span-5 lg:mt-16 rotate-[-1.3deg]",
  "lg:col-start-1 lg:col-span-6 lg:mt-8 rotate-[-0.6deg]",
  "lg:col-start-8 lg:col-span-5 lg:mt-4 rotate-[1.1deg]",
  "lg:col-start-3 lg:col-span-6 lg:mt-10 rotate-[-1deg]",
];

export function ProblemSection() {
  const d = CONTEXT_DECAY;
  const { ref, step } = useSequence(F.length, { beatMs: 760, startMs: 200 });

  return (
    <section
      id="problem"
      className="tex tex-film edge-top relative overflow-hidden bg-[#17181A] py-28 text-bone lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---- the problem, stated ---- */}
        <p className="label-mono text-accent-bright/70">{d.label}</p>
        <h2 className="mt-7 max-w-[15ch] font-display text-[2.4rem] leading-[1.0] tracking-[-0.028em] text-bone sm:text-[3rem] lg:text-[3.6rem]">
          {d.headline}
        </h2>
        <p className="mt-8 max-w-[52ch] text-[16.5px] leading-[1.68] text-bone/55 lg:text-[17.5px]">
          {d.body}
        </p>

        {/* ---- the question ---- */}
        <div className="mt-16 border-l border-bone/20 pl-6 lg:mt-24 lg:pl-8">
          <p className="label-mono text-bone/35">Someone asks</p>
          <p className="mt-3 max-w-[24ch] font-display text-[1.8rem] leading-[1.15] tracking-[-0.022em] text-bone sm:text-[2.15rem]">
            &ldquo;{d.question}&rdquo;
          </p>
          <p className="mt-4 max-w-[46ch] text-[14.5px] leading-[1.6] text-bone/40">
            The answer exists. It is spread across seven places, made by five people,
            over eight months.
          </p>
        </div>

        {/* ---- the fragments ---- */}
        <div
          ref={ref}
          className="mt-14 grid grid-cols-1 gap-8 sm:mx-auto sm:max-w-md sm:gap-10 lg:mt-16 lg:max-w-none lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0"
        >
          {F.map((frag, i) => (
            <div key={frag.id} className={cn("relative", PLACE[i])}>
              <motion.div
                initial={false}
                animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 18 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Fragment frag={frag} />
              </motion.div>
            </div>
          ))}
        </div>

        {/* ---- what answering it takes ---- */}
        <div className="mt-20 border-t border-bone/12 pt-12 lg:mt-28">
          <p className="max-w-[44ch] text-[15.5px] leading-[1.7] text-bone/55">
            No single person, email, document or system has the whole answer. Before
            anyone can move the project forward, they have to:
          </p>
          <ol className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {d.reconstruct.map((task, i) => (
              <li
                key={task}
                className="flex items-baseline gap-3 text-[14px] text-bone/70"
              >
                <span className="font-mono text-[10px] tabular-nums text-bone/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {task}
              </li>
            ))}
          </ol>
        </div>

        {/* ---- the point ---- */}
        <div className="mt-20 lg:mt-28">
          <p className="max-w-[22ch] font-display text-[2rem] leading-[1.12] tracking-[-0.024em] text-bone sm:text-[2.5rem]">
            {d.closing.lead}
          </p>
          <p className="mt-6 max-w-[44ch] text-[15px] leading-[1.65] text-bone/45">
            {d.closing.sub}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */

function Fragment({ frag }: { frag: Frag }) {
  return (
    <div className="frag relative rounded-[2px]">
      <span className="absolute -top-[3px] left-4 h-[7px] w-[7px] rounded-full bg-accent-bright/75 shadow-[0_0_0_3px_rgba(99,198,160,0.1)]" />

      <div className="flex items-center justify-between gap-3 border-b border-bone/8 px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-bone/45">
          <MediumGlyph kind={frag.kind} />
          {frag.system}
        </span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.11em] text-bone/28">
          {frag.when}
        </span>
      </div>

      <div className="px-4 py-3.5">
        {frag.kind === "email" && <EmailBody frag={frag} />}
        {frag.kind === "notes" && <NotesBody frag={frag} />}
        {frag.kind === "drawing" && <DrawingBody frag={frag} />}
        {frag.kind === "tracker" && <TrackerBody frag={frag} />}
        {frag.kind === "letter" && <LetterBody frag={frag} />}
      </div>
    </div>
  );
}

function meta(frag: Frag): Record<string, string> {
  return "meta" in frag && frag.meta ? (frag.meta as Record<string, string>) : {};
}
function quote(frag: Frag): string {
  return "quote" in frag && frag.quote ? frag.quote : "";
}

function EmailBody({ frag }: { frag: Frag }) {
  const m = meta(frag);
  return (
    <>
      <p className="text-[10px] text-bone/35">{m.from}</p>
      <p className="mt-0.5 text-[11.5px] font-medium text-bone/60">{m.subject}</p>
      <div className="mt-3 border-l-2 border-accent-bright/35 pl-3">
        <p className="text-[13px] leading-[1.5] text-bone/85">&ldquo;{quote(frag)}&rdquo;</p>
      </div>
      {m.context && (
        <p className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.12em] text-bone/25">
          {m.context}
        </p>
      )}
    </>
  );
}

function NotesBody({ frag }: { frag: Frag }) {
  const m = meta(frag);
  return (
    <div className="frag-ruled -mx-1 px-1">
      <p className="text-[10px] text-bone/35">
        {m.title} &nbsp;&middot;&nbsp; {m.attendees}
      </p>
      <p className="mt-2 flex gap-2 text-[13px] leading-[1.5] text-bone/85">
        <span className="text-bone/30">&mdash;</span>
        {quote(frag)}
      </p>
    </div>
  );
}

function DrawingBody({ frag }: { frag: Frag }) {
  const m = meta(frag);
  return (
    <>
      <div className="relative border border-bone/10 bg-[#141516]">
        <span className="absolute right-2 top-2 rotate-[-4deg] border border-bone/25 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/45">
          {frag.when}
        </span>
        <SitePlan />
      </div>
      <p className="mt-2.5 text-[12px] leading-[1.45] text-bone/70">{quote(frag)}</p>
      <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-bone/25">
        Sheet {m.sheet} &nbsp;&middot;&nbsp; {m.note}
      </p>
    </>
  );
}

function TrackerBody({ frag }: { frag: Frag }) {
  const row =
    "row" in frag && frag.row ? (frag.row as Record<string, string>) : {};
  return (
    <>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-bone/8 pb-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-bone/28">
        <span>Project</span>
        <span>Status</span>
        <span>Owner</span>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto_auto] items-center gap-x-4 text-[12px] text-bone/70">
        <span>{row.project}</span>
        <span className="rounded-[2px] border border-[#8a7440]/45 bg-[#8a7440]/10 px-1.5 py-[2px] font-mono text-[8.5px] uppercase tracking-[0.1em] text-[#c7a86a]">
          {row.status}
        </span>
        <span className="text-bone/35">{row.owner}</span>
      </div>
      <p className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.12em] text-[#c48a5f]/75">
        Last touched 4 months ago &nbsp;&middot;&nbsp; may be out of date
      </p>
    </>
  );
}

function LetterBody({ frag }: { frag: Frag }) {
  const m = meta(frag);
  return (
    <>
      <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-bone/30">
        {m.body} &nbsp;&middot;&nbsp; Ref {m.ref}
      </p>
      <p className="mt-2.5 text-[12.5px] leading-[1.55] text-bone/80">
        &ldquo;{quote(frag)}&rdquo;
      </p>
      <span className="mt-3 inline-block rotate-[-3deg] border border-bone/20 px-1.5 py-[3px] font-mono text-[8px] uppercase tracking-[0.16em] text-bone/40">
        Resubmission required
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ */

function MediumGlyph({ kind }: { kind: string }) {
  const paths: Record<string, ReactNode> = {
    email: <path d="M1.5 3h11v8h-11zM2 3.5l5 4 5-4" />,
    notes: <path d="M2.5 2h9v10h-9zM4.5 5h5M4.5 7.5h5M4.5 10h3" />,
    drawing: <path d="M1.5 1.5v11M1.5 12.5h11M4 10l3-5 3 5M3 12.5V10M11 12.5V7" />,
    tracker: <path d="M1.5 2.5h11v9h-11zM1.5 5.5h11M5.5 2.5v9M9 2.5v9" />,
    letter: <path d="M3 1.5h6l2.5 2.5V12.5h-8.5zM9 1.5V4h2.5M4.5 7h5M4.5 9.5h5" />,
  };
  return (
    <svg
      viewBox="0 0 14 14"
      className="h-[11px] w-[11px] shrink-0 text-bone/35"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind]}
    </svg>
  );
}

/* a small site-plan thumbnail — pad outline, a loading bay, and a
   dashed alternate configuration under review */
function SitePlan() {
  return (
    <svg viewBox="0 0 220 120" className="block h-[116px] w-full" fill="none">
      <rect
        x="10"
        y="10"
        width="200"
        height="100"
        stroke="rgba(237,234,225,0.16)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1={12 + i * 7}
          y1={12}
          x2={12}
          y2={12 + i * 7}
          stroke="rgba(237,234,225,0.1)"
          strokeWidth="1"
        />
      ))}
      <rect
        x="46"
        y="34"
        width="104"
        height="52"
        stroke="rgba(237,234,225,0.55)"
        strokeWidth="1.25"
      />
      <path d="M150 52h20v16h-20" stroke="rgba(237,234,225,0.4)" strokeWidth="1.25" />
      <rect
        x="150"
        y="70"
        width="30"
        height="18"
        stroke="#63C6A0"
        strokeOpacity="0.7"
        strokeWidth="1.1"
        strokeDasharray="3 3"
      />
      <g stroke="rgba(237,234,225,0.22)" strokeWidth="1">
        <line x1="46" y1="98" x2="150" y2="98" />
        <line x1="46" y1="94" x2="46" y2="102" />
        <line x1="150" y1="94" x2="150" y2="102" />
      </g>
      <g transform="translate(196 96)" stroke="rgba(237,234,225,0.3)" strokeWidth="1">
        <line x1="0" y1="6" x2="0" y2="-6" />
        <path d="M-3 -3L0 -6L3 -3" fill="none" />
      </g>
    </svg>
  );
}
