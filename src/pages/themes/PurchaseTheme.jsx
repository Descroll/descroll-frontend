const ThemeCard = ({ theme, onPreview }) => {
  return (
    <div className="card theme-card">
      <div>
        <h4>{theme.name}</h4>
        <small>{theme.active ? "Active" : ""}</small>
      </div>

      <div>
        <button className="button" onClick={() => onPreview(theme)}>
          Preview
        </button>

        {!theme.active && (
          <button className="purchase-btn">
            Purchase
          </button>
        )}
      </div>
    </div>
  );
};

export default ThemeCard;