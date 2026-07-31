// inputNode.js

import { registerNode } from './nodeRegistry';

registerNode({
  type: 'customInput',
  label: 'Input',
  description: 'Pipeline input',
  category: 'input',
  handles: [
    { id: 'output', type: 'source', position: 'right' },
  ],
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      default: 'input_1',
      placeholder: 'Input name',
    },
    {
      name: 'inputType',
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
    inputName: 'input_1',
    inputType: 'Text',
  },
});