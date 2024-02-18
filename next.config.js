/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "atomhacks.nyc3.cdn.digitaloceanspaces.com",
      "tr.rbxcdn.com",
      "static.wikia.nocookie.net",
    ],
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },
	eslint: {
    ignoreDuringBuilds: true,
},
typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  ignoreBuildErrors: true,
},
}

module.exports = nextConfig
