const config = {
  // 网站名称
  siteTitle: "Haetek Technology", // Site title.
  // 网站简称
  siteTitleShort: "Haetek", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  // SEO名称
  siteTitleAlt: "Haetek Technology", // Alternative site title for SEO.
  // 网站logo
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  // 网址
  siteUrl: "http://kengine.haetek.com", // Domain of your website without pathPrefix.
  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  // 网站描述
  siteDescription: "知擎便是知识的引擎，由黑顿科技与中国科学院计算所联合推出，旨在整合世上所有可整合的知识，并以多种信息模态全方位呈现，打造最领先最干净最纯粹最专业的知识平台与生态型引擎。由黑顿科技自主研发的语义搜索技术以及跨模态逐帧搜索技术为知擎资源提供了全新的产品模式，譬如针对视频资源，不管用户想查什么，直接就能跳转到该视频里面讲述该知识的相关具体片段，而不是需要将整部视频聚精会神地看完才能查到。从此视频资源不再是需要依靠标题、摘要、关键词作为外壳的暗箱，而是变成了通彻透亮的百宝盒，这种模式对于非娱乐型且信息密度较高的知识类视频来说，能够极大提升用户的搜索体验，原本藏在视频深处的知识/信息变得清晰可查，知识资源的利用率得到了翻番提升。再配合深度学习等算法手段，为知擎平台添砖加瓦，做出全国最领先最干净最纯粹最专业的知识平台，让世上从此没有查不到或学不懂的知识，让知擎成为21世纪知识的代名词。", // Website description used for RSS feeds/meta description tag.
  siteKeywords: "知擎、知擎平台、知识引擎、kengine、知擎网、知擎app、黑顿知擎、知识付费、跨模态搜索、语义搜索、学术开源、知识变现、智慧教育、黑顿科技、知识生态、知识平台、逐帧搜索、什么是知擎、知擎是什么、知擎怎么样、深圳知擎、中科院知擎、学者签约、签约学者、字幕生成、裴正奇、于秋鑫",
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "Gatsby Advanced Starter RSS feed", // Title of the RSS feed
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  googleAnalyticsID: "UA-150406661-2", // GA tracking ID.
  disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  postsPerPage: 4, // Amount of posts displayed per listing page.
  userName: "Advanced User", // Username to display in the author segment.
  userEmail: "AdvancedUser@example.com", // Email used for RSS feed's author segment
  userTwitter: "", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "North Pole, Earth", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription:
    "Yeah, I like animals better than people sometimes... Especially dogs. Dogs are the best. Every time you come home, they act like they haven't seen you in a year. And the good thing about dogs... is they got different dogs for different people.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Vagr9K/gatsby-advanced-starter",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/Vagr9K",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:vagr9k@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "All Rights Reserved. © 2020. KEngine", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
