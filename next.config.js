/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
        SITE_TITLE: process.env.SITE_TITLE,
        SITE_DESCRIPTION: process.env.SITE_DESCRIPTION,
        BASE_URL_API: process.env.BASE_URL_API,
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/**',
            },
        ],
    },
}

module.exports = nextConfig
