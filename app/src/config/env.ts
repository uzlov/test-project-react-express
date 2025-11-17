/**
 * Type-safe environment configuration
 */

interface EnvConfig {
  env: string;
  apiBaseUrl: string;
  iframePlayerUrl: string;
}

/**
 * Get environment variable with validation
 */
function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

/**
 * Environment configuration object
 */
export const env: EnvConfig = {
  env: getEnvVar('VITE_ENV'),
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL'),
  iframePlayerUrl: getEnvVar('VITE_IFRAME_PLAYER_URL'),
};

/**
 * Check if running in development mode
 */
export const isDevelopment = env.env === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = env.env === 'production';
