"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const ConfigButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/collection");
  };

  return (
    <button onClick={handleClick} className="cursor-pointer">
      <FontAwesomeIcon icon={faGear} />
    </button>
  );
};

export default ConfigButton;
