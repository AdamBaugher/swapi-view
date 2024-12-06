import { extractResourceTypeFromUrl } from "./helper.ts";

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

// Function to fetch the details of a specific resource by ID
export const getResourceDetails = async (resourceType: string, resourceId: string) => {
  return await request(`${root}/${resourceType}/${resourceId}`);
}

// Helper function to populate related resources in an object, handling URLs in array or string format
const populateSingle = async (path: string, obj: any) => {
  // If the property is an array and contains URLs, fetch and populate data for each URL
  if (Array.isArray(obj[path]) && obj[path].length) {
    obj[path] = [ extractResourceTypeFromUrl(obj[path][0]), ...await Promise.all((obj[path] as string[]).map(url => request(url))) ];
    return this;
  }

  // If the property is a URL, fetch and populate data for that URL
  if (String(obj[path]).indexOf('http') === 0 && path !== 'url')
    obj[path] = [ extractResourceTypeFromUrl(obj[path]), await request((obj[path] as string)) ];

  return this;
}

// Function to populate related resources in all properties of an object
export const populateAll = async (obj: any) => {
  // Iterate over all properties of the object and populate them
  await Promise.all(Object.keys(obj).map(path => populateSingle(path, obj)));
  return obj;
}
