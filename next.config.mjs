/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default", // Use the default loader
    // unoptimized: true, // Disable optimization for static hosting
    domains: [
      "cloud.appwrite.io", // Add the domain of your external images here
    ],
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
