// toolbar.js

import { getToolbarNodes } from './nodes/nodeRegistry';
import { nodeCategories } from './nodes/nodeFactory';

export const PipelineToolbar = () => {
  const nodes = getToolbarNodes();

  const handleDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const categories = {};
  nodes.forEach((node) => {
    if (!categories[node.category]) {
      categories[node.category] = [];
    }
    categories[node.category].push(node);
  });

  const categoryOrder = ['input', 'processing', 'logic', 'integration', 'control', 'output', 'default'];

  return (
    <div className="toolbar">
      <div className="toolbar-header">Nodes</div>
      {categoryOrder.map((category) => {
        const categoryNodes = categories[category];
        if (!categoryNodes || categoryNodes.length === 0) return null;

        const catInfo = nodeCategories[category] || nodeCategories.default;

        return (
          <div key={category} className="toolbar-category">
            <div className="toolbar-category-header">
              <span className="toolbar-category-label">{catInfo.label}</span>
            </div>
            <div className="toolbar-category-items">
              {categoryNodes.map((node) => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                  category={node.category}
                  onDragStart={handleDragStart}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DraggableNode = ({ type, label, category, onDragStart }) => {
  const catInfo = nodeCategories[category] || nodeCategories.default;

  return (
    <div
      className="toolbar-node"
      onDragStart={(e) => onDragStart(e, type)}
      onDragEnd={(e) => (e.target.style.cursor = 'grab')}
      draggable
      style={{ '--node-accent': catInfo.color }}
    >
      <span className="toolbar-node-label">{label}</span>
    </div>
  );
};