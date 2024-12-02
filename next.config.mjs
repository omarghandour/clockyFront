/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "default", // Use the default loader
    unoptimized: true, // Disable optimization for static hosting
    domains: [
      "cloud.appwrite.io", // Add the domain of your external images here
      "https://cloud.appwrite.io",
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
// https://cloud.appwrite.io/v1/storage/buckets/67130d23001000917f00/files/673d5ee60028e63eec16/view?project=67130d070031ae19004c&project=67130d070031ae19004c&mode=adminhttps://cloud.appwrite.io/v1/storage/buckets/67130d23001000917f00/files/673d5ee60028e63eec16/view?project=67130d070031ae19004c&project=67130d070031ae19004c&mode=admin
