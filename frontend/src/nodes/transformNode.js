// transformNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'transform',
  label: 'Transform',
  description: 'Transform data',
  category: 'processing',
  handles: [
    { id: 'input', type: 'target', position: 'left' },
    { id: 'output', type: 'source', position: 'right' },
  ],
  fields: [
    {
      name: 'expression',
      label: 'Expression',
      type: 'textarea',
      default: 'return input.value * 2;',
      placeholder: 'return input.value.toUpperCase();',
      rows: 4,
    },
    {
      name: 'outputKey',
      label: 'Output Key',
      type: 'text',
      default: 'result',
      placeholder: 'Property name for output',
    },
  ],
  renderContent: ({ data }) => (
    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
      <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>Transform</div>
      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)', opacity: 0.8, wordBreak: 'break-all' }}>
        {data?.expression ?? 'return input.value * 2;'}
      </div>
      <div style={{ marginTop: 'var(--space-1)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
        Output → {data?.outputKey ?? 'result'}
      </div>
    </div>
  ),
});