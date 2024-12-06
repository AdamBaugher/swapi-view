import React from "react";
import { useParams } from "react-router-dom";

const ResourcePage: React.FC = () => {
  const { resourceType, resourceId } = useParams(); // Extract resource type and ID from URL parameters
  
  return (
    <div className="p-4">
      { resourceType }
      { resourceId }
    </div>
  );
}

export default ResourcePage;
