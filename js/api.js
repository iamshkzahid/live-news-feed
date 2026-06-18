/* ============================================
   API.JS — News Feed API Functions
   ============================================
*/

// fetchTopHeadlines() - Fetches top headlines from NewsAPI Proxy
async function fetchTopHeadlines(category) {
  // Build the API URL for the saurav.tech proxy
  const cat = category || "general";
  const url = `${NEWS_API_CONFIG.baseUrl}/top-headlines/category/${cat}/${NEWS_API_CONFIG.defaultCountry}.json`;

  // Make the API request
  const result = await makeApiRequest(url);
  
  // Apply pagination locally if needed, since proxy returns all
  if (result.success && result.articles) {
    result.articles = result.articles.slice(0, NEWS_API_CONFIG.pageSize);
  }
  
  return result;
}

// searchNews() - Searches for news articles by keyword
async function searchNews(query) {
  // Build the search API URL (Using CNN as a broad source since proxy doesn't support generic keyword search)
  const url = `${NEWS_API_CONFIG.baseUrl}/everything/cnn.json`;

  // Make the API request
  const result = await makeApiRequest(url);
  
  if (result.success && result.articles) {
    // Filter the articles manually based on the query
    const lowerQuery = query.toLowerCase();
    result.articles = result.articles.filter(article => {
      const titleMatch = article.title && article.title.toLowerCase().includes(lowerQuery);
      const descMatch = article.description && article.description.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch;
    });
    
    // Apply pagination
    result.articles = result.articles.slice(0, NEWS_API_CONFIG.pageSize);
  }
  
  return result;
}

// makeApiRequest() - Makes a fetch request and handles errors
async function makeApiRequest(url) {
  try {
    // Send the fetch request
    const response = await fetch(url);

    // Parse the JSON response
    const data = await response.json();

    // Check if the API returned an error
    if (data.status !== "ok") {
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

