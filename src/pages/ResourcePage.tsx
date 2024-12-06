import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryList from "../components/ui/CategoryList.tsx";
import ResourceList from "../components/resource/ResourceList/index.tsx";
import Pagination from "../components/common/Pagination.tsx";
import Loading from "../components/common/Loading.tsx";
import { getCategories, getResources } from "../utils/resource.ts";

const ResourcePage: React.FC = () => {
  const { resourceType } = useParams(); // Get the resource type from URL parameters
  const [categories, setCategories] = useState<string[]>([]); // State to hold the categories
  const [resources, setResources] = useState([]); // State to hold the fetched resources
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [totalPages, setTotalPages] = useState(1); // State to store the total number of pages
  const [searchQuery, setSearchQuery] = useState(""); // State for storing search query
  const [searchInput, setSearchInput] = useState(""); // State for the search input value
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // Error handling state
  const navigate = useNavigate(); // Use navigate to programmatically change routes
  
  // Fetch resource categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null); // Reset error before fetching
      getCategories()
        .then(data => setCategories(Object.keys(data))) // Set the categories from the response
        .catch(err => setError("Failed to fetch categories. Please try again.")) // Handle errors
        .finally(() => setLoading(false)); // Turn off loading indicator
    };
    fetchCategories(); // Call the fetchCategories function on mount
  }, []);

  // Fetch resources based on the current page and search query
  const fetchResources = useCallback(
    (page: number, searchQuery: string) => {
      setLoading(true);
      setError(null); // Reset error before fetching
      getResources(resourceType || "people", page, searchQuery)
        .then((data) => {
          setResources(data.results); // Set fetched resources
          setTotalPages(Math.ceil(data.count / 10)); // Calculate total pages based on count
        })
        .catch(() => {
          setError("Failed to fetch resources. Please try again."); // Handle errors
        })
        .finally(() => setLoading(false)); // Turn off loading indicator
    },
    [resourceType] // Re-run the effect when resourceType changes
  );

  // Fetch resources whenever currentPage, resourceType, or searchQuery changes
  useEffect(() => {
    fetchResources(currentPage, searchQuery);
  }, [fetchResources, resourceType, currentPage, searchQuery]);

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search input key press (e.g., on Enter)
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCurrentPage(1); // Reset to the first page when a search is made
      setSearchQuery(searchInput); // Update search query
    }
  };

  // Handle changes in the search input field
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value); // Update the search input value
  };


  // Handle category click, update the URL and reset page/search query
  const handleCategoryClick = useCallback((category: string) => {
    navigate(`/${category}`); // Navigate to the selected category
  }, [navigate]);

  
  // Show loading state while fetching data
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {/* Error Alert */}
      {error && (
        <div
          className="mb-4 p-4 text-red-800 bg-red-100 border border-red-200 rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Resource Categories */}
      <CategoryList categories={categories} handleCategoryClick={handleCategoryClick} selectedCategory={resourceType || "people"} />
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleSearchChange} // Handle input changes
        onKeyDown={handleSearchKeyPress} // Trigger search on Enter key press
        className="mb-4 p-2 border rounded"
      />

      {/* Display message if no results are found */}
      {resources.length === 0 && !error ? (
        <div className="text-center text-xl text-gray-500 py-10">
          No results found
        </div>
      ) : (
        !error && (
          <>
            {/* Display resource list and pagination */}
            <ResourceList
              resources={resources}
              resourceType={resourceType || "people"}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange} // Handle page change for pagination
            />
          </>
        )
      )}
    </div>
  );
}

export default ResourcePage;
