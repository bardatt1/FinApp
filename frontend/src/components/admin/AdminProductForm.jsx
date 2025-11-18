import React, { useState, useEffect } from 'react';
import '../../styles/admin-product-form.css';

const CATEGORIES = ['tshirts', 'hoodies', 'sweatshirts', 'caps', 'sweatpants'];

export default function AdminProductForm({ product, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'tshirts'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      const imageUrl = product.imageUrl || product.image || '';
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        imageUrl: imageUrl,
        category: product.category || 'tshirts'
      });
      setImageFile(null);
      setImagePreview(imageUrl || null);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: 'tshirts'
      });
      setImageFile(null);
      setImagePreview(null);
    }
    setErrors({});
  }, [product, isOpen]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      let imageUrl = formData.imageUrl.trim();
      
      // If a file is selected, convert it to base64 data URL
      if (imageFile) {
        try {
          imageUrl = await convertFileToBase64(imageFile);
        } catch (error) {
          setErrors({ submit: 'Failed to process image file' });
          setLoading(false);
          return;
        }
      }
      
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        imageUrl: imageUrl,
        category: formData.category
      };
      
      await onSave(productData);
    } catch (error) {
      console.error('Form submission error:', error);
      let errorMessage = 'Failed to save product';
      
      if (error.message.includes('ERR_CONNECTION_RESET') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to server. Please ensure the backend is running on http://localhost:8080';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Please select an image file' }));
        return;
      }
      
      // Validate file size (max 2MB to avoid connection issues with base64)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 2MB. For larger images, please use a URL instead.' }));
        return;
      }
      
      setImageFile(file);
      setErrors(prev => ({ ...prev, image: '' }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Clear URL input when file is selected
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleImageUrlChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, imageUrl: value }));
    if (value) {
      // Clear file when URL is entered
      setImageFile(null);
      setImagePreview(value);
    }
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="admin-form-overlay" onClick={onCancel}>
      <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-form-header">
          <h2>{product ? 'Edit Product' : 'Create New Product'}</h2>
          <button className="admin-form-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={errors.price ? 'error' : ''}
                placeholder="0.00"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="admin-form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="image">Product Image</label>
            <div className="admin-form-image-upload">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="admin-form-file-input"
              />
              <label htmlFor="image" className="admin-form-file-label">
                {imageFile ? imageFile.name : 'Choose Image File'}
              </label>
            </div>
            {errors.image && <span className="error-message">{errors.image}</span>}
            
            <div className="admin-form-image-divider">
              <span>OR</span>
            </div>
            
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
              className="admin-form-url-input"
            />
            
            {imagePreview && (
              <div className="admin-form-image-preview">
                <img src={imagePreview} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          {errors.submit && (
            <div className="error-message submit-error">{errors.submit}</div>
          )}

          <div className="admin-form-actions">
            <button type="button" onClick={onCancel} className="admin-form-cancel">
              Cancel
            </button>
            <button type="submit" className="admin-form-submit" disabled={loading}>
              {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

