// apiNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'api',
  label: 'API',
  description: 'HTTP request',
  category: 'integration',
  handles: [
    { id: 'trigger', type: 'target', position: 'left' },
    { id: 'response', type: 'source', position: 'right' },
    { id: 'error', type: 'source', position: 'bottom' },
  ],
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      default: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
        { value: 'PATCH', label: 'PATCH' },
      ],
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      default: 'https://api.example.com/endpoint',
      placeholder: 'API endpoint',
    },
    {
      name: 'headers',
      label: 'Headers',
      type: 'textarea',
      default: '{\n  "Content-Type": "application/json"\n}',
      placeholder: 'Headers as JSON',
      rows: 3,
    },
    {
      name: 'body',
      label: 'Body',
      type: 'textarea',
      default: '{}',
      placeholder: 'Request body',
      rows: 4,
    },
    {
      name: 'timeout',
      label: 'Timeout (ms)',
      type: 'number',
      default: 30000,
      min: 1000,
      max: 300000,
    },
  ],
  defaultData: {
    method: 'GET',
    url: 'https://api.example.com/endpoint',
    headers: '{\n  "Content-Type": "application/json"\n}',
    body: '{}',
    timeout: 30000,
  },
  renderContent: ({ data }) => (
    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
      <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
        <span style={{
          display: 'inline-block',
          padding: 'var(--space-1) var(--space-2)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          backgroundColor: 'var(--color-accent-light)',
          color: 'var(--color-accent)',
          marginRight: 'var(--space-2)'
        }}>
          {data?.method ?? 'GET'}
        </span>
        API Request
      </div>
      <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.7, wordBreak: 'break-all' }}>
        {data?.url ?? 'https://api.example.com/endpoint'}
      </div>
    </div>
  ),
});