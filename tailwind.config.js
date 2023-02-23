module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        grey: {
          10: '#f7f9fb',
          20: '#f4f6f7',
          30: '#eceff1',
          40: '#dde2e6',
          50: '#c0c4c8',
          60: '#3e3f49',
          70: '#2b2a33',
          80: '#1d1d22',
          90: '#09090e',
        },
        lapisMain: '#413ee1',
        lapis: {
          30: '#759cfe',
          50: '#5b7fff',
          70: '#4443e6',
          80: '#94abf5',
          90: '#392ed6',
          100: '#4f59f5',
          120: '#392ed6',
        },
        midnight: {
          60: '#404264',
          80: '#1A1D45',
          100: '#000330',
        },
        mintMain: '#1DDDA6',
        mint: {
          10: '#a3f4d4',
          30: '#7aebc1',
          50: '#1ddda6',
          70: '#02c28b',
          80: '#dbfaed',
          100: '#A1F2D4',
          120: '#7AEBC1',
        },
        lemon: {
          120: '#FFF37E',
        },
        neutral: {
          30: '#c0c4c8',
          50: '#6b6e76',
          70: '#323239',
          90: '#1e1e23',
          400: '#09090e',
        },
        nickel: '#6B6E76',
        alizarinCrimson: '#E02020',
      },
    },
    container: {
      padding: '20px',
      center: true,
    },
  },
  plugins: [],
};
