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

const JSON_LD_ID = 'seo-json-ld';

/**
 * Actualiza <title>, meta description/OG, y opcionalmente inyecta
 * un bloque JSON-LD en <head> (solo úsalo en UNA página, normalmente Inicio,
 * para no duplicar el schema.org Physician en cada ruta).
 * Uso: <Seo title="..." description="..." jsonLd={objeto} />
 */
export default function Seo({ title, description, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta('description', description);
      setOgMeta('og:title', title);
      setOgMeta('og:description', description);
    }

    if (jsonLd) {
      let script = document.getElementById(JSON_LD_ID);
      if (!script) {
        script = document.createElement('script');
        script.id = JSON_LD_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // Limpieza: si esta página no trae jsonLd pero una anterior sí lo dejó,
    // no lo removemos — el schema del negocio debe seguir presente en todo
    // el sitio para SEO, no solo en la página donde se declaró.
  }, [title, description, jsonLd]);

  return null;
}
