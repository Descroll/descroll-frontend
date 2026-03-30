import BottomNav from "../../components/navigation/BottomNav";
import "../../styles/settings.css";
//import { useTheme } from "../../"; will be the theme logic 
function Settings() {

    //const {theme, toggleTheme} = useTheme();

    return (
        <div className="settings-page">
            <div className="settings-card">
                <div className="settings-header">
                    <h2>settings</h2>
                </div>

                <div className="settings-body">
                    <div className="settings-section">
                        <h3>account</h3>
                        <p>profile, password, etc</p>
                    </div>

                    <div className="settings-section">
                        <h3>preferences</h3>

                        <div className="settings-row">
                            <span>Theme</span>

                            <p><button className="toggle-btn">dark mode</button></p>

                            {/*<button onClick={toggleTheme} className="toggle-btn">
                                {theme === "light" ? "dark mode" : "light mode"}
                            </button> */}

                        </div>
                        
                    </div>
                </div>

                <BottomNav />

            </div>
        </div>
    );

}
export default Settings;