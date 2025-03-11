import React from "react";

const Author: React.FC<{ author: string; sourceName: string }> = ({
  author,
  sourceName,
}) => {
  return (
    <small>
      {author && " by " + author}
      {sourceName && " at " + sourceName}
    </small>
  );
};

export default Author;
