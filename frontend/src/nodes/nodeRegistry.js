import { createNodeType } from './nodeFactory';

const nodeDefinitions = new Map();
const nodeComponents = new Map();

export const registerNode = (config) => {
  const { type } = config;
  if (!type) {
    console.error('Node type is required');
    return;
  }
  
  const NodeComponent = createNodeType({
    ...config,
    type,
  });
  
  nodeDefinitions.set(type, config);
  nodeComponents.set(type, NodeComponent);
};

export const getNodeType = (type) => nodeDefinitions.get(type);

export const getAllNodeTypes = () => Array.from(nodeDefinitions.values());

export const getNodesByCategory = (category) => {
  return Array.from(nodeDefinitions.values()).filter((n) => n.category === category);
};

export const getToolbarNodes = () => {
  return Array.from(nodeDefinitions.values()).filter((n) => n.showInToolbar !== false);
};

export const getNodeComponent = (type) => nodeComponents.get(type);

export const getNodeTypesForReactFlow = () => {
  const types = {};
  nodeComponents.forEach((component, type) => {
    types[type] = component;
  });
  return types;
};

export const getInitNodeData = (nodeID, type) => {
  const def = nodeDefinitions.get(type);
  if (!def) return { id: nodeID, nodeType: type };
  return {
    id: nodeID,
    nodeType: type,
    ...def.defaultData,
  };
};

export const initializeNodes = () => {
  return getNodeTypesForReactFlow();
};