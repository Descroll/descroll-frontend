import React from "react";

const AcceptButton = ({ onAccept }) => {
  return (
    <button
      onClick={onAccept}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Accept
    </button>
  );
};

export default AcceptButton;