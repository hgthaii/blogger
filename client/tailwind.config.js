/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#274472',
                secondary: '#28678a',
                text: '#383838',
                title: '#333332',
                placeholder: '#b3b3b1',
                link: '#0087be',
                'link-hover': '#00aadc',
            },
            important: true,
        },
    },
    plugins: [],
}
