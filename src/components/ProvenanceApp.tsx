"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { PRODUCT } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

type Signal = (typeof PRODUCT.signals)[number];
type PropTab = "Overview" | "Memory" | "Signals" | "Documents" | "Tasks";
type View =
  | { name: "digest" }
  | { name: "signal"; id: string }
  | { name: "property"; tab: PropTab }
  | { name: "portfolio" }
  | { name: "search" }
  | { name: "tasks" };

const EASE = [0.22, 1, 0.36, 1] as const;
const OVERDUE = "#B4482C";

const BTN =
  "inline-flex items-center rounded-[2px] px-3.5 py-[7px] text-[12px] font-medium transition-colors duration-300";
const BTN_PRIMARY = cn(BTN, "bg-accent text-accent-foreground hover:bg-accent-light");
const BTN_GHOST = cn(
  BTN,
  "border border-border text-slate hover:border-foreground/40 hover:text-charcoal"
);
const BTN_SM =
  "inline-flex items-center rounded-[2px] px-3 py-[5px] text-[11.5px] font-medium transition-colors duration-300";

// primary-signal reveal has 5 beats, then the secondary signals fade in
const PRIMARY_STEPS = 5;

export function ProvenanceApp() {
  const [view, setView] = useState<View>({ name: "digest" });
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [meetingCreated, setMeetingCreated] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  // The digest intro plays once, at app level, so it survives navigating
  // away and back (a signal detail unmounts the digest).
  const { ref: revealRef, step: revealStep } = useSequence(
    PRIMARY_STEPS + PRODUCT.signals.length - 1,
    { beatMs: 340, startMs: 300, loop: false }
  );

  const navFor = (v: View) =>
    v.name === "portfolio"
      ? "Portfolio"
      : v.name === "search"
        ? "Search"
        : v.name === "tasks"
          ? "Tasks"
          : "Home";

  const openSignal = (id: string) => {
    setMeetingOpen(false);
    setMeetingCreated(false);
    setView({ name: "signal", id });
  };
  const openProperty = (tab: PropTab = "Overview") => {
    setMeetingOpen(false);
    setView({ name: "property", tab });
  };

  return (
    <MacWindow title="Provenance" className="max-w-4xl">
      <div
        ref={revealRef}
        className="relative flex min-h-[540px] bg-warm-white font-sans text-[13px] text-charcoal"
      >
        <Rail
          active={navFor(view)}
          onNav={(item) => {
            setMeetingOpen(false);
            setMeetingCreated(false);
            setEvidenceOpen(false);
            if (item === "Home") setView({ name: "digest" });
            else if (item === "Portfolio") setView({ name: "portfolio" });
            else if (item === "Search") setView({ name: "search" });
            else setView({ name: "tasks" });
          }}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          {view.name === "digest" && (
            <Digest
              revealStep={revealStep}
              onOpen={openSignal}
              onSchedule={() => setMeetingOpen(true)}
              onEvidence={() => setEvidenceOpen(true)}
            />
          )}
          {view.name === "signal" && (
            <SignalDetail
              signal={PRODUCT.signals.find((s) => s.id === view.id)!}
              onBack={() => setView({ name: "digest" })}
              onSchedule={() => setMeetingOpen(true)}
              onOpenPrior={() => openProperty("Memory")}
              meetingDone={meetingCreated}
            />
          )}
          {view.name === "property" && (
            <Property
              tab={view.tab}
              onTab={(tab) => setView({ name: "property", tab })}
              onBack={() => setView({ name: "digest" })}
              onOpenSignal={openSignal}
            />
          )}
          {view.name === "portfolio" && <Portfolio onOpen={() => openProperty("Overview")} />}
          {view.name === "search" && <SearchView />}
          {view.name === "tasks" && <TasksView />}
        </div>

        {meetingOpen && (
          <MeetingModal
            done={meetingCreated}
            onCreate={() => setMeetingCreated(true)}
            onClose={() => setMeetingOpen(false)}
          />
        )}

        {evidenceOpen && (
          <EvidenceDrawer
            sources={PRODUCT.signals[0].detail.sources}
            onClose={() => setEvidenceOpen(false)}
          />
        )}
      </div>
    </MacWindow>
  );
}

/* ---------------------------------------------------------------- rail */

function Rail({
  active,
  onNav,
}: {
  active: string;
  onNav: (item: string) => void;
}) {
  const items = [
    { label: "Home", icon: <path d="M3 9.5 10 4l7 5.5V17a1 1 0 0 1-1 1h-3v-5H7v5H4a1 1 0 0 1-1-1z" /> },
    { label: "Portfolio", icon: <path d="M3.5 4.5h5v11h-5zM11.5 8.5h5v7h-5zM3.5 17.5h13" /> },
    { label: "Search", icon: <><circle cx="9" cy="9" r="5" /><path d="m13 13 4 4" /></> },
    { label: "Tasks", icon: <path d="M4 6.5 6 8.5 9 5M4 13.5 6 15.5 9 12M12 7h5M12 14h5" /> },
  ];
  return (
    <nav className="flex w-[168px] shrink-0 flex-col border-r border-foreground/10 bg-foreground/[0.035]">
      <div className="flex h-11 items-center gap-2 border-b border-border px-4">
        <span className="flex h-3.5 w-3.5 items-center justify-center border-[1.5px] border-accent">
          <span className="h-[3px] w-[3px] bg-accent" />
        </span>
        <span className="text-[12.5px] font-semibold text-charcoal">Provenance</span>
      </div>
      <ul className="flex-1 space-y-px p-2">
        {items.map((it) => {
          const on = active === it.label;
          return (
            <li key={it.label}>
              <button
                type="button"
                onClick={() => onNav(it.label)}
                className={cn(
                  "relative flex w-full items-center gap-2.5 rounded-[4px] py-1.5 pl-3 pr-2.5 text-[12.5px] transition-colors",
                  on
                    ? "bg-accent/[0.09] font-semibold text-charcoal"
                    : "font-normal text-slate hover:bg-foreground/[0.035]"
                )}
              >
                {on && (
                  <span className="absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full bg-accent" />
                )}
                <svg
                  viewBox="0 0 20 20"
                  className={cn("h-[15px] w-[15px]", on ? "text-accent" : "text-muted-light")}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {it.icon}
                </svg>
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/12 text-[9px] font-bold text-accent">
          AM
        </span>
        <span className="text-[12px] text-slate">Alex Morgan</span>
      </div>
    </nav>
  );
}

/* -------------------------------------------------------------- shared */

function StatusDot({ tone }: { tone: string }) {
  if (tone === "attention")
    return <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-foreground/45" />;
  return (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full"
      style={{
        background:
          tone === "opportunity" ? undefined : tone === "overdue" ? OVERDUE : "#9A968B",
      }}
    >
      {tone === "opportunity" && (
        <span className="block h-full w-full rounded-full bg-accent" />
      )}
    </span>
  );
}

function StatusLabel({ signal }: { signal: Signal }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <StatusDot tone={signal.tone} />
      <span className="font-medium text-slate">{signal.status}</span>
      <span className="text-muted-light">·</span>
      <span className="text-muted-light">{signal.property}</span>
    </div>
  );
}

function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-[12px] text-slate transition-colors hover:text-charcoal"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 3.5 5 8l4.5 4.5" />
      </svg>
      {label}
    </button>
  );
}

/* -------------------------------------------------------------- digest */

function Digest({
  revealStep,
  onOpen,
  onSchedule,
  onEvidence,
}: {
  revealStep: number;
  onOpen: (id: string) => void;
  onSchedule: () => void;
  onEvidence: () => void;
}) {
  const d = PRODUCT.digest;
  const [primary, ...rest] = PRODUCT.signals;

  return (
    <div className="flex flex-col">
      <header className="border-b border-border px-6 pb-5 pt-5">
        <p className="text-[11px] font-medium tracking-[0.04em] text-muted-light">{d.label}</p>
        <h2 className="mt-1.5 text-[19px] font-semibold tracking-[-0.015em] text-charcoal">
          {d.greeting}
        </h2>
        <p className="mt-1 text-[13.5px] leading-[1.5] text-slate">
          {(() => {
            const [lead, tail] = d.summary.split(/ need /);
            return (
              <>
                <span className="font-medium text-charcoal">{lead}</span>
                {tail ? ` need ${tail}` : ""}
              </>
            );
          })()}
        </p>
        <p className="mt-2.5 text-[11px] text-muted-light">{d.meta}</p>
      </header>

      <PrimarySignal
        signal={primary}
        step={revealStep}
        onOpen={() => onOpen(primary.id)}
        onSchedule={onSchedule}
        onEvidence={onEvidence}
      />

      <p className="border-b border-border px-6 pb-2 pt-5 text-[11px] font-medium text-muted-light">
        Other signals
      </p>

      <div>
        {rest.map((s, i) => {
          const shown = revealStep >= PRIMARY_STEPS + 1 + i;
          return (
            <motion.div
              key={s.id}
              initial={false}
              animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <SecondarySignal signal={s} onOpen={() => onOpen(s.id)} onSchedule={onSchedule} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Reveal({
  on,
  children,
  className,
}: {
  on: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 4 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PrimarySignal({
  signal,
  step,
  onOpen,
  onSchedule,
  onEvidence,
}: {
  signal: Signal;
  step: number;
  onOpen: () => void;
  onSchedule: () => void;
  onEvidence: () => void;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const highlight = "highlight" in signal ? signal.highlight : "";
  const [before, after] = highlight
    ? signal.headline.split(highlight)
    : [signal.headline, ""];
  const sourceCount = "detail" in signal ? signal.detail.sources.length : 0;

  return (
    <div className="border-b border-border border-l-[3px] border-l-accent bg-accent/[0.04] px-6 py-5">
      <Reveal on={step >= 1} className="flex items-center gap-2 text-[11px]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span className="font-medium text-accent">{signal.status}</span>
        <span className="text-muted-light">·</span>
        <span className="text-muted-light">{signal.property}</span>
      </Reveal>

      <button
        type="button"
        onClick={onOpen}
        className="mt-2 block max-w-[46ch] text-left text-[15.5px] font-semibold leading-[1.3] tracking-[-0.01em] text-charcoal transition-colors hover:text-accent"
      >
        {highlight ? (
          <>
            {before}
            <span
              className={cn(
                "rounded-[2px] px-0.5 transition-colors duration-500",
                step >= 2 ? "bg-accent/15 text-accent" : "bg-transparent"
              )}
            >
              {highlight}
            </span>
            {after}
          </>
        ) : (
          signal.headline
        )}
      </button>

      <Reveal on={step >= 3} className="mt-3.5">
        <p className="text-[11px] font-medium text-muted-light">Why you&rsquo;re seeing this</p>
        <p className="mt-0.5 max-w-[58ch] text-[12.5px] leading-[1.5] text-slate">
          {"whySeeing" in signal ? signal.whySeeing : ""}
        </p>
      </Reveal>

      <Reveal on={step >= 4} className="mt-3">
        <p className="text-[11px] font-medium text-accent">Suggested next step</p>
        <p className="mt-0.5 max-w-[58ch] text-[12.5px] leading-[1.5] text-charcoal">
          {"recommendation" in signal ? signal.recommendation : ""}
        </p>
      </Reveal>

      <Reveal on={step >= 5} className="mt-3.5">
        {sourceCount > 0 && (
          <button
            type="button"
            onClick={onEvidence}
            className="inline-flex items-center gap-1 text-[11.5px] text-slate transition-colors hover:text-accent"
          >
            {sourceCount} sources
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 8 8 4M5 4h3v3" />
            </svg>
          </button>
        )}

        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={onOpen}
            className={cn(BTN_SM, "bg-accent text-accent-foreground hover:bg-accent-light")}
          >
            Review opportunity
          </button>
          <button
            type="button"
            onClick={onSchedule}
            className={cn(BTN_SM, "border border-border text-slate hover:border-foreground/40 hover:text-charcoal")}
          >
            Schedule meeting
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="ml-auto text-[11px] text-muted-light transition-colors hover:text-slate"
          >
            Dismiss
          </button>
        </div>
      </Reveal>
    </div>
  );
}

function SecondarySignal({
  signal,
  onOpen,
  onSchedule,
}: {
  signal: Signal;
  onOpen: () => void;
  onSchedule: () => void;
}) {
  const runAction = (label: string) => (/schedule/i.test(label) ? onSchedule() : onOpen());

  return (
    <div className="group border-b border-border px-6 py-3.5 transition-colors hover:bg-foreground/[0.015]">
      <div className="flex items-center gap-2 text-[10.5px]">
        <StatusDot tone={signal.tone} />
        <span className="font-medium text-slate">{signal.status}</span>
        <span className="text-muted-light">·</span>
        <span className="text-muted-light">{signal.property}</span>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-1 block text-left text-[13px] font-semibold leading-snug text-charcoal transition-colors group-hover:text-accent"
      >
        {signal.headline}
      </button>

      <p className="mt-0.5 max-w-[64ch] text-[12px] leading-[1.45] text-slate">
        {"why" in signal ? signal.why : ""}
      </p>

      <div className="mt-2.5 flex items-center gap-2">
        {signal.actions.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => runAction(a)}
            className={cn(
              BTN_SM,
              "border border-border text-slate hover:border-foreground/40 hover:text-charcoal"
            )}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- evidence drawer */

function EvidenceDrawer({
  sources,
  onClose,
}: {
  sources: readonly string[];
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 z-30 flex justify-end bg-charcoal/25" onClick={onClose}>
      <div
        className="h-full w-[264px] border-l border-border bg-warm-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-[12.5px] font-semibold text-charcoal">Sources</p>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-light transition-colors hover:text-charcoal"
            aria-label="Close"
          >
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="m3 3 8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[11px] text-muted-light">Evidence behind this signal</p>
          <ul className="mt-3 space-y-3">
            {sources.map((s) => (
              <li key={s} className="flex items-start gap-2.5">
                <svg viewBox="0 0 16 16" className="mt-px h-3.5 w-3.5 shrink-0 text-muted-light" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2h5l3 3v9H4z" />
                  <path d="M9 2v3h3" />
                </svg>
                <span className="text-[12.5px] leading-tight text-charcoal">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- signal detail */

function SignalDetail({
  signal,
  onBack,
  onSchedule,
  onOpenPrior,
  meetingDone,
}: {
  signal: Signal;
  onBack: () => void;
  onSchedule: () => void;
  onOpenPrior: () => void;
  meetingDone: boolean;
}) {
  const detail = "detail" in signal ? signal.detail : undefined;

  return (
    <div className="flex flex-col">
      <div className="border-b border-border px-6 py-3">
        <BackLink label="Daily Digest" onClick={onBack} />
      </div>

      <div className="flex-1 px-6 py-5">
        <StatusLabel signal={signal} />
        <h2 className="mt-2 max-w-[44ch] text-[17px] font-semibold leading-snug text-charcoal">
          {signal.headline}
        </h2>

        {detail ? (
          <div className="mt-5 space-y-4">
            <Field label="What changed">{detail.whatChanged}</Field>
            <Field label="Why this matters">{detail.whyMatters}</Field>
            <Field label="Why you&rsquo;re seeing this">{detail.whySurfaced}</Field>

            <div>
              <p className="text-[11px] font-medium text-muted-light">Prior context</p>
              <div className="mt-2 border-l-2 border-border pl-3.5">
                <p className="text-[13px] font-semibold text-charcoal">{detail.prior.title}</p>
                <p className="mt-1 text-[12px] text-slate">Status &nbsp;·&nbsp; {detail.prior.status}</p>
                <p className="text-[12px] text-slate">Reason &nbsp;·&nbsp; {detail.prior.reason}</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-muted-light">Sources</p>
              <p className="mt-1 text-[12px] text-slate">{detail.sources.join("  ·  ")}</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-[11px] font-medium text-accent">Suggested next step</p>
              <p className="mt-1 max-w-[54ch] text-[13px] text-charcoal">
                {detail.recommendation}
              </p>

              <div className="mt-3.5 flex items-center gap-2">
                <button type="button" onClick={onSchedule} className={BTN_PRIMARY}>
                  Schedule review meeting
                </button>
                <button type="button" onClick={onOpenPrior} className={BTN_GHOST}>
                  Open prior deal
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="ml-auto text-[11px] text-muted-light transition-colors hover:text-slate"
                >
                  Dismiss signal
                </button>
              </div>

              {meetingDone && (
                <p className="mt-3 flex items-center gap-2 text-[12px] font-medium text-accent">
                  <Check /> {PRODUCT.meeting.created}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <Field label="Why this matters">{"why" in signal ? signal.why : ""}</Field>
            <div className="border-t border-border pt-4">
              <button type="button" onClick={onBack} className={BTN_GHOST}>
                Back to digest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-muted-light">{label}</p>
      <p className="mt-1 max-w-[60ch] text-[13px] leading-[1.55] text-charcoal">{children}</p>
    </div>
  );
}

/* --------------------------------------------------------- meeting modal */

function MeetingModal({
  done,
  onCreate,
  onClose,
}: {
  done: boolean;
  onCreate: () => void;
  onClose: () => void;
}) {
  const m = PRODUCT.meeting;
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-charcoal/45 px-6">
      <div className="w-full max-w-[380px] border border-border bg-warm-white shadow-[0_24px_60px_-16px_rgba(20,19,17,0.5)]">
        {done ? (
          <div className="px-6 py-8 text-center">
            <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 text-accent">
              <Check />
            </span>
            <p className="mt-3 text-[13.5px] font-medium text-charcoal">{m.created}</p>
            <button type="button" onClick={onClose} className={cn(BTN_GHOST, "mt-4")}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <p className="text-[13px] font-semibold text-charcoal">Schedule review meeting</p>
              <button
                type="button"
                onClick={onClose}
                className="text-muted-light transition-colors hover:text-charcoal"
                aria-label="Close"
              >
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="m3 3 8 8M11 3l-8 8" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <p className="text-[11px] text-muted-light">Meeting title</p>
                <p className="mt-1 text-[14px] font-medium text-charcoal">{m.title}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-light">Suggested agenda</p>
                <ol className="mt-1.5 space-y-1">
                  {m.agenda.map((a, i) => (
                    <li key={a} className="flex gap-2.5 text-[12.5px] leading-[1.4] text-charcoal">
                      <span className="text-muted-light tabular-nums">{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-[11px] text-muted-light">Suggested attendees</p>
                <p className="mt-1 text-[12.5px] text-charcoal">{m.attendees.join("  ·  ")}</p>
              </div>
            </div>

            <div className="flex gap-2 border-t border-border px-5 py-3.5">
              <button type="button" onClick={onCreate} className={BTN_PRIMARY}>
                Create meeting
              </button>
              <button type="button" onClick={onClose} className={BTN_GHOST}>
                Edit details
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- property */

const P_TABS: PropTab[] = ["Overview", "Memory", "Signals", "Documents", "Tasks"];

function Property({
  tab,
  onTab,
  onBack,
  onOpenSignal,
}: {
  tab: PropTab;
  onTab: (t: PropTab) => void;
  onBack: () => void;
  onOpenSignal: (id: string) => void;
}) {
  const p = PRODUCT.property;
  return (
    <div className="flex flex-col">
      <div className="border-b border-border px-6 py-4">
        <BackLink label="Daily Digest" onClick={onBack} />
        <h2 className="mt-2.5 text-[16px] font-semibold text-charcoal">{p.name}</h2>
        <p className="mt-0.5 text-[12px] text-slate">{p.address}</p>
      </div>

      <div className="flex gap-5 border-b border-border px-6">
        {P_TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTab(t)}
            className={cn(
              "-mb-px border-b-2 py-2.5 text-[12.5px] transition-colors",
              tab === t
                ? "border-accent font-medium text-charcoal"
                : "border-transparent text-slate hover:text-charcoal"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 px-6 py-5">
        {tab === "Overview" && <PropOverview onOpenSignal={onOpenSignal} />}
        {tab === "Memory" && <PropMemory />}
        {tab === "Signals" && <PropSignals onOpenSignal={onOpenSignal} />}
        {tab === "Documents" && <PropDocuments />}
        {tab === "Tasks" && <PropTasks />}
      </div>
    </div>
  );
}

function Group({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-muted-light">{label}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="text-[12.5px] leading-[1.4] text-charcoal">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PropOverview({ onOpenSignal }: { onOpenSignal: (id: string) => void }) {
  const o = PRODUCT.property.overview;
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-[12px]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-slate">{PRODUCT.property.status}</span>
        <span className="text-muted-light">·</span>
        <span className="text-muted-light">{PRODUCT.signals.length} active signals</span>
      </div>

      <div>
        <p className="text-[11px] font-medium text-muted-light">Active signals</p>
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {PRODUCT.signals.slice(0, 3).map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onOpenSignal(s.id)}
                className="flex w-full items-center gap-2.5 py-2 text-left text-[12.5px] text-charcoal hover:text-accent"
              >
                <StatusDot tone={s.tone} />
                <span className="truncate">{s.headline}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Group label="Recent decisions" items={o.recentDecisions} />
        <Group label="Upcoming deadlines" items={o.deadlines} />
        <Group label="Most recent updates" items={o.updates} />
      </div>
    </div>
  );
}

function PropMemory() {
  return (
    <div>
      <p className="text-[11px] font-medium text-muted-light">
        The permanent record — what happened and why
      </p>
      <ol className="mt-3 divide-y divide-border border-t border-border">
        {PRODUCT.property.memory.map((m) => (
          <li key={m.year} className="flex gap-4 py-3.5">
            <span className="w-10 shrink-0 text-[13px] font-semibold tabular-nums text-charcoal">
              {m.year}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-charcoal">{m.title}</p>
              {"note" in m && m.note && (
                <p className="mt-0.5 text-[12px] text-slate">{m.note}</p>
              )}
            </div>
            <span className="shrink-0 text-[11px] text-muted-light">{m.sources} sources</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PropSignals({ onOpenSignal }: { onOpenSignal: (id: string) => void }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {PRODUCT.signals.map((s) => (
        <li key={s.id}>
          <button
            type="button"
            onClick={() => onOpenSignal(s.id)}
            className="w-full py-3 text-left"
          >
            <div className="flex items-center gap-2 text-[11px]">
              <StatusDot tone={s.tone} />
              <span className="font-medium text-slate">{s.status}</span>
            </div>
            <p className="mt-1 text-[12.5px] text-charcoal hover:text-accent">{s.headline}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

function PropDocuments() {
  return (
    <div className="border-y border-border">
      <div className="flex items-center gap-4 border-b border-border py-2 text-[10.5px] font-medium uppercase tracking-wide text-muted-light">
        <span className="flex-1">Document</span>
        <span className="w-20">Type</span>
        <span className="w-12 text-right">Year</span>
      </div>
      {PRODUCT.property.documents.map((doc) => (
        <div
          key={doc.name}
          className="flex items-center gap-4 border-b border-border py-2.5 text-[12.5px] last:border-b-0"
        >
          <span className="flex-1 truncate text-charcoal">{doc.name}</span>
          <span className="w-20 text-slate">{doc.kind}</span>
          <span className="w-12 text-right tabular-nums text-muted-light">{doc.date}</span>
        </div>
      ))}
    </div>
  );
}

function PropTasks() {
  return (
    <div className="border-y border-border">
      {PRODUCT.property.tasks.map((t) => (
        <div
          key={t.title}
          className="flex items-center gap-4 border-b border-border py-2.5 text-[12.5px] last:border-b-0"
        >
          <span className="flex-1 text-charcoal">{t.title}</span>
          <span className="w-24 text-slate">{t.owner}</span>
          <span className="w-28 text-muted-light">{t.due}</span>
          <span className="w-12 text-right text-slate">{t.status}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------- portfolio / search / tasks */

function Portfolio({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col">
      <header className="border-b border-border px-6 py-5">
        <h2 className="text-[17px] font-semibold text-charcoal">Portfolio</h2>
        <p className="mt-0.5 text-[12px] text-slate">24 properties monitored</p>
      </header>
      <ul className="divide-y divide-border">
        {PRODUCT.portfolio.map((prop) => (
          <li key={prop.name}>
            <button
              type="button"
              onClick={prop.active ? onOpen : undefined}
              className={cn(
                "flex w-full items-center gap-3 px-6 py-3.5 text-left",
                prop.active ? "hover:bg-foreground/[0.015]" : "cursor-default"
              )}
            >
              <div className="min-w-0 flex-1">
                <p className={cn("text-[13px]", prop.active ? "font-medium text-charcoal" : "text-slate")}>
                  {prop.name}
                </p>
                <p className="text-[11.5px] text-muted-light">{prop.city}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-light">
                {prop.signals > 0 ? `${prop.signals} signals` : "No signals"}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SearchView() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-border px-6 py-5">
        <h2 className="text-[17px] font-semibold text-charcoal">Search</h2>
        <p className="mt-0.5 text-[12px] text-slate">
          Find any decision, document or record across the portfolio.
        </p>
      </header>
      <div className="px-6 py-5">
        <div className="flex items-center gap-2.5 rounded-[2px] border border-border bg-background px-3 py-2">
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-muted-light" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m11 11 3.5 3.5" strokeLinecap="round" />
          </svg>
          <span className="text-[13px] text-muted-light">Search Westmount Centre and 23 more</span>
        </div>
        <p className="mt-5 text-[11px] font-medium text-muted-light">Recent</p>
        <ul className="mt-2 space-y-1.5 text-[12.5px] text-slate">
          <li>Why was the RTU replacement phased</li>
          <li>2024 QSR opportunity</li>
          <li>Roof warranty terms</li>
        </ul>
      </div>
    </div>
  );
}

function TasksView() {
  return (
    <div className="flex flex-col">
      <header className="border-b border-border px-6 py-5">
        <h2 className="text-[17px] font-semibold text-charcoal">Tasks</h2>
        <p className="mt-0.5 text-[12px] text-slate">Actions and deadlines across your portfolio.</p>
      </header>
      <div className="px-6 py-4">
        <PropTasks />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Check() {
  return (
    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7.5 6 10l5-6" />
    </svg>
  );
}
