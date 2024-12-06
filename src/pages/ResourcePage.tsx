import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryList from "../components/CategoryList.tsx";
import { getCategories } from "../utils/resource.ts";

const ResourcePage: React.FC = () => {
  const { resourceType } = useParams(); // Get the resource type from URL parameters
  const [categories, setCategories] = useState<string[]>([]); // State to hold the categories
  const navigate = useNavigate(); // Use navigate to programmatically change routes
  
  // Fetch resource categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      getCategories()
        .then(data => setCategories(Object.keys(data))) // Set the categories from the response
    };
    fetchCategories(); // Call the fetchCategories function on mount
  }, []);

  // Handle category click, update the URL and reset page/search query
  const handleCategoryClick = useCallback((category: string) => {
    navigate(`/${category}`); // Navigate to the selected category
  }, [navigate]);

  return (
    <div className="p-4">
      {/* Resource Categories */}
      <CategoryList categories={categories} handleCategoryClick={handleCategoryClick} selectedCategory={resourceType || "people"} />
      
      { resourceType }
    </div>
  );
}

export default ResourcePage;
