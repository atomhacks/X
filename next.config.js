/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }, {hostname: "lh3.googleusercontent.com"}, {hostname: "tr.rbxcdn.com"}, {hostname: "static.wikia.nocookie.net"}],
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
