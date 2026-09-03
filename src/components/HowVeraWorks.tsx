import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { VeraMark } from "@/components/vera/VeraMark";

/* HOMEPAGE.md §5, Section 4. How Vera works.

   This section answers one question: how does Vera actually get all of this
   context? The answer is that nobody files anything. Vera is included in the
   work the team is already doing.

   DELIBERATELY LIGHT. Meet Vera already proved the product with a real frame,
   a walkthrough and three modes. Repeating any of that here would read as a
   second product tour and would make the page feel like it is still selling
   the same point. No frame, no cursor, no narrator, no autoplay, no camera.
   Three small fragments of real workflow and three sentences.

   THE FRAGMENTS ARE NOT CARDS. Each column is bare: a label, one small light
   surface holding a piece of interface, and a line of copy. The light surface
   is the product ground used everywhere else, which is what makes it read as
   software rather than as an illustration of software. Nothing has a box
   around the whole column.

   NOT AN INTEGRATIONS SECTION. No vendor names, no logos, no product marks.
   This is about a behaviour that works anywhere the team already writes to
   each other, and naming clients would both date the page and promise
   support that has not been built. */

/* Three pieces of everyday work, not three feature cards.

   The widths are content driven and deliberately unequal: the reply is the
   largest because it holds a real sentence, the Cc field is the smallest
   because it is two lines of header. That difference is what stops the row
   reading as a pricing table. They all still start on one baseline, because
   staggering them vertically as well left the labels floating at three
   different heights and the row looked unsettled rather than composed. */
const WORKFLOWS = [
  {
    label: "Reply or forward",
    copy: "Captures the files, property and what changed.",
    /* widest: it contains an actual sentence someone typed */
    w: "lg:w-[420px]",
  },
  {
    label: "Cc Vera",
    copy: "Keeps decisions, open issues and follow-ups from the thread.",
    /* smallest: two header rows and nothing else */
    w: "lg:w-[318px]",
  },
  {
    label: "Invite Vera",
    copy: "Turns decisions, actions and unresolved issues into property context.",
    w: "lg:w-[352px]",
  },
];

export function HowVeraWorks() {
  return (
    <section className="section bg-canvas">
      <div className="track">
        {/* ── the statement ────────────────────────────────────────────── */}
        <div className="grid12">
          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <SectionLabel>How Vera works</SectionLabel>
          </Reveal>
        </div>

        <div className="grid12 mt-5">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-9">
            <h2 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] text-paper sm:text-[2.125rem] lg:text-[3rem] lg:leading-[1.06] lg:tracking-[-0.018em]">
              Vera works where your team already works.
            </h2>
          </Reveal>
        </div>

        <div className="grid12 mt-6">
          <Reveal delay={60} className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="text-lead text-paper-muted">
              Reply, forward, invite, ask, or file. Vera captures context as the
              work happens.
            </p>
          </Reveal>
        </div>

        {/* ── the three ways ───────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-12 md:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          {WORKFLOWS.map((w, i) => (
            <Reveal
              key={w.label}
              delay={i * 60}
              className={clsx("w-full", w.w)}
            >
              {/* the label sits on its fragment, not adrift above it */}
              <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
                {w.label}
              </p>

              <div className="mt-2.5">
                {i === 0 && <ReplyFragment />}
                {i === 1 && <CcFragment />}
                {i === 2 && <InviteFragment />}
              </div>

              <p className="mt-3.5 text-body-sm text-paper-muted">{w.copy}</p>
            </Reveal>
          ))}
        </div>

        {/* ── the point, then the handover ─────────────────────────────── */}
        <div className="grid12 mt-14 md:mt-16">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-8">
            <p className="text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.012em] text-paper sm:text-[1.875rem]">
              Your team keeps working. Vera keeps the context.
            </p>
            {/* the bridge into the memory section. Quieter on purpose: it is a
                handover, not a second conclusion. */}
            <p className="mt-3 text-body text-paper-muted">
              Vera captures the work. Provenance becomes the memory.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── the fragments ──────────────────────────────────────────────────────
   Small pieces of real interface on the product ground, in the product face.
   Each is the smallest thing that still reads as the real moment: a reply
   body, a Cc field, an attendee list. None of them is a client. */

function Surface({ children }: { children: React.ReactNode }) {
  return (
    /* 4px radius, tight padding, one hairline, no shadow. It should look like
       something cropped out of an application, which is why it is smaller and
       plainer than anything Provenance would draw for itself. */
    <div className="rounded-[4px] border border-mineral-300 bg-mineral-0 px-3.5 py-3 font-product">
      {children}
    </div>
  );
}

function ReplyFragment() {
  return (
    <Surface>
      <p className="text-[11px] uppercase tracking-[0.06em] text-slate">
        Re: South Pad concept
      </p>
      <p className="mt-2 text-[14px] leading-[1.5] text-ink">
        {/* green marks Vera's presence, and only that */}
        <span className="font-semibold text-vera-700">@Vera</span> file this
        under Westmount Centre / South Pad.
      </p>
    </Surface>
  );
}

function CcFragment() {
  return (
    <Surface>
      <div className="flex items-baseline gap-3 border-b border-mineral-200 pb-2.5">
        <span className="w-6 shrink-0 text-[11px] uppercase tracking-[0.06em] text-slate">
          To
        </span>
        <span className="truncate text-[14px] text-ink">Sarah Chen</span>
      </div>
      <div className="flex items-baseline gap-3 pt-2.5">
        <span className="w-6 shrink-0 text-[11px] uppercase tracking-[0.06em] text-slate">
          Cc
        </span>
        <span className="truncate text-[14px] font-medium text-vera-700">
          vera@provenance.ai
        </span>
      </div>
    </Surface>
  );
}

function InviteFragment() {
  return (
    <Surface>
      <p className="text-[11px] uppercase tracking-[0.06em] text-slate">
        South Pad review
      </p>
      <ul className="mt-2.5">
        {["Sarah Chen", "Jordan Lee"].map((name) => (
          <li key={name} className="flex h-[26px] items-center gap-2.5">
            <span className="h-[7px] w-[7px] rounded-full bg-mineral-400" />
            <span className="text-[14px] text-ink">{name}</span>
          </li>
        ))}
        {/* the one place the mark belongs here: Vera as an attendee */}
        <li className="flex h-[26px] items-center gap-2.5">
          <VeraMark size={14} className="text-vera-700" />
          <span className="text-[14px] font-medium text-vera-700">Vera</span>
        </li>
      </ul>
    </Surface>
  );
}
