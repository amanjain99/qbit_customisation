import { ItemCard } from './ItemCard';
import { CostumeCard } from './CostumeCard';
import { HairColorSelector } from './HairColorSelector';
import { SkinToneSelector } from './SkinToneSelector';
import { ExpressionSelector } from './ExpressionSelector';
import { ASSETS, CATEGORIES, getHairAssets, LIMITED_COLLECTIONS } from '../data/assets';

export function ItemGrid({ 
  activeCategory, 
  selections, 
  onSelectItem, 
  onClearCategory,
  hairColor,
  onHairColorChange,
  skinTone,
  onSkinToneChange,
  expression,
  onExpressionChange
}) {
  // Get items - use dynamic hair assets if hair category is active
  const items = activeCategory === 'hair' 
    ? getHairAssets(hairColor) 
    : (ASSETS[activeCategory] || []);
  
  const selectedItem = selections[activeCategory];
  const selectedCostume = selections.fullCostume;
  const categoryInfo = CATEGORIES.find(c => c.id === activeCategory);
  const isHairCategory = activeCategory === 'hair';
  const isSkinCategory = activeCategory === 'skin';
  const isLimitedCategory = activeCategory === 'limited';

  // Limited Edition view
  if (isLimitedCategory) {
    return (
      <div className="item-grid-container limited-edition-container">
        <div className="grid-header">
          <h2 className="grid-title">
            <span className="title-icon">{categoryInfo?.icon}</span>
            {categoryInfo?.name}
          </h2>
          {selectedCostume && (
            <button className="clear-btn" onClick={() => onSelectItem('limited', selectedCostume)}>
              Remove Costume
            </button>
          )}
        </div>
        
        <hr className="limited-edition-divider" />
        
        {LIMITED_COLLECTIONS.map(collection => (
          <div key={collection.id} className="collection-section">
            <div className="collection-header">
              <h3 className="collection-title">{collection.name}</h3>
              <span 
                className="collection-badge" 
                style={{ background: collection.badgeColor }}
              >
                {collection.badge}
              </span>
            </div>
            <p className="collection-description">{collection.description}</p>
            
            <div className="costume-grid">
              {collection.items.map(item => (
                <CostumeCard
                  key={item.id}
                  item={item}
                  isSelected={selectedCostume?.id === item.id}
                  onSelect={(item) => onSelectItem('limited', item)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="item-grid-container">
      <div className="grid-header">
        <h2 className="grid-title">
          <span className="title-icon">{categoryInfo?.icon}</span>
          {categoryInfo?.name}
        </h2>
        {selectedItem && (
          <button className="clear-btn" onClick={() => onClearCategory(activeCategory)}>
            Clear Selection
          </button>
        )}
      </div>
      
      {isHairCategory && (
        <HairColorSelector 
          selectedColor={hairColor} 
          onColorChange={onHairColorChange} 
        />
      )}
      
      {isSkinCategory && (
        <>
          <SkinToneSelector 
            selectedTone={skinTone} 
            onToneChange={onSkinToneChange} 
          />
          <ExpressionSelector 
            selectedExpression={expression}
            onExpressionChange={onExpressionChange}
            skinTone={skinTone}
          />
        </>
      )}
      
      {items.length === 0 && !isSkinCategory ? (
        <div className="empty-state">
          <p>No items available in this category</p>
        </div>
      ) : (
        <div className="item-grid">
          {items.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              isSelected={selectedItem?.id === item.id}
              onSelect={(item) => onSelectItem(activeCategory, item)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
