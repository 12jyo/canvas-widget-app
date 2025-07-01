import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditorWidget({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div style={{ height: '100%', backgroundColor: '#fff', borderRadius: '6px', overflow: 'hidden', color: '#000' }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        style={{ height: '100%', border: 'none', color: '#000' }}
        theme="snow"
      />
    </div>
  );
}