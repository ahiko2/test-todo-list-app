export const API_CONFIG = {
  // In production, REACT_APP_API_URL should be the EC2 instance's public URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
  ENDPOINTS: {
    TODOS: '/todos'
  }
};

// Helper to check if we're in production
export const isProduction = process.env.NODE_ENV === 'production';