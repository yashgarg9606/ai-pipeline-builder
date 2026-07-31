import React from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  data,
  label,
  description,
  style = {},
  className = '',
  handles = [],
  children = null,
  showSourceHandle = false,
  showTargetHandle = false,
  sourcePosition = Position.Right,
  targetPosition = Position.Left,
  handleStyle = {},
  sourceHandleStyleProp = {},
  targetHandleStyleProp = {},
  selected = false,
  nodeCategory = 'default',
}) => {
  const nodeStyle = {
    minWidth: 230,
    maxWidth: 330,
    minHeight: 64,
    border: '1px solid #ececec',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#111',
    padding: 20,
    fontSize: 14,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'box-shadow 150ms ease, border-color 150ms ease, transform 150ms ease',
    ...style,
  };

  const handlePositions = {
    [Position.Left]: { left: '-7px' },
    [Position.Right]: { right: '-7px' },
    [Position.Top]: { top: '-7px' },
    [Position.Bottom]: { bottom: '-7px' },
  };

  const baseHandleStyle = {
    ...handleStyle,
    background: '#4f46e5',
    border: '2px solid #fff',
    width: 14,
    height: 14,
    borderRadius: '50%',
    transition: 'transform 120ms ease, box-shadow 120ms ease',
    zIndex: 10,
  };

  const sourceHandleStyle = {
    ...baseHandleStyle,
    ...sourceHandleStyleProp,
    background: '#16a34a',
  };

  const targetHandleStyle = {
    ...baseHandleStyle,
    ...targetHandleStyleProp,
    background: '#4f46e5',
  };

  const borderColor = selected ? '#6675F5' : '#ececec';
  const boxShadow = selected ? 'none' : '0 2px 8px rgba(0,0,0,.04)';

  return (
    <div
      className={`base-node ${className}`}
      style={{
        ...nodeStyle,
        borderColor,
        boxShadow,
        transform: selected ? 'translateY(-1px)' : 'none',
        transition: 'box-shadow 120ms ease, border-color 120ms ease, transform 120ms ease',
      }}
      data-node-id={id}
      data-category={nodeCategory}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.borderColor = '#e0e0e0';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.borderColor = '#ececec';
        }
      }}
    >
      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id || index}`}
          id={handle.id || `${id}-handle-${index}`}
          type={handle.type}
          position={handle.position}
          style={{
            ...baseHandleStyle,
            ...handlePositions[handle.position],
            ...handle.style,
          }}
          isConnectable={handle.isConnectable !== false}
        />
      ))}

      <div className="node-content" style={{ position: 'relative', zIndex: 1 }}>
        {label && (
          <div className="node-label" style={{ 
            fontWeight: 600, 
            marginBottom: 12, 
            fontSize: 16,
            color: '#111',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {label}
          </div>
        )}
        {description && (
          <div className="node-description" style={{ 
            opacity: 0.6, 
            fontSize: 12, 
            marginBottom: 16, 
            color: '#737373',
            lineHeight: 1.5,
          }}>
            {description}
          </div>
        )}
        {children}
      </div>

      {showSourceHandle && (
        <Handle
          type="source"
          position={sourcePosition}
          id={`${id}-source`}
          style={{
            ...sourceHandleStyle,
            ...handlePositions[sourcePosition],
          }}
        />
      )}

      {showTargetHandle && (
        <Handle
          type="target"
          position={targetPosition}
          id={`${id}-target`}
          style={{
            ...targetHandleStyle,
            ...handlePositions[targetPosition],
          }}
        />
      )}
    </div>
  );
};

export default BaseNode;