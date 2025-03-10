import React from "react";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/" className="text-2xl">
        Uai News
      </Link>
      <div className="flex justify-end items-center gap-2">
        <ToggleDarkModeButton />
      </div>
    </div>
  );
};

export default Header;
