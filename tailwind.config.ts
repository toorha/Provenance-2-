import type { Config } from "tailwindcss";

/* Tokens are DESIGN.md §25.2. Nothing here is invented — if a value is needed
   that is not in this file, it goes into DESIGN.md first. */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── THE BRAND ENVIRONMENT ────────────────────────────────────────
           Dark is the primary canvas. Light is a product surface, not a
           section. These tokens carry the page; the mineral/ink family below
           carries the light product windows that float inside it. */
        canvas: {
          DEFAULT: "#0D0F0E", // near-black, L* 4.1
          2: "#131614",
          3: "#171A18",
          4: "#1E221F", // raised surfaces, quiet bands
        },
        paper: {
          DEFAULT: "#F3F4F0", // 17.4:1 on canvas
          muted: "#A9B0AA", //  8.7:1
          subtle: "#7E867F", //  5.1:1 — still AA
        },

        /* the mineral ground — used INSIDE product windows, where it is the
           bright surface the whole dark page is built to contrast against */
        mineral: {
          0: "#FBFCFB",
          50: "#F4F6F5",
          100: "#E9ECEB", // canvas
          200: "#DCE1DF",
          300: "#C9D0CD", // hairline
          400: "#A8B2AF", // structural rule
          500: "#7E8A88", // 3.0:1 — large text / borders / disabled only
        },
        slate: "#56636A",
        graphite: { DEFAULT: "#323A3B", lift: "#3D4749" },
        /* ink is text and fills — never a page ground */
        ink: { DEFAULT: "#1E2422", deep: "#161B1A" },
        /* basalt is the descent. A stone family, not a dark theme. */
        basalt: {
          500: "#4A5852",
          600: "#3E4C46",
          700: "#33403B", // the descent canvas, L* 25.8
          800: "#2B3833",
          900: "#262F2B", // floor
        },
        onDeep: { DEFAULT: "#E9ECEB", muted: "#C8D2CD", subtle: "#A9B5B0" },
        vera: {
          /* on dark, 500 is the fill (white on it = 6.3:1) and 400 is the text
             (7.1:1 on canvas). 600/700 remain the light-surface values used
             inside product windows. */
          500: "#2F6B4F",
          50: "#EFF5F1",
          100: "#E1EDE6",
          /* the active-reasoning wash. ~12% tint against the mineral-050
             panel ground, where vera-100 measured only 7% and read as noise. */
          200: "#D5E6DC",
          300: "#A6C7B5", // Vera text on basalt
          400: "#6FA98C", // light half only
          600: "#2A6249", // Vera text / focus on light
          700: "#1F4A38", // Vera fill
          800: "#173329",
        },
        clay: { 100: "#F3E4DE", 600: "#A35F45", 700: "#8F5038" },
        ochre: { 100: "#EFE9DA", 600: "#9A7B3F", 700: "#7D6229" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        /* product UI only — inside a Vera frame (DESIGN.md §4.1 deviation) */
        product: [
          "var(--font-product)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        /* thesis page only */
        serif: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        /* tracking measured against Pliant — it is drawn tight and needs far
           less negative tracking than the reference corpus (DESIGN.md §4.2) */
        "display-1": ["4.75rem", { lineHeight: "1.0", letterSpacing: "-0.020em", fontWeight: "600" }],
        "display-2": ["3.5rem", { lineHeight: "1.04", letterSpacing: "-0.018em", fontWeight: "600" }],
        "display-3": ["2.5rem", { lineHeight: "1.10", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-1": ["1.875rem", { lineHeight: "1.18", letterSpacing: "-0.012em", fontWeight: "600" }],
        "heading-2": ["1.375rem", { lineHeight: "1.28", letterSpacing: "-0.008em", fontWeight: "600" }],
        "heading-3": ["1.125rem", { lineHeight: "1.38", letterSpacing: "-0.005em", fontWeight: "600" }],
        "section-label": ["1.25rem", { lineHeight: "1.20", letterSpacing: "-0.006em", fontWeight: "600" }],
        lead: ["1.25rem", { lineHeight: "1.50", letterSpacing: "-0.005em", fontWeight: "430" }],
        body: ["1.0625rem", { lineHeight: "1.60", letterSpacing: "-0.003em", fontWeight: "430" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55", letterSpacing: "0", fontWeight: "430" }],
        ui: ["0.875rem", { lineHeight: "1.40", letterSpacing: "0", fontWeight: "500" }],
        "ui-sm": ["0.8125rem", { lineHeight: "1.35", letterSpacing: "0.004em", fontWeight: "500" }],
        micro: ["0.75rem", { lineHeight: "1.30", letterSpacing: "0.010em", fontWeight: "500" }],
        button: ["0.9375rem", { lineHeight: "1.0", letterSpacing: "0", fontWeight: "500" }],
        mono: ["0.8125rem", { lineHeight: "1.45", letterSpacing: "0.020em", fontWeight: "400" }],
        "mono-sm": ["0.719rem", { lineHeight: "1.30", letterSpacing: "0.040em", fontWeight: "500" }],
      },
      borderRadius: {
        chip: "3px",
        control: "6px",
        panel: "10px",
        frame: "14px",
      },
      boxShadow: {
        /* four elevation values exist. There are no others. */
        "lift-2": "0 1px 1px rgba(30,36,34,.03), 0 2px 4px rgba(30,36,34,.04)",
        "lift-3": "0 1px 2px rgba(30,36,34,.04), 0 8px 24px rgba(30,36,34,.08)",
      },
      maxWidth: {
        content: "1240px",
        wide: "1440px",
      },
      spacing: {
        band: "80px",
        section: "128px",
      },
      transitionTimingFunction: {
        entrance: "cubic-bezier(.16, 1, .30, 1)",
        state: "cubic-bezier(.40, 0, .20, 1)",
        exit: "cubic-bezier(.40, 0, 1, 1)",
        cursor: "cubic-bezier(.33, 0, .15, 1)",
      },
      transitionDuration: {
        instant: "90ms",
        quick: "140ms",
        base: "220ms",
        considered: "340ms",
        deliberate: "520ms",
      },
    },
  },
  plugins: [],
};

export default config;
