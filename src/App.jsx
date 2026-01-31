import { AvatarPreview } from './components/AvatarPreview';
import { CategoryTabs } from './components/CategoryTabs';
import { ItemGrid } from './components/ItemGrid';
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
  } = useAvatarState();

  const handleRandomize = () => randomize(ASSETS);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-highlight">Qbit</span> Avatar Studio
        </h1>
        <p className="app-subtitle">Create your unique character</p>
      </header>

      <main className="app-main">
        <section className="preview-section">
          <AvatarPreview 
            selections={selections}
            onReset={resetAll}
            onRandomize={handleRandomize}
            skinTone={skinTone}
            expression={expression}
          />
        </section>

        <section className="customization-section">
          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            selections={selections}
          />
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
      </main>

      <footer className="app-footer">
        <p>Click an item to equip • Click again to remove</p>
      </footer>
    </div>
  );
}

export default App;
