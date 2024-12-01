/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default", // Use the default loader
    unoptimized: true, // Disable optimization for static hosting
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
