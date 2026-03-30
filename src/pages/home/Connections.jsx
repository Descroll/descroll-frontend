import React from "react";
import "./ConnectionsPage.css";
import AcceptButton from "../../components/ui/AcceptButton";
import RejectButton from "../../components/ui/RejectButton";
import BottomNav from "../components/navigation/BottomNav";

const requests = [
  {
    id: 1,
    username: "username1234",
    bio: "hello!! sample bio here",
  },
  {
    id: 2,
    username: "123username",
    bio: "hello!! sample bio here",
  },
];

const ConnectionsPage = () => {
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
          {requests.map((user) => (
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
      </div>

      <BottomNav />
    </div>
  );
};

export default ConnectionsPage;