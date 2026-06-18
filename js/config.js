/* 
   ============================================
   CONFIG.JS — News Feed Configuration
   ============================================
*/

const NEWS_API_CONFIG = {
  // Using a free open-source proxy for NewsAPI that doesn't require an API key
  // and works on GitHub Pages!
  apiKey: "",

  // Base URL for the NewsAPI proxy
  baseUrl: "https://saurav.tech/NewsAPI",

  // Default country for top headlines (us, in, au, ru, fr, gb)
  defaultCountry: "us",

  // Default page size (number of articles per request) - Note: Proxy returns all results
  pageSize: 12
};
