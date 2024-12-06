import React from "react";
import { useParams } from "react-router-dom";

const ResourcePage: React.FC = () => {
  const { resourceType } = useParams(); // Get the resource type from URL parameters
  
  return (
    <div className="p-4">
      { resourceType }
    </div>
  );
}

export default ResourcePage;
