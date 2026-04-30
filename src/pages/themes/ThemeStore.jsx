import { useState, useEffect } from "react";
import ThemeCard from "./Card";
import ThemePreview from "./PreviewTheme";
import Navbar from "../../components/navigation/BottomNav";
import { useTheme } from "../../components/ui/ThemeContext";



const ThemeStore = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const [themes, setThemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { applyTheme } = useTheme();
  const CURRENT_USER_ID = 1; // Temporary until auth is wired

  useEffect(() => {
  const fetchThemes = async () => {
    try {
      const res = await fetch("http://localhost:5000/themes");
      if (res.ok) setThemes(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  fetchThemes();
}, []);

  const handlePurchase = async (themeId, themeName) => {
    try {
      const res = await fetch("http://localhost:5000/themes/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: CURRENT_USER_ID, theme_id: themeId }),
      });
      if (res.ok) {
        alert(`${themeName} purchased!`);
        applyTheme(themeName);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="phone">
      <div>
        <div className="header">Themes</div>

        {isLoading ? (
          <p>Loading storefront...</p>
        ) : (
          themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onPreview={setSelectedTheme}
              onBuy={() => handlePurchase(theme.id, theme.name)}
            />
          ))
        )}

        <button className="button">
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