import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./src/**/*.tsx", "./src/**/*.ts"],

  theme: {
    extend: {
      gap: {
        ticker: "var(--ticker-width, 100vw)",
      },

      width: {
        54: "13.5rem",
      },

      colors: {
        red: {
          50: "#FDEDEB",
          100: "#EF5858",
          200: "#EC4737",
          300: "#DF3525",
          400: "#D32919",
          500: "#C41A0A",
          600: "#930000",
          700: "#791D14",
          800: "#610102",
        },
        rose: {
          500: "#E76058",
        },
        blue: {
          100: "#ECF4FF",
          300: "#69A2CC",
          500: "#3E88F5",
          700: "#2B4893",
        },
        gray: {
          100: "#ECF4FF",
          200: "#D9D9D9",
          300: "#B3B3B3",
          500: "#878787",
          600: "#797979",
          800: "#242424",
          900: "#1C1E22",
        },
        green: {
          600: "#58E76F",
          800: "#2FB144",
          900: "#60AB77",
        },
        violet: {
          300: "#CC69CC",
          500: "#932B93",
        },
        tacao: {
          300: "#F8B787",
        },
        punch: {
          600: "#D7412A",
        },
        yellow: {
          300: "#FFF261",
          400: "#E7BF58",
          700: "#FCAC00",
          800: "#B17B2F",
        },
        apricot: {
          300: "#F29369",
        },
        "polo-blue": {
          "50": "#f3f8fa",
          "100": "#eaf0f5",
          "200": "#d8e4ed",
          "300": "#c0d2e1",
          "400": "#a6bbd3",
          "500": "#829bbf",
          "600": "#778cb4",
          "700": "#65779d",
          "800": "#536180",
          "900": "#475268",
          "950": "#2a303c",
        },
        christine: {
          500: "#DF7A25",
        },
      },

      animation: {
        wave: "wave 3s linear infinite",
        ticker: "ticker 999s linear infinite",
        scaling: "scaling 1s linear infinite",
      },

      keyframes: {
        wave: {
          "0%,10%": {
            transform: "translateX(-100%)",
          },
          "90%,100%": {
            transform: "translateX(100%)",
          },
        },
        ticker: {
          "0%": {
            transform: "translate(var(--ticker-width, 100vw), 0)",
          },
          "100%": {
            transform: "translate(-100%, 0)",
          },
        },
        scaling: {
          "0%": {
            transform: "scale(1)",
          },
          "33%": {
            transform: "scale(0.95)",
          },
          "66%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },

      boxShadow: {
        drawer: "0 -6px 14px rgba(0 0 0 / .25)",
      },

      fontFamily: {
        inter: ["'Inter'", "sans-serif"],
        "burbank-big-condensed-black": "var(--burbank-big-condensed-black)",
      },

      aspectRatio: {
        "2/1": "2/1",
        "21/9": "21/9",
      },

      backgroundSize: {
        full: "100%",
        "bottom-appbar": "100% 4rem",
      },

      backgroundImage: {
        confetti: "url(../assets/images/general/confetti.png)",
        "card-confetti": "url(../assets/images/general/card-confetti.png)",
        "appbar-bottom": "url(../assets/images/appbar/bottom-background.png)",
      },

      backgroundPosition: {
        "center-top": "center 0",
      },

      zIndex: {
        1: "1",
        appbar: "20",
        drawer: "30",
        dialog: "40",
        tooltip: "50",
        snackbar: "60",
      },
    },

    container: {
      center: true,
      padding: "1.25rem",
      screens: ["430px"],
    },
  },

  plugins: [
    require("tailwindcss-safe-area"),
    plugin(function aria({ addVariant }) {
      addVariant("aria-current-page", '&[aria-current="page"]');
      addVariant("group-aria-current-page", '.group[aria-current="page"] &');
    }),
    plugin(function aria({ matchUtilities }) {
      matchUtilities(
        {
          perspective: (size) => ({
            perspective: size,
          }),
        },
        {
          type: "relative-size",
          supportsNegativeValues: true,
        },
      );
    }),
    plugin(function gradient({ matchUtilities, addUtilities, theme }) {
      matchUtilities(
        {
          "bg-radial-gradient"(value) {
            return {
              backgroundImage: `radial-gradient(${value}, var(--tw-gradient-stops))`,
            };
          },
        },
        {
          values: {
            center: "circle at center",
          },
          supportsNegativeValues: false,
        },
      );

      matchUtilities(
        {
          "bg-gradient": (angle) => ({
            "background-image": `linear-gradient(${angle}deg, var(--tw-gradient-stops))`,
          }),
        },
        {
          type: "number",
          supportsNegativeValues: true,
        },
      );

      addUtilities({
        ".to-custom-violet": {
          "--tw-gradient-to": `${theme("colors.violet.500", "")} var(--tw-gradient-to-position), ${theme("colors.violet.300", "")}`,
        },
      });
    }),
    plugin(function flickity({ addVariant }) {
      addVariant("flickity-slider", "& .flickity-slider");
      addVariant("flickity-button", "& .flickity-button");
      addVariant("flickity-dots", "& .flickity-page-dots");
      addVariant("flickity-viewport", "& .flickity-viewport");
      addVariant("flickity-dot", "& .flickity-page-dots .dot");
      addVariant("flickity-button-icon", "& .flickity-button-icon");
      addVariant("flickity-prev/next", "& .flickity-prev-next-button");
      addVariant("flickity-next", "& .flickity-prev-next-button.next");
      addVariant("flickity-prev", "& .flickity-prev-next-button.previous");
      addVariant("flickity-is-selected", [".flickity-slider &.is-selected", ".flickity-slider .is-selected &"]);
      addVariant("flickity-selected-dot", "& .flickity-page-dots .dot.is-selected");
      addVariant("flickity-lazyloaded", "&.flickity-lazyloaded");
    }),
  ],
};

export default config;
