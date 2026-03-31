import React from "react";
import "./ConnectionsPage.css";
import AcceptButton from "./AcceptButton";
import RejectButton from "./RejectButton";
import BottomNav from "./navigation/BottomNav";
import usePagination from "./usePagination";

const requests = [
  { id: 1, username: "username1234", bio: "hello!! sample bio here" },
  { id: 2, username: "123username", bio: "hello!! sample bio here" },
  { id: 3, username: "user3", bio: "bio here" },
  { id: 4, username: "user4", bio: "bio here" },
  { id: 5, username: "user5", bio: "bio here" },
  { id: 6, username: "user6", bio: "bio here" },
];

const ConnectionsPage = () => {
  const {
    currentPage,
    totalPages,
    currentData,
    nextPage,
    prevPage,
  } = usePagination(requests, 3); // show 3 per page

  const handleAccept = (id) => {
    console.log("Accepted user:", id);
  };

  const handleReject = (id) => {
    console.log("Rejected user:", id);
  };

  return (
    <div className="connections-container">
      <div className="connections-card">
        <h1 className="title">Connections</h1>

        <div className="tabs">
          <button className="tab inactive">connections</button>
          <button className="tab active">requests</button>
        </div>

        <div className="requests-list">
          {currentData.map((user) => (
            <div className="request-card" key={user.id}>
              <div className="user-info">
                <div className="avatar">👤</div>
                <div>
                  <div className="username">{user.username}</div>
                  <div className="bio">{user.bio}</div>
                </div>
              </div>

              <div className="actions">
                <AcceptButton onAccept={() => handleAccept(user.id)} />
                <RejectButton onReject={() => handleReject(user.id)} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            ◀
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            ▶
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ConnectionsPage;