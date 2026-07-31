// mergeNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'merge',
  label: 'Merge',
  description: 'Combine inputs',
  category: 'control',
  handles: [
    { id: 'input1', type: 'target', position: 'left', style: { top: '20%' } },
    { id: 'input2', type: 'target', position: 'left', style: { top: '50%' } },
    { id: 'input3', type: 'target', position: 'left', style: { top: '80%' } },
    { id: 'output', type: 'source', position: 'right' },
  ],
  fields: [
    {
      name: 'mode',
      label: 'Merge Mode',
      type: 'select',
      default: 'object',
      options: [
        { value: 'object', label: 'Merge as Object' },
        { value: 'array', label: 'Merge as Array' },
        { value: 'concat', label: 'Concatenate Strings' },
      ],
    },
    {
      name: 'keys',
      label: 'Input Keys',
      type: 'text',
      default: 'input1,input2,input3',
      placeholder: 'Key names for object mode',
    },
  ],
  renderContent: ({ data }) => (
    <div style={{ padding: 'var(--space-1) 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>Mode:</span>
        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>
          {data?.mode ?? 'object'}
        </span>
      </div>
      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-family-mono)' }}>
        {data?.keys ?? 'input1,input2,input3'}
      </div>
      <div style={{ marginTop: 'var(--space-2)', display: 'flex', gap: 'var(--space-1)', justifyContent: 'center' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-border)' }} />
        ))}
      </div>
    </div>
  ),
});