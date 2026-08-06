// Centralized API base paths.
// NOTE: Values are intentionally identical to what the original components
// hard-coded — this file only removes duplication, it does not change any
// endpoint, method, or payload.
export const API_BASE = `${import.meta.env.VITE_BACK_URL}`;
export const IMG_BASE = `${API_BASE}/images`;

export const productImg = (fileName) => `${IMG_BASE}/${fileName}`;
