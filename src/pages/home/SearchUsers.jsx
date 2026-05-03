import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/navigation/BottomNav";
import "../../styles/search.css";
import { apiFetch } from "../../api";

function SearchUsers() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setUsers([]);
            return;
        }
        try {
            setIsSearching(true);
            const res = await apiFetch(`/users/search?q=${searchTerm}`);
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleStatusClick = async (receiverId) => {
        try {
            const res = await apiFetch(`/connections/request`, {
                method: "POST",
                body: JSON.stringify({ receiver_id: receiverId })
            });

            if (!res.ok) throw new Error("Failed to send request");

            
            setUsers((prevUsers) => 
                prevUsers.map((user) => 
                    user.id === receiverId ? { ...user, status: "requested" } : user
                )
            );
        } catch (err) {
            console.error("Error sending connection request:", err);
        }
    };

    return (
        <div className="search-page">
            <div className="search-card">
                <div className="search-header">
                    <h1>Search</h1>
                </div>

                <div className="search-body">
                    <div className="search-bar">
                        <input 
                            type="text" 
                            id="searchUsers" 
                            name="searchUsers" 
                            placeholder="search for users..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown} 
                        />
                        {/*button works now*/ }
                        <button className="search-btn" type="button" onClick={handleSearch}>🔍</button>
                    </div>

                    <div className="search-results">
                        {users.length > 0 ? (
                        users.map((user) => (
                            <div className="user-row-card" key={user.id}>
                            <div className="user-row-top">
                                <div className="user-left">
                         
                                <div className="search-avatar"></div>

                                <div className="user-text">
                                                                        <h3>
                                                                            <Link className="user-name-link" to={`/users/${user.id}`}>
                                                                                {user.username}
                                                                            </Link>
                                                                        </h3>
                                    <p>{user.bio}</p>
                                </div>
                                </div>

                                <button 
                                    type="button" 
                                    className={`user-status-btn ${user.status || 'add'}`} 
                                    onClick={() => handleStatusClick(user.id)} 
                                    disabled={(user.status || 'add') !== "add"}
                                >
                                {(user.status || "add") === "add" && "+ add"}
                                {user.status === "connected" && "connected"}
                                {user.status === "requested" && "requested"}
                                </button>
                            </div>

                            <div className="user-divider"></div>
                            </div>
                        ))
                        ) : (
                        <div className="empty-search-state">
                            <p>No users found</p>
                            <span>Try searching another name</span>
                        </div>
                        )}
                    </div>
                </div>

                <BottomNav />

            </div>
        </div>
    );
}

export default SearchUsers;