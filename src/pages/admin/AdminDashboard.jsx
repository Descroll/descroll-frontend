import Card from "../themes/Card";
import Navbar from "../components/navigation/BottomNav";

const Dashboard = () => {
  return (
    <div className="phone">
      <div>
        <div className="header">Admin Dash</div>

        <div className="grid">
          <Card className="stat-card" />
          <Card className="stat-card" />
          <Card className="stat-card" />
          <Card className="stat-card" />
        </div>

        <div className="card activity">
          <b>Recent Activity →</b>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Dashboard;