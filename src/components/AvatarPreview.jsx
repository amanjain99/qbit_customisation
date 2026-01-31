import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { LAYER_ORDER, EXPRESSIONS } from '../data/assets';
import { QbitBaseSVG } from './QbitBaseSVG';

export function AvatarPreview({ selections, onReset, onRandomize, skinTone, expression }) {
  const avatarRef = useRef(null);

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
          
          {/* Base avatar body - always visible with dynamic skin tone */}
          <div className="avatar-layer base-layer" style={{ zIndex: 1 }}>
            <QbitBaseSVG skinTone={skinTone} />
          </div>
          
          {/* Expression face - rendered as separate layer on top of body */}
          {expression && (
            <img
              key={`expression-${expression}`}
              src={EXPRESSIONS.find(e => e.id === expression)?.file || '/assets/expressions/basic.svg'}
              alt="Expression"
              className="avatar-layer expression-layer"
              style={{ zIndex: 2 }}
              draggable={false}
            />
          )}
          
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

