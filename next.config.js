/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
}

// module.exports = {
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = {fs: false};
//     return config
//   },
// }
