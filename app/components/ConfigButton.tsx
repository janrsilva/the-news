import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const ConfigButton: React.FC = () => {
  return (
    <button>
      <FontAwesomeIcon icon={faGear} />
    </button>
  );
};

export default ConfigButton;
