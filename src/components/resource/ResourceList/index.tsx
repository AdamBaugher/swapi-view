// ResourceList.tsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { displayConfig } from "../../../types/Resource.ts";
import TableHeader from "./TableHeader.tsx";
import TableRow from "./TableRow.tsx";
import Tooltip from "./Tooltip.tsx";
import { truncate } from "../../../utils/helper.ts";

interface DynamicTableProps {
  resources: any[];
  resourceType: string;
}

const ResourceList: React.FC<DynamicTableProps> = ({ resources, resourceType }) => {
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);

  const propertiesToShow = displayConfig[resourceType] || [];

  const onMouseEnter = (e: React.MouseEvent, value: string) => {
    if (value !== truncate(value)) {
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltip({
        content: value,
        x: rect.left + window.scrollX + 15,
        y: rect.bottom + window.scrollY,
      });
    }
  };

  const onMouseLeave = () => setTooltip(null);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <TableHeader resourceType={resourceType} />
          </tr>
        </thead>
        <tbody>
          {resources.map((item, index) => (
            <TableRow
              key={index}
              item={{ ...item, index }}
              resourceType={resourceType}
              propertiesToShow={propertiesToShow}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          ))}
        </tbody>
      </table>

      {tooltip && createPortal(<Tooltip {...tooltip} />, document.body)}
    </div>
  );
};

export default ResourceList;
