import React from "react";

export default function SearchCard({ card = {} }) {
  const { data, match_frame, source } = card;

  return (
    <div
      style={{
        height: 138,
        backgroundColor: "#ddd",
        marginBottom: 10,
        borderRadius: 12
      }}
    >
      <div>{source}</div>
      <div>{Object.values(data).toString()}</div>
      <div>{Object.values(match_frame).toString()}</div>
    </div>
  );
}
