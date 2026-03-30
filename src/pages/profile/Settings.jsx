import BottomNav from "../../components/navigation/BottomNav";
import "../../styles/settings.css";

function Settings() {

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
                        <h3>preference</h3>
                        <p>themes here</p>
                    </div>
                </div>

                <BottomNav />

            </div>
        </div>
    );

}
export default Settings;