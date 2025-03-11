import React from "react";

const Author: React.FC<{ author: string; sourceName: string }> = ({
  author,
  sourceName,
}) => {
  return (
    <small className="text-right flex flex-col md:flex-row gap-1">
      <span>{author && " by " + author}</span>
      <span>{sourceName && " at " + sourceName}</span>
    </small>
  );
};

export default Author;
