// TableRow.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { extractIdFromUrl, truncate } from "../../../utils/helper.ts";

interface TableRowProps {
  item: any;
  resourceType: string;
  propertiesToShow: string[];
  onMouseEnter: (e: React.MouseEvent, value: string) => void;
  onMouseLeave: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  resourceType,
  propertiesToShow,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();
  
  const handleDetailsClick = () => {
    const detailsUrl = `/${resourceType}/${extractIdFromUrl(item.url)}`;
    navigate(detailsUrl);
  };

  return (
    <tr
      className={`${
        item.index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } hover:bg-gray-100`}
    >
      {propertiesToShow.map((key) => (
        <td
          key={key}
          className="relative px-4 py-2 border-b text-sm text-gray-700"
          onMouseEnter={(e) => onMouseEnter(e, String(item[key]))}
          onMouseLeave={onMouseLeave}
        >
          <span>
            {Array.isArray(item[key]) ? "..." : truncate(String(item[key]))}
          </span>
        </td>
      ))}
      <td className="px-4 py-2 border-b text-sm text-gray-700">
        <button
          onClick={handleDetailsClick}
          className="text-blue-500 hover:underline"
        >
          Details
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
