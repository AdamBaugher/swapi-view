// TableHeader.tsx
import React from "react";
import { displayConfig } from "../../../types/Resource.ts";

interface TableHeaderProps {
  resourceType: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({ resourceType }) => {
  const propertiesToShow = displayConfig[resourceType] || [];

  return (
    <>
      {propertiesToShow.map((key) => (
        <th
          key={key}
          className="px-4 py-3 border-b bg-gray-200 text-left font-semibold text-sm text-gray-700"
        >
          {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the first letter */}
        </th>
      ))}
      <th
        key={-1}
        className="px-4 py-3 border-b bg-gray-200 text-left font-semibold text-sm text-gray-700"
      >
        Details {/* "Details" column header */}
      </th>
    </>
  );
};

export default TableHeader;
