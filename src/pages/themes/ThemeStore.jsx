import { useState } from "react";
import ThemeCard from "../ThemeCard";
import ThemePreview from "../ThemePreview";
import Navbar from "../components/navigation/BottomNav";

const themes = [
  { name: "Default", active: true, previewColor: "#cfd3ff" },
  { name: "Dark Mode", active: false, previewColor: "#2c2f4a" },
  { name: "Ocean", active: false, previewColor: "#4ac0ff" },
];

const ThemeStore = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <div className="phone">
      <div>
        <div className="header">Themes</div>

        {themes.map((theme, i) => (
          <ThemeCard
            key={i}
            theme={theme}
            onPreview={setSelectedTheme}
          />
        ))}

        <button className="button" style={{ marginTop: "10px" }}>
          View More...
        </button>
      </div>

      <Navbar />

      <ThemePreview
        theme={selectedTheme}
        onClose={() => setSelectedTheme(null)}
      />
    </div>
  );
};

export default ThemeStore;