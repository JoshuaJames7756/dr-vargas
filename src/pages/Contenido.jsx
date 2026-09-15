import { useState } from 'react';
import { useReveal } from '../lib/useReveal.js';
import { SEO } from '../lib/seo.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PostCard from '../components/PostCard.jsx';
import Seo from '../components/Seo.jsx';

// PENDIENTE: reemplazar por los 3-5 links reales de Instagram/Facebook
// que el Dr. Vargas confirme. Estructura y modal ya listos para
// recibir embeds nativos (iframe de Instagram/Facebook) en el campo `embedUrl`.
// Los títulos/miniaturas de abajo son contenido de EJEMPLO para visualizar el diseño.
const POSTS_PLACEHOLDER = [
  {
    id: 1,
    red: 'Instagram',
    titulo: '5 señales de que debes hacerte un Papanicolau',
    miniatura: '',
    embedUrl: '',
  },
  {
    id: 2,
    red: 'Facebook',
    titulo: 'Mitos y verdades sobre la menopausia',
    miniatura: '',
    embedUrl: '',
  },
  {
    id: 3,
    red: 'Instagram',
    titulo: 'La importancia del autoexamen mamario',
    miniatura: '',
    embedUrl: '',
  },
];

export default function Contenido() {
  const [postAbierto, setPostAbierto] = useState(null);
  const containerRef = useReveal();
  const hayContenidoReal = POSTS_PLACEHOLDER.some((p) => p.embedUrl);

  return (
    <div ref={containerRef} className="animate-page-in">
      <Seo title={SEO.contenido.title} description={SEO.contenido.description} />
      <Navbar />

      <main className="px-6 py-16 md:px-10">
        <header className="reveal mx-auto max-w-[1180px]">
          <h1 className="font-serif text-[32px] font-normal">Contenido</h1>
          <p className="mt-2 text-[15px] text-muted">
            Publicaciones educativas del Dr. Vargas en Instagram y Facebook.
          </p>
        </header>

        {!hayContenidoReal && (
          <p className="reveal mx-auto mt-4 max-w-[1180px] text-sm italic text-muted">
            Títulos de ejemplo — se completará con los posts y reels reales que el Dr. Vargas elija destacar.
          </p>
        )}

        <section className="mx-auto mt-10 grid max-w-[1180px] grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS_PLACEHOLDER.map((post, i) => (
            <div key={post.id} className={`reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : ''}`}>
              <PostCard post={post} onAbrir={setPostAbierto} />
            </div>
          ))}
        </section>

        {postAbierto && (
          <div
            className="fixed inset-0 z-[70] flex animate-fade-in items-center justify-center bg-bg/90 p-6 backdrop-blur-sm"
            onClick={() => setPostAbierto(null)}
          >
            <div
              className="relative aspect-[4/5] w-full max-w-md animate-[page-in_0.35s_cubic-bezier(0.16,1,0.3,1)_both] overflow-hidden rounded bg-bg-alt"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-bg/80 text-lg text-paper transition-transform hover:rotate-90 hover:bg-bg"
                onClick={() => setPostAbierto(null)}
                aria-label="Cerrar"
              >
                ×
              </button>
              {postAbierto.embedUrl ? (
                <iframe
                  title={postAbierto.titulo}
                  src={postAbierto.embedUrl}
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-8 text-center text-sm text-muted">
                  Este post aún no ha sido conectado.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
