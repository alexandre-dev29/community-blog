/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true, // (optional)
  exclude: [
    '/dashboard/*',
    '/dashboard',
    '/pages/dashboard',
    '/dashboard/**/*',
    '/pages/dashboard/*',
    '/pages/dashboard/**/*',
    '/server-sitemap.xml',
  ],

  sitemapSize: 7000,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.SITE_URL || 'http://localhost:3000'}/server-sitemap.xml`,
    ],
    policies: [{userAgent: '*', allow: '/', disallow: ['/dashboard']}],
  },
};
