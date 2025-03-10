"use client";
import moment from "moment-timezone";
moment.tz.setDefault("UTC");
import React from "react";

const PublishedAt: React.FC<{ date: Date }> = ({ date }) => {
  if (!date) return null;

  date = new Date(date);
  const timeAgo = moment(date).fromNow();

  return (
    <small className="tooltip">
      {timeAgo}
      <span className="tooltiptext">{moment(date).format("lll")}</span>
    </small>
  );
};

export default PublishedAt;
