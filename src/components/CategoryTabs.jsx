import { CATEGORIES } from '../data/assets';

export function CategoryTabs({ activeCategory, onCategoryChange, selections }) {
  return (
    <div className="category-tabs">
      {CATEGORIES.map(category => {
        const isActive = activeCategory === category.id;
        const hasSelection = selections[category.id] !== null;
        
        return (
          <button
            key={category.id}
            className={`category-tab ${isActive ? 'active' : ''} ${hasSelection ? 'has-selection' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="tab-icon">{category.icon}</span>
            <span className="tab-name">{category.name}</span>
            {hasSelection && <span className="selection-dot" />}
          </button>
        );
      })}
    </div>
  );
}

