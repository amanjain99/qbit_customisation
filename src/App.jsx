import { AvatarPreview } from './components/AvatarPreview';
import { CategoryTabs } from './components/CategoryTabs';
import { ItemGrid } from './components/ItemGrid';
import { AdCarousel } from './components/AdCarousel';
import { useAvatarState } from './hooks/useAvatarState';
import { ASSETS } from './data/assets';

function App() {
  const {
    selections,
    activeCategory,
    setActiveCategory,
    selectItem,
    clearCategory,
    resetAll,
    randomize,
    hairColor,
    changeHairColor,
    skinTone,
    changeSkinTone,
    expression,
    changeExpression,
    purchasedItems,
    purchaseItem,
  } = useAvatarState();

  const handleRandomize = () => randomize(ASSETS);

  return (
    <div className="app">
      {/* Animated blob background */}
      <div className="blob-container">
        <div className="blob blob-red"></div>
        <div className="blob blob-yellow"></div>
        <div className="blob-blue-layer"></div>
        {/* Particle effects */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>
      <main className="app-main">
        <aside className="editor-panel">
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            selections={selections}
          />
          <section className="customization-section">
            <ItemGrid 
              activeCategory={activeCategory}
              selections={selections}
              onSelectItem={selectItem}
              onClearCategory={clearCategory}
              hairColor={hairColor}
              onHairColorChange={changeHairColor}
              skinTone={skinTone}
              onSkinToneChange={changeSkinTone}
              expression={expression}
              onExpressionChange={changeExpression}
            />
          </section>
        </aside>

        <section className="preview-section">
          <AdCarousel
            onPurchase={purchaseItem}
            onApply={selectItem}
          />
          <AvatarPreview 
            selections={selections}
            onReset={resetAll}
            onRandomize={handleRandomize}
            skinTone={skinTone}
            expression={expression}
            activeCategory={activeCategory}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
