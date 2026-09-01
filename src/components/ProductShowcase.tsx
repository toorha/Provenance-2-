"use client";

import { useState } from "react";
import { MacWindow } from "./MacWindow";
import { TrackWork } from "./modes/TrackWork";
import { AskProperty } from "./modes/AskProperty";
import { SurfaceSignals } from "./modes/SurfaceSignals";
import { SHOWCASE } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const MODES = SHOWCASE.modes;

export function ProductShowcase() {
  const [mode, setMode] = useState(0);

  return (
    <div>
      {/* the three things it does */}
      <div className="mb-5 flex flex-wrap gap-x-1 gap-y-2">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(i)}
            className={cn(
              "rounded-[2px] px-3 py-1.5 text-[13px] font-medium transition-colors duration-200",
              i === mode
                ? "bg-accent/[0.09] text-accent"
                : "text-graphite hover:bg-foreground/[0.04] hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <MacWindow title="Provenance">
        <div className="relative min-h-[440px] bg-warm-white font-sans text-foreground">
          {mode === 0 && <TrackWork />}
          {mode === 1 && <AskProperty />}
          {mode === 2 && <SurfaceSignals />}
        </div>
      </MacWindow>

      <p className="mt-5 max-w-[52ch] text-[13.5px] leading-[1.55] text-muted-foreground">
        {MODES[mode].note}
      </p>
    </div>
  );
}
