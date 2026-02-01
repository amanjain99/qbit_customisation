import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { LAYER_ORDER } from '../data/assets';
import { QbitBaseSVG } from './QbitBaseSVG';
import { ExpressionSVG } from './ExpressionSVG';

// Map expression ids to ExpressionSVG expression keys
const EXPRESSION_ID_MAP = {
  'basic': 'basic',
  'chibi': 'chibihead',
  'surprise': 'surprisehead',
  'happy': 'happyhead',
};

export function AvatarPreview({ selections, onReset, onRandomize, skinTone, expression }) {
  const avatarRef = useRef(null);
  const hasFullCostume = selections.fullCostume !== null;
  const expressionKey = EXPRESSION_ID_MAP[expression] || 'basic';

  const handleExport = useCallback(async () => {
    if (!avatarRef.current) return;
    
    try {
      const canvas = await html2canvas(avatarRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      const link = document.createElement('a');
      link.download = 'my-qbit-avatar.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to export avatar:', error);
    }
  }, []);

  return (
    <div className="avatar-preview-container">
      <div className="avatar-frame">
        <div className="avatar-canvas" ref={avatarRef}>
          {/* If a full costume is selected, render only the costume with skin tone base */}
          {hasFullCostume ? (
            <>
              {/* Base body (without head) - dynamic skin tone */}
              <div className="avatar-layer base-layer" style={{ zIndex: 1 }}>
                <QbitBaseSVG skinTone={skinTone} includeHead={false} />
              </div>
              
              {/* Expression/Face layer - dynamic skin tone and expression */}
              <div className="avatar-layer expression-layer" style={{ zIndex: 2 }}>
                <ExpressionSVG expressionId={expressionKey} skinTone={skinTone} />
              </div>
              
              {/* Full costume layer - covers everything except face */}
              <img
                src={selections.fullCostume.file}
                alt={selections.fullCostume.name}
                className="avatar-layer full-costume-layer"
                style={{ zIndex: 10 }}
                draggable={false}
              />
            </>
          ) : (
            <>
              {/* Backpack layer - behind base avatar */}
              {selections.backpack && (
                <img
                  src={selections.backpack.file}
                  alt={selections.backpack.name}
                  className="avatar-layer"
                  style={{ zIndex: 0 }}
                  draggable={false}
                />
              )}
              
              {/* Base body (without head) - dynamic skin tone */}
              <div className="avatar-layer base-layer" style={{ zIndex: 1 }}>
                <QbitBaseSVG skinTone={skinTone} includeHead={false} />
              </div>
              
              {/* Expression/Face layer - dynamic skin tone and expression */}
              <div className="avatar-layer expression-layer" style={{ zIndex: 2 }}>
                <ExpressionSVG expressionId={expressionKey} skinTone={skinTone} />
              </div>
              
              {/* Render other layers in order (excluding backpack) */}
              {LAYER_ORDER.filter(id => id !== 'backpack').map((categoryId, index) => {
                const selected = selections[categoryId];
                if (!selected) return null;
                
                return (
                  <img
                    key={categoryId}
                    src={selected.file}
                    alt={selected.name}
                    className="avatar-layer"
                    style={{ zIndex: index + 3 }}
                    draggable={false}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
      
      <div className="avatar-actions">
        <button className="action-btn randomize-btn" onClick={onRandomize}>
          <span className="btn-icon">🎲</span>
          Randomize
        </button>
        <button className="action-btn reset-btn" onClick={onReset}>
          <span className="btn-icon">↺</span>
          Reset
        </button>
        <button className="action-btn export-btn" onClick={handleExport}>
          <span className="btn-icon">⬇</span>
          Download
        </button>
      </div>
    </div>
  );
}

