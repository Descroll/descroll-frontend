import { useState, useEffect } from "react";
import ThemeCard from "./ThemeCard";
import ThemePreview from "./PreviewTheme";
import { useTheme } from "../../components/ui/ThemeContext";
import { apiFetch } from "../../api";
import BottomNav from "../../components/navigation/BottomNav";

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
    <div className="phone">
      <div>
        <div className="header">Themes</div>

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