// frontend/postcss.config.js
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
    purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
}