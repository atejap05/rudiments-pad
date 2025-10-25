import nextVitals from "eslint-config-next/core-web-vitals.js";

const eslintConfig = [
  ...(Array.isArray(nextVitals) ? nextVitals : [nextVitals]),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
