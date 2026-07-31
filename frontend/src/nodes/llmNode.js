// llmNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'llm',
  label: 'LLM',
  description: 'Large language model',
  category: 'processing',
  handles: [
    { id: 'system', type: 'target', position: 'left', style: { top: '33%' } },
    { id: 'prompt', type: 'target', position: 'left', style: { top: '66%' } },
    { id: 'response', type: 'source', position: 'right' },
  ],
  fields: [
    {
      name: 'model',
      label: 'Model',
      type: 'select',
      default: 'gpt-4',
      options: [
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'claude-3', label: 'Claude 3' },
      ],
    },
    {
      name: 'temperature',
      label: 'Temperature',
      type: 'range',
      default: 0.7,
      min: 0,
      max: 2,
      step: 0.1,
    },
    {
      name: 'maxTokens',
      label: 'Max Tokens',
      type: 'number',
      default: 2048,
      min: 1,
      max: 8192,
    },
  ],
  defaultData: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
  },
  renderContent: ({ data }) => (
    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
      <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>LLM</div>
      <div style={{ fontFamily: 'var(--font-family-mono)', fontSize: 'var(--font-size-xs)' }}>
        {data?.model ?? 'gpt-4'}
      </div>
      <div style={{ marginTop: 'var(--space-1)', fontSize: 'var(--font-size-xs)' }}>
        Temp: {data?.temperature ?? 0.7} · Max: {data?.maxTokens ?? 2048}
      </div>
    </div>
  ),
});