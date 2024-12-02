/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                "custom-dark":
                    "20px 30px 40px rgba(0, 0, 0, 0.6), -20px 30px 40px rgba(0, 0, 0, 0.6)", // Darker shadow
            },
            fontFamily: {
                majorMono: ['"Major Mono Display"', "monospace"],
                rajdhani: ["Rajdhani", "sans-serif"],
            },
        },
    },
    plugins: [],
};
