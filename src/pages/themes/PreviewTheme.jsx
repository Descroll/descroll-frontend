const ThemePreview = ({ theme, onClose }) => {
  if (!theme) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{theme.name} Preview</h3>

        <div style={{
          height: "150px",
          borderRadius: "20px",
          background: theme.previewColor
        }} />

        <button
          className="button"
          style={{ marginTop: "15px" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThemePreview;