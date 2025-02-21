import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export const generateCacheKey = (model, params) => {
  const key = `${model}_${JSON.stringify(params)}`;
  return key;
};

export const setCache = (model, params, data) => {
  const key = generateCacheKey(model, params);
  cache.set(key, data);
};

export const getCache = (model, params) => {
  const key = generateCacheKey(model, params);
  return cache.get(key);
};

export const clearCache = (model, params) => {
  const key = generateCacheKey(model, params);
  cache.del(key);
};
