/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Permite que o build de produção seja concluído mesmo com erros de ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

