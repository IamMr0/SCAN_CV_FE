/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary':                '#0040a1',
        'primary-container':      '#0056d2',
        'primary-fixed':          '#dae2ff',
        'primary-fixed-dim':      '#b2c5ff',
        'on-primary':             '#ffffff',
        'on-primary-fixed':       '#001847',
        'on-primary-fixed-variant': '#0040a1',

        'secondary':              '#4a5d8e',
        'secondary-container':    '#b3c5fd',
        'secondary-fixed':        '#dae2ff',
        'secondary-fixed-dim':    '#b3c5fd',
        'on-secondary':           '#ffffff',
        'on-secondary-fixed':     '#001847',
        'on-secondary-fixed-variant': '#324575',
        'on-secondary-container': '#3e5181',

        'tertiary':               '#822800',
        'tertiary-container':     '#a93802',
        'tertiary-fixed':         '#ffdbcf',
        'tertiary-fixed-dim':     '#ffb59b',
        'on-tertiary':            '#ffffff',
        'on-tertiary-fixed':      '#380d00',
        'on-tertiary-fixed-variant': '#812800',
        'on-tertiary-container':  '#ffcebd',

        'surface':                '#f9f9fd',
        'surface-bright':         '#f9f9fd',
        'surface-dim':            '#d9dadd',
        'surface-container-lowest': '#ffffff',
        'surface-container-low':  '#f3f3f7',
        'surface-container':      '#edeef1',
        'surface-container-high': '#e7e8eb',
        'surface-container-highest': '#e2e2e6',
        'on-surface':             '#191c1e',
        'on-surface-variant':     '#424654',

        'background':             '#f9f9fd',
        'on-background':          '#191c1e',

        'outline':                '#737785',
        'outline-variant':        '#c3c6d6',

        'error':                  '#ba1a1a',
        'error-container':        '#ffdad6',
        'on-error':               '#ffffff',
        'on-error-container':     '#93000a',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body:     ['Inter', 'sans-serif'],
        label:    ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg:      '0.25rem',
        xl:      '0.5rem',
        full:    '0.75rem',
        '2xl':   '1rem',
        '3xl':   '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
