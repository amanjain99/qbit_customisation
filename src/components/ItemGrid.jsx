import { ItemCard } from './ItemCard';
import { HairColorSelector } from './HairColorSelector';
import { SkinToneSelector } from './SkinToneSelector';
import { ExpressionSelector } from './ExpressionSelector';
import { ASSETS, CATEGORIES, getHairAssets } from '../data/assets';

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
  const categoryInfo = CATEGORIES.find(c => c.id === activeCategory);
  const isHairCategory = activeCategory === 'hair';
  const isSkinCategory = activeCategory === 'skin';

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
