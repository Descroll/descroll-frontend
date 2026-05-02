const ThemePreview = ({ theme, onClose, onPurchase, onApply }) => {
  if (!theme) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{theme.name} Preview</h3>
        {theme.description && (
          <p style={{
            color: "#666",
            fontSize: "0.9rem",
            margin: "4px 0 12px"
          }}>{theme.description}</p>
        )}

        <div
          style={{
            height: 120,
            borderRadius: 20,
            background: theme.previewColor,
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        <button
          className="button"
          style={{ marginTop: "15px" }}
          onClick={onClose}
        >
          Close
        </button>

        {(theme.purchased || theme.is_free) ? (
            <button
              className="button"
              onClick={() => { onApply(theme.id); onClose(); }}
              disabled={theme.active}
            >
              {theme.active ? "Applied" : "Apply"}
            </button>
          ) : (
            <button
              className="purchase-btn"
              onClick={() => { onPurchase(theme.id); onClose(); }}
            >
              Buy · ${Number(theme.price).toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;