import { useState, useEffect, useRef } from 'react';
import { registerNode } from './nodeRegistry';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

const TextNode = ({ id, data, updateNodeField }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.max(60, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [text]);

  useEffect(() => {
    const matches = text.match(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g) || [];
    const vars = [...new Set(matches.map((m) => m.slice(2, -2).trim()))];
    setVariables(vars);
    if (updateNodeField) {
      updateNodeField(id, 'variables', vars);
    }
  }, [text, id, updateNodeField]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  const dynamicHandles = variables.map((v) => ({
    id: 'input-' + v,
    type: 'target',
    position: Position.Left,
    label: v,
  }));

  const staticHandles = [
    { id: 'output', type: 'source', position: Position.Right },
  ];

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {staticHandles.map((handle, index) => (
        <Handle
          key={id + '-' + (handle.id || index)}
          id={handle.id || id + '-handle-' + index}
          type={handle.type}
          position={handle.position}
          style={{
            background: '#16a34a',
            border: '2px solid #fff',
            width: 14,
            height: 14,
            borderRadius: '50%',
            transition: 'transform 120ms ease, box-shadow 120ms ease',
          }}
          isConnectable={handle.isConnectable !== false}
        />
      ))}
      {dynamicHandles.map((handle, index) => (
        <Handle
          key={id + '-' + handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={{
            background: '#2563eb',
            border: '2px solid #fff',
            width: 14,
            height: 14,
            borderRadius: '50%',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
            top: (30 + index * 22) + 'px',
          }}
          isConnectable={handle.isConnectable !== false}
          label={handle.label}
        />
      ))}
      <div style={{ width: '100%' }}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => {
            const val = e.target.value;
            setText(val);
            if (updateNodeField) {
              updateNodeField(id, 'text', val);
            }
          }}
          placeholder="Enter text with {{variables}}..."
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '10px 14px',
            borderRadius: '6px',
            border: '1px solid #E6E6E6',
            backgroundColor: '#fafafa',
            color: '#111',
            fontSize: '13px',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
            lineHeight: '1.5',
            transition: 'border-color 120ms ease, box-shadow 120ms ease',
          }}
        />
        {variables.length > 0 && (
          <div style={{ marginTop: '12px', fontSize: '11px', color: '#a3a3a3' }}>
            Variables: {variables.map((v) => (
              <span key={v} style={{ marginRight: '4px' }}>
                {'{{' + v + '}}'}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

registerNode({
  type: 'text',
  label: 'Text',
  description: 'Text template with variable interpolation',
  category: 'processing',
  handles: [
    { id: 'output', type: 'source', position: Position.Right },
  ],
  fields: [
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
      default: '{{input}}',
      placeholder: 'Enter text with {{variables}}...',
      rows: 3,
    },
  ],
  defaultData: {
    text: '{{input}}',
    variables: [],
  },
  component: TextNode,
});