import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",

        /* material palette — charcoal, bone, slate, oxidised green, metal */
        "muted-light": "#75746C",
        "border-dark": "#A8A498",
        "accent-light": "#3A7159",
        "accent-bright": "#63C6A0",
        charcoal: "#131413",
        "charcoal-deep": "#0C0D0C",
        slate: "#2C2F2C",
        graphite: "#4B4F4C",
        steel: "#6E7370",
        bone: "#EDEAE1",
        "warm-white": "#F7F5EF",
        "dark-section": "#101110",
        oxide: "#2B5A46",
        rust: "#A8503A",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        /* the serif runs large and tight — it only appears at display sizes */
        "display-xl": ["5.25rem", { lineHeight: "0.96", letterSpacing: "-0.03em", fontWeight: "400" }],
        "display-lg": ["4rem", { lineHeight: "0.99", letterSpacing: "-0.028em", fontWeight: "400" }],
        "display-md": ["3.125rem", { lineHeight: "1.02", letterSpacing: "-0.025em", fontWeight: "400" }],
        "display-sm": ["2.25rem", { lineHeight: "1.08", letterSpacing: "-0.022em", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(19,20,19,0.05), 0 4px 16px rgba(19,20,19,0.04)",
        card: "0 1px 3px rgba(19,20,19,0.07), 0 10px 28px rgba(19,20,19,0.06)",
        /* a visual sits on the board, lit from above */
        board:
          "0 1px 0 rgba(255,255,255,0.5) inset, 0 2px 6px rgba(19,20,19,0.06), 0 28px 60px -24px rgba(19,20,19,0.38)",
        lift: "0 30px 70px -30px rgba(19,20,19,0.45)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
