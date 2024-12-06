// Tooltip.tsx
import React from "react";

interface TooltipProps {
  content: string;
  x: number;
  y: number;
}

const Tooltip: React.FC<TooltipProps> = ({ content, x, y }) => (
  <div
    style={{
      position: "absolute",
      top: y,
      left: x,
    }}
    className="pointer-events-none bg-black text-white text-xs p-2 rounded shadow-lg max-w-xs"
  >
    {content}
  </div>
);

export default Tooltip;
