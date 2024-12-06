import React from "react";

interface CategoryListProps {
  categories: string[];
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
}
  
const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, handleCategoryClick }) => {
  return (
    <ul className="mb-4 flex space-x-2">
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => handleCategoryClick(category)} // Handle category selection
          className={`px-4 py-2 rounded cursor-pointer ${
            selectedCategory === category
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalize first letter */}
        </li>
      ))}
    </ul>
  );
};
  
export default CategoryList;
  