/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: true,
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],

    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig
