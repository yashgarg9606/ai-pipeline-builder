// outputNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'customOutput',
  label: 'Output',
  description: 'Pipeline output',
  category: 'output',
  handles: [
    { id: 'input', type: 'target', position: 'left' },
  ],
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      default: 'output_1',
      placeholder: 'Output name',
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      default: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
  defaultData: {
    outputName: 'output_1',
    outputType: 'Text',
  },
});