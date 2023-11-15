import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        light:{
          DEFAULT: "#fefefe",
          text:"#eefefc"
        },
        dark:{
          DEFAULT: "#101010",
          text:"#313131"
        },
        primary:{
          DEFAULT:"#a60000",
          dark:"#420000"
        }
      }
    },
  },
  plugins: [],
}
export default config
