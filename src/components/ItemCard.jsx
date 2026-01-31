export function ItemCard({ item, isSelected, onSelect }) {
  return (
    <button
      className={`item-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(item)}
      title={item.name}
    >
      <div className="item-preview">
        <img 
          src={item.file} 
          alt={item.name}
          draggable={false}
        />
      </div>
      <span className="item-name">{item.name}</span>
      {isSelected && (
        <div className="selected-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  );
}

