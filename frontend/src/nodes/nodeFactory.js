import React, { useState, useEffect, useCallback } from 'react';
import { BaseNode } from './BaseNode';

export const createNodeType = (config) => {
  const {
    type,
    label,
    description,
    category = 'default',
    handles = [],
    fields = [],
    dynamicHandles = null,
    renderContent = null,
    defaultData = {},
    style = {},
    className = '',
    component: CustomComponent = null,
  } = config;

  if (CustomComponent) {
    return CustomComponent;
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 6,
    border: '1px solid #E6E6E6',
    backgroundColor: '#fafafa',
    color: '#111',
    fontSize: 13,
    outline: 'none',
    transition: 'border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease',
    fontFamily: 'inherit',
    minHeight: 44,
  };

  const NodeComponent = ({ id, data, updateNodeField, selected = false }) => {
    const [localData, setLocalData] = useState(() => ({
      ...defaultData,
      ...data,
    }));

    useEffect(() => {
      setLocalData((prev) => ({ ...prev, ...data }));
    }, [data]);

    const handleFieldChange = useCallback(
      (fieldName, value) => {
        setLocalData((prev) => ({ ...prev, [fieldName]: value }));
        if (updateNodeField) {
          updateNodeField(id, fieldName, value);
        }
      },
      [id, updateNodeField]
    );

    const handleDynamicHandles = useCallback(() => {
      if (dynamicHandles && updateNodeField) {
        const newHandles = dynamicHandles(localData);
        updateNodeField(id, 'dynamicHandles', newHandles);
      }
    }, [id, localData, updateNodeField]);

    useEffect(() => {
      handleDynamicHandles();
    }, [handleDynamicHandles]);

    const mergedHandles = [
      ...handles,
      ...(localData.dynamicHandles || []),
    ];

    const content = renderContent
      ? renderContent(localData, handleFieldChange, { id, data: localData })
      : (
        <div style={{ width: '100%' }}>
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: 24 }}>
              {field.label && (
                <label style={{ 
                  display: 'block', 
                  fontSize: 11, 
                  fontWeight: 500,
                  color: '#737373', 
                  marginBottom: 8, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em' 
                }}>
                  {field.label}
                </label>
              )}
              {field.type === 'select' ? (
                <select
                  value={localData[field.name] || field.default || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  style={{
                    ...inputStyle,
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b4b4b4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '14px',
                    paddingRight: 40,
                  }}
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={localData[field.name] || field.default || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows || 3}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1px solid #E6E6E6',
                    backgroundColor: '#fafafa',
                    color: '#111',
                    fontSize: 13,
                    fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace',
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical',
                    minHeight: 80,
                  }}
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={localData[field.name] || field.default || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 6,
                    border: '1px solid #E6E6E6',
                    backgroundColor: '#fafafa',
                    color: '#111',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      );

    return (
      <BaseNode
        id={id}
        data={localData}
        label={label}
        description={description}
        handles={mergedHandles}
        style={style}
        className={`node-category-${category} ${className}`}
        selected={selected}
        nodeCategory={category}
      >
        {content}
      </BaseNode>
    );
  };

  NodeComponent.displayName = `Node_${type}`;
  NodeComponent.nodeType = type;
  NodeComponent.config = config;

  return NodeComponent;
};

export const createNodeConfig = (config) => config;

export const nodeCategories = {
  input: { color: '#16a34a', label: 'Input' },
  output: { color: '#2563eb', label: 'Output' },
  processing: { color: '#7c3aed', label: 'Processing' },
  logic: { color: '#ea580c', label: 'Logic' },
  integration: { color: '#0891b2', label: 'Integration' },
  control: { color: '#0d9488', label: 'Control' },
  default: { color: '#737373', label: 'Default' },
};