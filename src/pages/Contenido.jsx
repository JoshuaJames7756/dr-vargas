import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import PostCard from '../components/PostCard.jsx';
import '../assets/css/contenido.css';

// PENDIENTE: reemplazar por los 3-5 links reales de Instagram/Facebook
// que el Dr. Vargas confirme. Estructura y modal ya listos para
// recibir embeds nativos (iframe de Instagram/Facebook) en el campo `embedUrl`.
const POSTS_PLACEHOLDER = [
  { id: 1, red: 'Instagram', titulo: 'Contenido educativo — pendiente', miniatura: '', embedUrl: '' },
  { id: 2, red: 'Facebook', titulo: 'Contenido educativo — pendiente', miniatura: '', embedUrl: '' },
  { id: 3, red: 'Instagram', titulo: 'Contenido educativo — pendiente', miniatura: '', embedUrl: '' },
];

export default function Contenido() {
  const [postAbierto, setPostAbierto] = useState(null);
  const hayContenidoReal = POSTS_PLACEHOLDER.some((p) => p.embedUrl);

  return (
    <>
      <Navbar />

      <main className="contenido">
        <header className="contenido__header">
          <h1>Contenido</h1>
          <p>Publicaciones educativas del Dr. Vargas en Instagram y Facebook.</p>
        </header>

        {!hayContenidoReal && (
          <p className="contenido__pendiente">
            Esta sección se completará con los posts y reels que el Dr. Vargas elija destacar.
          </p>
        )}

        <section className="contenido__grid">
          {POSTS_PLACEHOLDER.map((post) => (
            <PostCard key={post.id} post={post} onAbrir={setPostAbierto} />
          ))}
        </section>

        {postAbierto && (
          <div className="contenido__modal-overlay" onClick={() => setPostAbierto(null)}>
            <div className="contenido__modal" onClick={(e) => e.stopPropagation()}>
              <button className="contenido__modal-cerrar" onClick={() => setPostAbierto(null)}>×</button>
              {postAbierto.embedUrl ? (
                <iframe title={postAbierto.titulo} src={postAbierto.embedUrl} />
              ) : (
                <p className="contenido__modal-vacio">Este post aún no ha sido conectado.</p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
