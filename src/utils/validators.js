// src/utils/validators.js
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};

export const validateFile = (file, maxSizeMB = 50, allowedTypes = []) => {
  const errors = [];
  
  if (file.size > maxSizeMB * 1024 * 1024) {
    errors.push(`File size must be less than ${maxSizeMB}MB`);
  }
  
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push('File type not supported');
  }
  
  return errors;
};

export const validatePolicyForm = (data) => {
  const errors = {};
  
  if (!data.title?.trim()) {
    errors.title = 'Policy title is required';
  }
  
  if (!data.description?.trim() || data.description.length < 50) {
    errors.description = 'Description must be at least 50 characters';
  }
  
  if (!data.sector) {
    errors.sector = 'Please select a sector';
  }
  
  if (!data.objectives?.length) {
    errors.objectives = 'Please add at least one objective';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};