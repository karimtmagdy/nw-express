import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";
/**
 * Utility to wrap async route handlers.
 * @param {Function} fn - The asynchronous callback function to handle the route.
 * @returns {Function} - Wrapped function with error handling.
 */
export const fn = (fn) => asyncHandler(fn);
/**
 * Utility to create a cache instance.
 * @returns {Object} - The cache instance.
 */
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

/**
 * Utility to generate a cache key based on model and params.
 * @param {string} model - The name of the model.
 * @param {Object} params - The parameters used to generate the cache key.
 * @returns {string} - The generated cache key.
 */
export const generateCacheKey = (model, params) => {
  const key = `${model}_${JSON.stringify(params)}`;
  return key;
};
/**
 * Utility to clear cache based on model and params.
 * @param {string} model - The name of the model.
 * @param {Object} params - The parameters used to generate the cache key.
 */
export const clearCache = (model, params) => {
  const key = generateCacheKey(model, params);
  cache.del(key);
};
