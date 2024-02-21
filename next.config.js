/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }, {hostname: "lh3.googleusercontent.com"}, {hostname: "tr.rbxcdn.com"}, {hostname: "static.wikia.nocookie.net"}],
  },
}
