import React from "react";
import { useParams, Link } from "react-router-dom";
import { Resource } from "../../types/Resource.ts";
import ResourceList from "./ResourceList/index.tsx";

// Props interface for the component to accept a 'resource' object
interface ResourceDetailsProps {
  resource: Resource | null; // resource can be an object or null if not found
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resource }) => {
  // Extract 'resourceType' and 'resourceId' from URL parameters using useParams hook
  const { resourceType, resourceId } = useParams();

  // If no resource is provided, display a "Resource not found" message
  if (!resource) {
    return <p>Resource not found.</p>;
  }

  // Function to render the resource details by iterating over the resource object
  const renderDetails = () => {
    return Object.entries(resource).map(([key, value]) => (
      <div key={key} className="mb-2">
        {/* Display the key (property name) in a bold, capitalized format */}
        <span className="font-semibold capitalize">{key}: </span>
        
        <span>
          {/* If the value is an array, render it using the ResourceList component */}
          {Array.isArray(value) ? (
            <ResourceList resources={value.slice(1)} resourceType={value[0]} />
          ) : typeof value === "object" && value !== null ? (
            // If the value is an object, display it as a formatted JSON string
            JSON.stringify(value, null, 2)
          ) : (
            // For other types, convert the value to a string and display
            String(value)
          )}
        </span>
      </div>
    ));
  };

  return (
    <div className="p-4 border rounded">
      {/* Back link to return to the list of resources */}
      <Link
        to={`/${resourceType}`}
        className="text-blue-500 underline hover:text-blue-700"
      >
        Back to list
      </Link>
      
      {/* Title displaying the resource type and ID */}
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {resourceType} {resourceId} Details
      </h1>
      
      {/* Render the resource details */}
      <div className="mb-4">{renderDetails()}</div>
    </div>
  );
};

export default ResourceDetails;
