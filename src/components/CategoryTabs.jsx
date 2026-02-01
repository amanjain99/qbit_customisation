import { CATEGORIES } from '../data/assets';

export function CategoryTabs({ activeCategory, onCategoryChange, selections }) {
  return (
    <div className="category-tabs">
      {CATEGORIES.map(category => {
        const isActive = activeCategory === category.id;
        // Check for full costume selection for limited category
        const hasSelection = category.id === 'limited' 
          ? selections.fullCostume !== null 
          : selections[category.id] !== null;
        const isLimited = category.id === 'limited';
        
        return (
          <button
            key={category.id}
            className={`category-tab ${isActive ? 'active' : ''} ${hasSelection ? 'has-selection' : ''} ${isLimited ? 'limited-tab' : ''}`}
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

