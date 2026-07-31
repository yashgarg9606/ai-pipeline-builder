// delayNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'delay',
  label: 'Delay',
  description: 'Wait',
  category: 'control',
  handles: [
    { id: 'input', type: 'target', position: 'left' },
    { id: 'output', type: 'source', position: 'right' },
  ],
  fields: [
    {
      name: 'duration',
      label: 'Duration (ms)',
      type: 'number',
      default: 1000,
      min: 0,
      max: 300000,
    },
    {
      name: 'unit',
      label: 'Unit',
      type: 'select',
      default: 'ms',
      options: [
        { value: 'ms', label: 'Milliseconds' },
        { value: 's', label: 'Seconds' },
        { value: 'm', label: 'Minutes' },
      ],
    },
  ],
  renderContent: ({ data }) => (
    <div style={{ textAlign: 'center', padding: 'var(--space-2) 0' }}>
      <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-category-delay)' }}>
        ⏱ {data?.duration ?? 1000}{data?.unit ?? 'ms'}
      </div>
      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-1)' }}>
        Wait before continuing
      </div>
    </div>
  ),
});