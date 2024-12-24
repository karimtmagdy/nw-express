import asyncHandler from "express-async-handler";
import NodeCache from "node-cache";
 
export const fn = (fn) => asyncHandler(fn);
 
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

 
export const generateCacheKey = (model, params) => {
  const key = `${model}_${JSON.stringify(params)}`;
  return key;
};
 
export const clearCache = (model, params) => {
  const key = generateCacheKey(model, params);
  cache.del(key);
};
