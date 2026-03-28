import { useState, useEffect } from "react";
import BottomNav from "../../components/navigation/BottomNav";
import "../../styles/search.css";
import "../../App.css";
import StateBox from '../../components/StateBox';

function SearchUsers() {
    //front-end only, just local data right now for testing
    const [users, setUsers] = useState([{id: 1, username: "billybob007",bio:"tis me bio here",status:"add", },{id: 2, username: "hellokitty123",bio:"tis me bio here",status:"connected", },{id: 3, username: "theopp67",bio:"tis me bio here",status:"requested", },]);

    //locally stores what is typed in search bar for now
    const [searchTerm, setSearchTerm] = useState("");

    //clicking add will change the status locally
    const handleStatusClick = (id) => {
        setUsers((prevUsers) => prevUsers.map((user) => user.id === id && user.status === "add" ? {...user, status: "requested"} : user));
    };

    //filters the locl list, backend needed
    const filteredUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));
    
    //to simulate loading for now
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>{ setTimeout(()=>{try {setLoading(false);} catch {setError(true); setLoading(false);} }, 800);}, []);

    return (
        <div className="search-page">
            <div className="search-card">
                <div className="search-header">
                    <h1>Search</h1>
                </div>

                <div className="search-body">
                    <div className="search-bar">
                        <input type="text" id="searchUsers" name="searchUsers" placeholder="search for users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                        {/*button is only for looks rn*/ }
                        <button className="search-btn" type="button">🔍</button>
                    </div>

                    <div className="search-results">

                        {loading && ( <StateBox title="loading users..."/>)}
                        {error && ( <StateBox title="something went wrong" subtitle="try aagain later"/>)}
                        {!loading && !error && filteredUsers.length === 0 && (<StateBox title="no users found" subtitle="try searching another name"/>)}
                        
                        {!loading && !error && filteredUsers.length > 0 && 
                          filteredUsers.map((user) => (
                            <div className="user-row-card" key={user.id}>
                                <div className="user-row-top">
                                    <div className="user-left">
                                        <div className="search-avatar"></div>

                                        <div className="user-text">
                                            <h3>{user.username}</h3>
                                            <p>{user.bio}</p>
                                        </div>
                                    </div>

                                    <button type="button" className={`user-status-btn ${user.status}`} onClick={() => handleStatusClick(user.id)} disabled={user.status !== "add"}>
                                        {user.status === "add" && "+ add"}
                                        {user.status === "connected" && "connected"}
                                        {user.status === "requested" && "requested"}
                                    </button>
                                </div>

                                <div className="user-divider"></div>
                            </div>
                        ))}

                    </div>
                </div>

                <BottomNav />

            </div>
        </div>
    );
}

export default SearchUsers;