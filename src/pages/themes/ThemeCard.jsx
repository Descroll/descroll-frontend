const ThemeCard = ({ theme, onPreview, onPurchase, onApply }) => {
    return (
        <div className="card theme-card">
        <div>
            <div
            style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: theme.previewColor,
                marginBottom: 6,
                border: theme.active ? "3px solid #1a1a1a" : "3px solid transparent",
            }}
            />
            <h4 style={{ margin: 0 }}>{theme.name}</h4>
            {theme.active && (
            <small style={{ color: "#52b788" }}>Active</small>
            )}
            {!theme.is_free && (
            <small style={{ color: "#888" }}>
                {theme.purchased ? "Owned" : `$${Number(theme.price).toFixed(2)}`}
            </small>
            )}
            {theme.is_free && <small style={{ color: "#888" }}>Free</small>}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
            <button className="button" onClick={() => onPreview(theme)}>
            Preview
            </button>

            {(theme.purchased || theme.is_free) ? (
            <button
                className="button"
                onClick={onApply}
                disabled={theme.active}
                style={{ opacity: theme.active ? 0.5 : 1 }}
            >
                {theme.active ? "Applied" : "Apply"}
            </button>
            ) : (
            <button className="purchase-btn" onClick={onPurchase}>
                ${Number(theme.price).toFixed(2)}
            </button>
            )}
        </div>
        </div>
    );
};

export default ThemeCard;