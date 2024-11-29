/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "imgur.com"],
        remotePatterns: [{
            protocol: "https",
            hostname: "cdn.sanity.io",
            port: "",
        }, ],
    },
};

module.exports = nextConfig;