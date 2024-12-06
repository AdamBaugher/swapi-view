// Function to extract the resource type from the URL string
// The URL is expected to have the format `/resourceType/{id}/`, and this function extracts the resource type (e.g., people, planets, etc.)
export const extractResourceTypeFromUrl = (url: string): string | undefined => {
  return url.match(/\/([^/]+)\/\d+\/$/)?.[1];
};

// Function to extract the ID from the URL string
// The URL is expected to have the format `/resourceType/{id}/`, and this function extracts the numerical ID
export const extractIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : null;
};

// Function to truncate text if it exceeds a maximum length (30 characters)
// If the text is too long, it will be truncated and ellipses will be added at the end
const MAX_CHAR_LENGTH = 30;
export const truncate = (value: string) => {
if (value.length > MAX_CHAR_LENGTH) {
  return value.slice(0, MAX_CHAR_LENGTH) + "..."; // Truncate and append ellipses
}
return value; // Return as is if text length is acceptable
};
  