import React from 'react';

const ImageModal = ({ isVisible, onClose, imageUrl, showCloseButton }) => {
  if (!isVisible) return null;

  return (
    <div className="image-modal">
      <div className="image-modal-content">
        <img src={imageUrl} alt="Modal" />
        {showCloseButton && (
          <button className="close-button" onClick={onClose}>✖</button>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
