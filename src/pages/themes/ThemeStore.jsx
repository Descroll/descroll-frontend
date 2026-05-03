import { useState, useEffect } from "react";
import ThemeCard from "./ThemeCard";
import ThemePreview from "./PreviewTheme";
import { useTheme } from "../../components/ui/ThemeContext";
import { apiFetch } from "../../api";
import BottomNav from "../../components/navigation/BottomNav";
import "./theme-store.css";

const ThemeStore = () => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { applyTheme } = useTheme();

  useEffect(() => {
  const fetchThemes = async () => {
    try {
      const res = await apiFetch("/themes");
      if (!res.ok) throw new Error("Failed to load themes");
      setThemes(await res.json());
    } catch (err) {
      console.error(err);
      setError("Could not load themes.");
    } finally {
      setIsLoading(false);
    }
  };
  fetchThemes();
}, []);

  const handlePurchase = async (themeId) => {
    try {
      const res = await apiFetch(`/themes/${themeId}/purchase`, {
        method: "POST"
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Purchase failed");
      }

      setThemes((prev) => 
      prev.map((t) => (t.id === themeId ? {...t, purchases: true} : t))
    );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleApply = async (themeId) => {
    try {
      const res = await apiFetch(`/me/themes/${themeId}/apply`, {
        method: "PATCH",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to apply theme");
      }
      const result = await res.json();
      console.log('ThemeStore.handleApply: API response =', result);

      applyTheme(result);

      setThemes((prev) =>
        prev.map((t) => ({
          ...t,
          active: t.id === themeId,
        }))
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="theme-store-page">
      <div className="theme-store-card">
        <div className="theme-store-header">
          <h2>Themes</h2>
        </div>
        <div className="theme-store-body"> 

        {error && <p style={{color:"red", padding: "10px"}}>{error}</p>}

        {isLoading ? (
          <p>Loading storefront...</p>
        ) : (
          themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              onPreview={setSelectedTheme}
              onPurchase={() => handlePurchase(theme.id)}
              onApply={() => handleApply(theme.id)}
            />
          ))
        )}

        {/*<button className="button">
          View More...
        </button>*/}
      </div>
    </div>
      <BottomNav />

      <ThemePreview
        theme={selectedTheme}
        onClose={() => setSelectedTheme(null)}
        onPurchase={handlePurchase}
        onApply={handleApply}
      />
    </div>
  );
};

export default ThemeStore;