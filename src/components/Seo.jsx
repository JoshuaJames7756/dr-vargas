import { useEffect } from 'react';

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setOgMeta(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Actualiza <title> y meta description/OG en cada cambio de página.
 * El JSON-LD schema.org Physician vive estático en index.html (no aquí),
 * para que los crawlers lo lean sin depender de que React se monte.
 * Uso: <Seo title="..." description="..." />
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta('description', description);
      setOgMeta('og:title', title);
      setOgMeta('og:description', description);
    }
  }, [title, description]);

  return null;
}
