import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResourceDetails from "../components/resource/ResourceDetails.tsx";
import { getResourceDetails, populateAll } from "../utils/resource.ts";
import Loading from "../components/common/Loading.tsx";

const ResourceDetailPage: React.FC = () => {
  const { resourceType, resourceId } = useParams(); // Extract resource type and ID from URL parameters
  const [resource, setResource] = useState(null); // State to store the fetched resource
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch resource details on component mount or when resourceType/resourceId changes
  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error before fetch

    getResourceDetails(resourceType || "people", resourceId || "1")
      .then((resource) => populateAll(resource))
      .then((resource) => setResource(resource))
      .catch(() => setError("Failed to fetch resource details. Please try again."))
      .finally(() => setLoading(false)); // Set loading to false after data fetch
  }, [resourceType, resourceId]);

  if (loading) {
    return <Loading />; // Show loading spinner while fetching data
  }

  return (
    <div className="p-4">
      {/* Show error message if there is an error */}
      {error && (
        <div className="mb-4 p-4 text-red-800 bg-red-100 border border-red-200 rounded" role="alert">
          {error}
        </div>
      )}

      {/* Display resource details if no error */}
      {!error && <ResourceDetails resource={resource} />}
    </div>
  );
};

export default ResourceDetailPage;
