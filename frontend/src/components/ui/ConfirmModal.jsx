import React, { useEffect } from 'react';
import '../../styles/confirm-modal.css';

function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning' // 'warning', 'danger', 'info'
}) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Handle ESC key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="confirm-modal-overlay" onClick={handleOverlayClick}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`confirm-modal-icon confirm-modal-icon-${type}`}>
          {type === 'danger' && '⚠️'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </div>
        
        <h3 className="confirm-modal-title">{title}</h3>
        
        <div className="confirm-modal-message">
          {Array.isArray(message) 
            ? message.map((line, index) => (
                <p key={index}>{line}</p>
              ))
            : message.split('\n').filter(line => line.trim() !== '').map((line, index) => (
                <p key={index}>{line}</p>
              ))
          }
        </div>
        
        <div className="confirm-modal-actions">
          <button
            className="confirm-modal-cancel"
            onClick={onClose}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={`confirm-modal-confirm confirm-modal-confirm-${type}`}
            onClick={handleConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;

