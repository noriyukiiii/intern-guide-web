/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ["utfs.io", "ui-avatars.com"], // ✅ เพิ่ม utfs.io เข้าไปที่นี่
  },
};

module.exports = nextConfig;
