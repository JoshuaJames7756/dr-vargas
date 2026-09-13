// Helper para construir URLs optimizadas de Cloudinary (WebP + lazy-ready)
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export function cldUrl(publicId, { width = 800, quality = 'auto', format = 'auto' } = {}) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_${format},q_${quality},w_${width}/${publicId}`;
}
