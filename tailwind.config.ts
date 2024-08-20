import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: "414px",
      sm: "640px",
      md: "800px",

      lg: "1000px",
      bg: "1150px",
      xlg: "1300px",
      xxl: "1500px",
      vlg: "1900px",
      "lg-max": { max: "960px" },
      xl: "1140px",
      "2xl": "1440px",
      "3xl": "1441px",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "5rem",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}
export default config
