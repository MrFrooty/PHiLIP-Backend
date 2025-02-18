import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000';;

const api = axios.create({
  baseURL: API_URL,
});

// Image Generation
export const generateImages = async (prompt, numImages, resolution, temperature, inferenceSteps, signal) => {
  try {
    const response = await api.post('/generate', { prompt, numImages, resolution, temperature, inferenceSteps }, {signal});
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('Error generating images:', error);
    }
    throw error;
  }
};

// Image Enhancement
export const enhanceImage = async (imageData, prompt, enhancementOption, temperature) => {
  try {
    const response = await api.post('/enhance', { imageData, prompt, enhancementOption, temperature });
    return response.data;
  } catch (error) {
    console.error('Error enhancing image:', error);
    throw error;
  }
};

// Settings Management
export const getGenerationSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching generation settings:', error);
    throw error;
  }
};

export const updateGenerationSettings = async (settings) => {
  try {
    const response = await api.put('/settings', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating generation settings:', error);
    throw error;
  }
};

// Enhancement Options
export const getEnhancementOptions = async () => {
  try {
    const response = await api.get('/enhancement-options');
    return response.data;
  } catch (error) {
    console.error('Error fetching enhancement options:', error);
    throw error;
  }
};

// Style Prompts
export const getStylePrompts = async () => {
  try {
    const response = await api.get('/style-prompts');
    return response.data;
  } catch (error) {
    console.error('Error fetching style prompts:', error);
    throw error;
  }
};

export const applyPixart = async (imageData, prompt, numImages=1, resolution=1024, temperature, inferenceSteps=10) => {
  console.log('Sending Pixart request...');
  console.log('Image data length:', imageData.length);
  console.log('Prompt:', prompt);
  console.log('Temperature:', temperature);
  
  try {
    const response = await api.post('/apply-pixart', { imageData, prompt, numImages, resolution, temperature, inferenceSteps });

    if (response.data && Array.isArray(response.data.enhancedImage)) {
      return { images: response.data.enhancedImage };
    } else {
      throw new Error('Invalid response format from Pixart API');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

export const applyFreestyle = async (imageData, prompt, temperature=5, selectedStyle) => {
  console.log('Sending Freestyle request...');
  console.log('Image data length:', imageData.length);
  console.log('Prompt:', prompt);
  console.log('Temperature:', temperature);
  console.log('Selected Style:', selectedStyle)
  
  try {
    const response = await api.post('/apply-freestyle', { imageData, prompt, temperature, selectedStyle });

    if (response.data && Array.isArray(response.data.enhancedImage)) {
      return { images: response.data.enhancedImage };
    } else {
      throw new Error('Invalid response format from Freestyle API');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

export const applyUpscaler = async (imageData, prompt, temperature, outputSize) => {
  console.log('Sending Upscaler request...');
  console.log('Image data length:', imageData.length);
  console.log('Prompt:', prompt);
  console.log('Temperature:', temperature);
  
  try {
    const response = await api.post('/apply-upscaler', { imageData, prompt, temperature, outputSize });

    if (response.data && Array.isArray(response.data.enhancedImage)) {
      return { images: response.data.enhancedImage };
    } else {
      throw new Error('Invalid response format from Upscaler API');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

export const applyControlNet = async (imageData, prompt, temperature) => {
  console.log('Sending ControlNet request...');
  console.log('Image data length:', imageData.length);
  console.log('Prompt:', prompt);
  console.log('Temperature:', temperature);
  
  try {
    const response = await api.post('/apply-controlnet', { imageData, prompt, temperature });

    if (response.data && Array.isArray(response.data.enhancedImage)) {
      return { images: response.data.enhancedImage };
    } else {
      throw new Error('Invalid response format from ControlNet API');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

// Model Management
export const downloadModels = async () => {
  try {
    const response = await api.post('/download-models');
    return response.data;
  } catch (error) {
    console.error('Error downloading models:', error);
    throw error;
  }
};

export const getModelStatus = async () => {
  try {
    const response = await api.get('/model-status');
    return response.data;
  } catch (error) {
    console.error('Error fetching model status:', error);
    throw error;
  }
};

// Image Handling
export const saveImage = async (imageData, fileName) => {
  try {
    const response = await api.post('/save-image', { imageData, fileName });
    return response.data;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

export const getGeneratedImages = async () => {
  try {
    const response = await api.get('/generated-images');
    return response.data;
  } catch (error) {
    console.error('Error fetching generated images:', error);
    throw error;
  }
};

// User Input Handling
export const validateUserInput = async (input, inputType, options) => {
  try {
    const response = await api.post('/validate-input', { input, inputType, options });
    return response.data;
  } catch (error) {
    console.error('Error validating user input:', error);
    throw error;
  }
};

// Logging
export const getLogs = async (startDate, endDate, logLevel) => {
  try {
    const response = await api.get('/logs', { params: { startDate, endDate, logLevel } });
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};

// Progress Bar
export const getProgress = async (taskId) => {
  try {
    const response = await api.get(`/progress/${taskId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching progress:', error);
    throw error;
  }
};

const apiFunctions = {
    generateImages,
    enhanceImage,
    getGenerationSettings,
    updateGenerationSettings,
    getEnhancementOptions,
    getStylePrompts,
    applyFreestyle,
    applyUpscaler,
    applyControlNet,
    applyPixart,
    downloadModels,
    getModelStatus,
    saveImage,
    getGeneratedImages,
    validateUserInput,
    getLogs,
    getProgress
  };
  
export default apiFunctions;