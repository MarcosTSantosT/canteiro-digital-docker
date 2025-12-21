import React, { useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import './Resizer.css';

const VerticalResizer = ({ onResize, isDisabled = false }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    if (isDisabled) return; // Não permite resize quando disabled
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isDisabled && onResize) {
        onResize(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResize, isDisabled]);

  return (
    <div
      className={`vertical-resizer ${isDragging ? 'dragging' : ''} ${isDisabled ? 'disabled' : ''}`}
      onMouseDown={handleMouseDown}
      style={{ cursor: isDisabled ? 'default' : 'col-resize' }}
    >
      <div className="resizer-handle">
        <GripVertical className="resizer-icon" />
      </div>
    </div>
  );
};

export default VerticalResizer;
