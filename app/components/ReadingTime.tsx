import React from "react";

const ReadingTime: React.FC<{ size: number }> = ({ size }) => {
  const readingSpeedAvg = 800;
  const minutes = Math.ceil(size / readingSpeedAvg);

  return <small>{minutes} minutes read</small>;
};

export default ReadingTime;
