/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    domains: ["utfs.io"], // ✅ เพิ่ม utfs.io เข้าไปที่นี่
  },
};

module.exports = nextConfig;
