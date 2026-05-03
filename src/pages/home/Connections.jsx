import { useState, useEffect } from "react";
import "./ConnectionsPage.css";
import AcceptButton from "../../components/ui/AcceptButton";
import RejectButton from "../../components/ui/RejectButton";
import BottomNav from "../../components/navigation/BottomNav";
import usePagination from "../../components/post/usePagination";
import { apiFetch } from "../../api";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests]       = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/connections/pending`);
      if (!res.ok) throw new Error("Failed to load requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError("Could not load requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/connections`);
      if (!res.ok) throw new Error("Failed to load connections");
      const data = await res.json();
      setConnections(data);
    } catch (err) {
      console.error(err);
      setError("Could not load connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
    setSearchTerm("");
    setSearchResults([]);
    setHasSearched(false);
    if (activeTab === "requests")    fetchPending();
    if (activeTab === "connections") fetchConnections();
  }, [activeTab]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    try {
      setIsSearching(true);
      setHasSearched(true);
      //console.log("fetching:", `/connections/search?q=${encodeURIComponent(searchTerm)}`);
      const res = await apiFetch(
        `/connections/search?q=${encodeURIComponent(searchTerm)}`
      );
      console.log("response status:", res.status);
      const data = await res.json();
      console.log("search results:", data);
      if (!res.ok) throw new Error("Search failed");
      setSearchResults(data);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSendRequest = async (receiverId) => {
    try {
      const res = await apiFetch(`/connections/request`, {
        method: "POST",
        body: JSON.stringify({ receiver_id: receiverId }),
      });
      if (!res.ok) throw new Error("Failed to send request");
      // Optimistically update status in search results
      setSearchResults((prev) =>
        prev.map((u) => (u.id === receiverId ? { ...u, status: "requested" } : u))
      );
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  const handleAccept = async (requestId) => {
    console.log("handleAccept called with:", requestId);
    try {
      const res = await apiFetch(`/connections/${requestId}/accept`, {
        method: "PATCH"
      });
      if (!res.ok) throw new Error("Failed to accept");
      setRequests((prev) => prev.filter((r) => r.request_id !== requestId));
    } catch (err) {
      console.error("Error accepting request:", err);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const res = await apiFetch(`/connections/${requestId}/reject`, {
        method: "PATCH"
      });
      if (!res.ok) throw new Error("Failed to reject");
      setRequests((prev) => prev.filter((r) => r.request_id !== requestId));
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  };

  const handleRemoveConnection = async (connectionId) => {
    try {
      const res = await apiFetch(`/connections/${connectionId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to remove");
      setConnections((prev) => prev.filter((c) => c.connection_id !== connectionId));
    } catch (err) {
      console.error("Error removing connection:", err);
    }
  };

  const {
    currentPage: reqPage,
    totalPages: reqTotal,
    currentData: reqData,
    nextPage: reqNext,
    prevPage: reqPrev,
  } = usePagination(requests, 3);

  const {
    currentPage: connPage,
    totalPages: connTotal,
    currentData: connData,
    nextPage: connNext,
    prevPage: connPrev,
  } = usePagination(connections, 3);

  const isSearchActive = hasSearched;

  return (
    <div className="connections-container">
      <div className="connections-card">
        <h1 className="title">Connections</h1>
 
        {/* Search bar — always visible */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="search for users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {hasSearched ? (
            <button className="search-btn" type="button" onClick={handleClearSearch}>✕</button>
          ) : (
            <button className="search-btn" type="button" onClick={handleSearch}>🔍</button>
          )}
        </div>
 
        {/* ── Search results overlay ── */}
        {isSearchActive && (
          <div className="search-results-section">
            {isSearching && <p className="loading-text">Searching...</p>}
            {!isSearching && searchResults.length === 0 && (
              <div className="empty-search-state">
                <p>No users found</p>
                <span>Try searching another name</span>
              </div>
            )}
            {!isSearching && searchResults.map((user) => (
              <div className="user-row-card" key={user.id}>
                <div className="user-row-top">
                  <div className="user-left">
                    <div className="search-avatar" />
                    <div className="user-text">
                      <h3>{user.display_name}</h3>
                      <p>{user.bio}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`user-status-btn ${user.status || "add"}`}
                    onClick={() => handleSendRequest(user.id)}
                    disabled={(user.status || "add") !== "add"}
                  >
                    {(user.status || "add") === "add" && "+ add"}
                    {user.status === "connected"  && "connected"}
                    {user.status === "requested"  && "requested"}
                  </button>
                </div>
                <div className="user-divider" />
              </div>
            ))}
          </div>
        )}
 
        {/* ── Tabs + tab content — hidden while searching ── */}
        {!isSearchActive && (
          <>
            <div className="tabs">
              <button
                className={`tab ${activeTab === "connections" ? "active" : "inactive"}`}
                onClick={() => setActiveTab("connections")}
              >
                connections
              </button>
              <button
                className={`tab ${activeTab === "requests" ? "active" : "inactive"}`}
                onClick={() => setActiveTab("requests")}
              >
                requests
              </button>
            </div>

            {loading && <p className="loading-text">Loading...</p>}
            {error   && <p className="error-text">{error}</p>}

            {/* Requests tab */}
            {!loading && activeTab === "requests" && (
              <>
                <div className="requests-list">
                  {reqData.length === 0 ? (
                    <p className="empty-state">No pending requests</p>
                  ) : (
                    reqData.map((user) => (
                      <div className="request-card" key={user.request_id}>
                        <div className="user-info">
                          <div className="avatar"><img src={user.avatar_url} /></div>
                          <div>
                            <div className="display_name">{user.requester_display_name}</div>
                            <div className="bio">{user.requester_bio}</div>
                          </div>
                        </div>
                        <div className="actions">
                          <AcceptButton onAccept={() => handleAccept(user.request_id)} />
                          <RejectButton onReject={() => handleReject(user.request_id)} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {requests.length > 0 && (
                  <div className="pagination">
                    <button onClick={reqPrev} disabled={reqPage === 1}>◀</button>
                    <span>{reqPage} / {reqTotal}</span>
                    <button onClick={reqNext} disabled={reqPage === reqTotal}>▶</button>
                  </div>
                )}
              </>
            )}
 
            {/* Connections tab */}
            {!loading && activeTab === "connections" && (
              <>
                <div className="requests-list">
                  {connData.length === 0 ? (
                    <p className="empty-state">No connections yet — try searching for someone above!</p>
                  ) : (
                    connData.map((conn) => (
                      <div className="request-card" key={conn.connection_id}>
                        <div className="user-info">
                          <div className="avatar"><img src={conn.avatar_url} /></div>
                          <div>
                            <div className="display_name">{conn.connected_display_name}</div>
                            <div className="bio">{conn.connected_bio}</div>
                          </div>
                        </div>
                        <div className="actions">
                          <button
                            type="button"
                            className="remove-connection-btn"
                            onClick={() => handleRemoveConnection(conn.connection_id)}
                          >
                            remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {connections.length > 0 && (
                  <div className="pagination">
                    <button onClick={connPrev} disabled={connPage === 1}>◀</button>
                    <span>{connPage} / {connTotal}</span>
                    <button onClick={connNext} disabled={connPage === connTotal}>▶</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
 
      <BottomNav />
    </div>
  );
};

export default ConnectionsPage;