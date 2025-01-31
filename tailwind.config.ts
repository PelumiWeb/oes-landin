import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily : {
      //  mono: ['var(--font-montserrat)', 'mono'],
      //   poppins: ['var(--font-poppins)', 'poppins'],
      //   inter: ['var(--font-inter)', 'inter'],
        marope: ['var(--font-marope)', 'marope'],
        inter: ['var(--font-inter)', 'inter'],

    },
    backgroundImage: {
      'limit-image': "url('/limitsImages.svg')",
      'hero-Image': "url('/heroGradient.svg')",
      'wavy-circle': "url('/circleRipple.svg')",
      'gradient-bg': "url('/Gradient.svg')",
      'footer-bg': "url('/Footer.svg')",
      'text-gradient': "linear-gradient(90deg, #017F36 62.11%, #000000 62.11%)",

      // background: linear-gradient(90deg, #017F36 62.11%, #000000 62.11%);




      },
    boxShadow: {
      'organization-one': " 0px 35px 45px 0px #070E270D",
      'connect-shadow': " 10px 25px 100px 0px #002B6B40",
      'avg-user-shadow': "10px 25px 100px 0px #002B6B40",
      'cta-shadow': "0px 16px 40px 0px #391DE814",
      'study-card': "10px 25px 100px 0px #002B6B40",
      "shadow-success": "0px 16px 40px 0px #391DE814",
      'input-shadow': "8px 8px 56px 0px #0000000D",


    },
  },
  
  plugins: [],
} satisfies Config;
