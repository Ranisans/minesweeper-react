import React from "react";

import "./Display.scss";

interface DProps {
  value: number;
}

const Display: React.FC<DProps> = ({ value }: DProps) => {
  return (
    <div className="display">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, "0")}`
        : value.toString().padStart(3, "0")}
    </div>
  );
};

export default Display;
