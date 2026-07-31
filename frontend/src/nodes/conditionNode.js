// conditionNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'condition',
  label: 'Condition',
  description: 'If/else branch',
  category: 'logic',
  handles: [
    { id: 'input', type: 'target', position: 'left' },
    { id: 'true', type: 'source', position: 'right', label: 'True', style: { top: '25%' } },
    { id: 'false', type: 'source', position: 'right', label: 'False', style: { top: '75%' } },
  ],
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'textarea',
      default: 'input.value > 10',
      placeholder: 'e.g., input.value > 10 || input.status === "active"',
      rows: 3,
    },
    {
      name: 'trueLabel',
      label: 'True Label',
      type: 'text',
      default: 'True',
    },
    {
      name: 'falseLabel',
      label: 'False Label',
      type: 'text',
      default: 'False',
    },
  ],
  renderContent: ({ data }) => (
    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
      <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>Condition</div>
      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)', opacity: 0.8, wordBreak: 'break-all' }}>
        {data?.condition ?? 'input.value > 10'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)', fontSize: 'var(--font-size-xs)' }}>
        <span style={{ color: 'var(--color-category-input)' }}>✓ {data?.trueLabel ?? 'True'}</span>
        <span style={{ color: 'var(--color-error)' }}>✗ {data?.falseLabel ?? 'False'}</span>
      </div>
    </div>
  ),
});