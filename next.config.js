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
        EDITOR_API_KEY: process.env.EDITOR_API_KEY,
        PASSING_DEGREE_IN_ELEMENTARY: process.env.PASSING_DEGREE_IN_ELEMENTARY,
        TITLE_ELEMENTARY: process.env.TITLE_ELEMENTARY,
        TITLE_MIDDLE: process.env.TITLE_MIDDLE,
        TITLE_HIGH: process.env.TITLE_HIGH,
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
