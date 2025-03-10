import React from "react";
import ToggleDarkModeButton from "./ToggleDarkModeButton";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl">Uai News</h1>
      <div className="flex justify-end items-center gap-2">
        <ToggleDarkModeButton />
      </div>
    </div>
  );
};

export default Header;
