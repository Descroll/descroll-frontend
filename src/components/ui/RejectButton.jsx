import React from "react";

const RejectButton = ({ onReject }) => {
  return (
    <button
      onClick={onReject}
      style={{
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Reject
    </button>
  );
};

export default RejectButton;