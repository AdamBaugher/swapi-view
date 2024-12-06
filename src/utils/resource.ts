// Setting up cache for localStorage and defining a cache prefix
const cache = window.localStorage;
const prefix = 'swCache'

// Root API endpoint for SWAPI
const root = `https://swapi.dev/api/`;

// Function to handle API requests with caching
async function request(url: string) {
  // Check if data is already cached
  const cached = cache.getItem(`${prefix}.${url}`);
  if (cached) {
    return JSON.parse(cached); // Return cached data if present
  }

  // Setting request headers for the API call
  const headers: RequestInit = {
    "headers": {
      "accept": "application/json"
    }
  };

  // Fetch data from the API and parse the JSON response
  const result = await fetch(url, headers).then(res => res.json());

  // Cache the result for future use
  cache.setItem(`${prefix}.${url}`, JSON.stringify(result));

  return result;
}

// Function to get all categories from the root API
export const getCategories = async () => {
  return await request(`${root}`);
}

// Function to get resources based on the type, page number, and search query
export const getResources = async (resourcesType: string, page: number, searchQuery: string) => {
  return await request(`${root}/${resourcesType}/?page=${page}${searchQuery ? `&search=${searchQuery}` : ''}`);
}