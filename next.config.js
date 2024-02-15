/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },
	eslint: {
    ignoreDuringBuilds: true,
},
}

module.exports = nextConfig
