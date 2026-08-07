import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Royal cinematic palette
        maroon: {
          DEFAULT: '#7a1f2b',
          deep: '#5a131c',
          light: '#a23a48',
          ink: '#3a0a13'
        },
        saffron: {
          DEFAULT: '#d97706',
          deep: '#a8430b',
          light: '#f6a96b',
          ember: '#fde6c8'
        },
        gold: {
          DEFAULT: '#caa14a',
          foil: '#caa14a',
          shimmer: '#f1d68a',
          deep: '#a87f2c',
          thread: '#e6c66a'
        },
        ivory: {
          DEFAULT: '#fbf6ec',
          soft: '#f4ead4',
          warm: '#f7e7c8'
        },
        peacock: {
          DEFAULT: '#0c6e8f',
          deep: '#073b50',
          sky: '#3aa1bf'
        },
        emerald: {
          DEFAULT: '#0f6e54',
          deep: '#063b2e',
          mint: '#52a08a'
        },
        sand: {
          DEFAULT: '#d8b285',
          stone: '#a37a55',
          deep: '#5a3c1d'
        },
        copper: {
          DEFAULT: '#b46a3d',
          deep: '#7a3f1d',
          light: '#d68f63'
        },
        ink: {
          DEFAULT: '#1a0e0a',
          warm: '#2c1d14',
          mute: '#52321e'
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'serif']
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(202,161,74,0.4), 0 12px 40px -10px rgba(202,161,74,0.45)',
        silk: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.25), 0 30px 60px -20px rgba(0,0,0,0.5)',
        palace: 'inset 0 0 0 1px rgba(202,161,74,0.6), inset 0 0 60px rgba(202,161,74,0.15), 0 60px 100px -30px rgba(0,0,0,0.8)'
      },
      keyframes: {
        curtain: {
          '0%': { transform: 'translateX(0) rotateY(0)' },
          '100%': { transform: 'translateX(-50%) rotateY(-72deg)' }
        },
        dust: {
          '0%': { transform: 'translate3d(0,0,0)', opacity: '0' },
          '20%': { opacity: '0.9' },
          '100%': { transform: 'translate3d(20vw,-30vh,0)', opacity: '0' }
        },
        bloom: {
          '0%, 100%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.04)', filter: 'brightness(1.15)' }
        },
        ripple: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        curtain: 'curtain 2200ms cubic-bezier(.6,.05,.2,1) forwards',
        dust: 'dust 9s linear infinite',
        bloom: 'bloom 4s ease-in-out infinite',
        ripple: 'ripple 2.4s ease-out infinite',
        shimmer: 'shimmer 6s linear infinite'
      }
    }
  },
  plugins: []
};

export default config;
