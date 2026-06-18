/* ============================================
   API.JS — News Feed API Functions
   ============================================
*/

// fetchTopHeadlines() - Fetches top headlines from NewsAPI
async function fetchTopHeadlines(category) {
  // Build the API URL
  let url = `${NEWS_API_CONFIG.baseUrl}/top-headlines?`;
  url += `country=${NEWS_API_CONFIG.defaultCountry}`;
  url += `&pageSize=${NEWS_API_CONFIG.pageSize}`;
  url += `&apiKey=${NEWS_API_CONFIG.apiKey}`;

  // Add category filter if provided
  if (category && category !== "general") {
    url += `&category=${category}`;
  }

  // Make the API request
  return await makeApiRequest(url);
}

// searchNews() - Searches for news articles by keyword
async function searchNews(query) {
  // Build the search API URL
  let url = `${NEWS_API_CONFIG.baseUrl}/everything?`;
  url += `q=${encodeURIComponent(query)}`;
  url += `&pageSize=${NEWS_API_CONFIG.pageSize}`;
  url += `&sortBy=publishedAt`;
  url += `&apiKey=${NEWS_API_CONFIG.apiKey}`;

  // Make the API request
  return await makeApiRequest(url);
}

// makeApiRequest() - Makes a fetch request and handles errors
async function makeApiRequest(url) {
  try {
    // Check if API key is configured
    if (NEWS_API_CONFIG.apiKey === "YOUR_API_KEY_HERE") {
      return {
        success: false,
        articles: [],
        error: "API key not configured. Please add your NewsAPI key in js/config.js. Get a free key at https://newsapi.org/"
      };
    }

    // Send the fetch request
    const response = await fetch(url);

    // Parse the JSON response
    const data = await response.json();

    // Check if the API returned an error
    if (data.status !== "ok") {
      // Handle specific API errors
      if (response.status === 401) {
        return {
          success: false,
          articles: [],
          error: "Invalid API key. Please check your NewsAPI key in js/config.js."
        };
      }

      if (response.status === 429) {
        return {
          success: false,
          articles: [],
          error: "Too many requests. Please wait a moment and try again."
        };
      }

      return {
        success: false,
        articles: [],
        error: data.message || "An error occurred while fetching news."
      };
    }

    // Check if there are no results
    if (data.articles.length === 0) {
      return {
        success: true,
        articles: [],
        error: null
      };
    }

    // Return the articles
    return {
      success: true,
      articles: data.articles,
      error: null
    };

  } catch (error) {
    // Handle network errors (no internet, server down, etc.)
    console.error("Network error:", error);
    return {
      success: false,
      articles: [],
      error: "Network error. Please check your internet connection and try again."
    };
  }
}
