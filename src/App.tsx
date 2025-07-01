import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { CanvasProvider, useCanvas } from './renderer/context/CanvasContext';
import DraggableWidget from './renderer/components/DraggableWidget';

function CanvasSidebar() {
  const { state, dispatch } = useCanvas();
  const [canvasName, setCanvasName] = useState('');

  const createCanvas = () => {
    if (canvasName.trim()) {
      dispatch({ type: 'ADD_CANVAS', name: canvasName.trim() });
      setCanvasName('');
    }
  };

  return (
    <div className='sidebar'>
      <div className='new-canvas-input'>
        <input
          type='text'
          value={canvasName}
          placeholder='Canvas name'
          onChange={(e) => setCanvasName(e.target.value)}
        />
        <button onClick={createCanvas}>+ Add</button>
      </div>
      <ul>
        {state.canvases.map(canvas => (
          <li
            key={canvas.id}
            style={{ fontWeight: state.activeCanvasId === canvas.id ? 'bold' : 'normal' }}
            onClick={() => dispatch({ type: 'SET_ACTIVE_CANVAS', id: canvas.id })}
          >
            {canvas.name}
            <button onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: 'DELETE_CANVAS', id: canvas.id });
            }} style={{ marginLeft: '10px' }}>
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WidgetSettings({ selectedWidgetId, onClose }: { selectedWidgetId: string; onClose: () => void }) {
  const { state, dispatch } = useCanvas();
  const canvas = state.canvases.find(c => c.id === state.activeCanvasId);
  const widget = canvas?.widgets.find(w => w.id === selectedWidgetId);

  if (!widget) return null;

  function stripHtmlTags(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function decodeHTMLEntities(text: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = text;
  return txt.value;
}


  const updateConfig = (field: string, value: any) => {
    dispatch({
      type: 'UPDATE_WIDGET',
      canvasId: canvas.id,
      widget: {
        ...widget,
        config: {
          ...widget.config,
          [field]: value,
        },
      },
    });
  };

  return (
    <div style={{ width: '300px', background: '#2c2c2c', padding: '1rem', borderLeft: '1px solid #444', color: '#fff' }}>
      <h3>Widget Settings</h3>
      <button onClick={onClose} style={{ marginBottom: '1rem', background: '#555', color: '#fff', padding: '0.3rem 0.75rem', border: 'none', borderRadius: '4px' }}>Close</button>
      {widget.type === 'text' && (
        <textarea
          value={decodeHTMLEntities(stripHtmlTags(widget.config?.value || ''))}
          onChange={(e) => updateConfig('value', e.target.value)}
          rows={6}
          style={{ width: '100%', background: '#111', color: '#fff', border: '1px solid #666', borderRadius: '4px' }}
        />
      )}
      {widget.type === 'image' && (
        <input
          type='text'
          placeholder='Image URL'
          value={widget.config?.src || ''}
          onChange={(e) => updateConfig('src', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', background: '#111', color: '#fff', border: '1px solid #666', borderRadius: '4px' }}
        />
      )}
      {widget.type === 'table' && (
        <p style={{ fontSize: '0.875rem', color: '#aaa' }}>
          Table cells are editable directly in the widget.
        </p>
      )}
    </div>
  );
}

function CanvasWorkspace() {
  const { state, dispatch } = useCanvas();
  const activeCanvas = state.canvases.find(c => c.id === state.activeCanvasId);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const addWidget = (type: 'text' | 'image' | 'table') => {
    if (!activeCanvas) return;
    const newWidget = {
      id: uuidv4(),
      type,
      config: type === 'text'
        ? { value: '' }
        : type === 'image'
        ? { src: 'https://via.placeholder.com/300x200?text=Image+Widget' }
        : { rows: [['Editable Cell']] },
      position: { x: 50, y: 50 },
      size: { width: 300, height: 200 },
    };
    dispatch({ type: 'ADD_WIDGET', canvasId: activeCanvas.id, widget: newWidget });
  };

  if (!activeCanvas) return <div className='workspace'>No canvas selected</div>;

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <div className='workspace'>
        <div className='toolbar'>
          <button onClick={() => addWidget('text')}>+ Text Widget</button>
          <button onClick={() => addWidget('image')}>+ Image Widget</button>
          <button onClick={() => addWidget('table')}>+ Table Widget</button>
        </div>
        <div className='canvas-area'>
          {activeCanvas.widgets.map(widget => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              onUpdate={w => dispatch({ type: 'UPDATE_WIDGET', canvasId: activeCanvas.id, widget: w })}
              onSelect={setSelectedWidgetId}
              onRemove={w => dispatch({ type: 'REMOVE_WIDGET', canvasId: activeCanvas.id, widgetId: w})}
            />
          ))}
        </div>
      </div>
      {selectedWidgetId && <WidgetSettings selectedWidgetId={selectedWidgetId} onClose={() => setSelectedWidgetId(null)} />}
    </div>
  );
}

function App() {
  return (
    <CanvasProvider>
      <div className='app-container'>
        <CanvasSidebar />
        <CanvasWorkspace />
      </div>
    </CanvasProvider>
  );
}

export default App;