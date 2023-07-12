export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Community blog",
  description: "Beautifully designed blog for handling community publications",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  keyWords: ["NextJs", "Blogs", "Community"],
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    website: "https://blogcommunity.dev",
  },
  authors: [{name: "Axel Mwenze", url: "axelmwenze.dev"}],
}
