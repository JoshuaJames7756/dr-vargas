export default function PostCard({ post, onAbrir }) {
  return (
    <button
      onClick={() => onAbrir(post)}
      className="group text-left transition-transform duration-300 ease-out hover:-translate-y-1.5"
    >
      <div
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded border border-dashed border-paper/30 bg-bg-alt bg-cover bg-center bg-[repeating-linear-gradient(45deg,rgba(247,244,236,0.05)_0px,rgba(247,244,236,0.05)_12px,transparent_12px,transparent_24px)]"
        style={post.miniatura ? { backgroundImage: `url(${post.miniatura})` } : undefined}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-paper/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        <span className="absolute left-4 top-4 rounded-full border border-paper/20 bg-bg/85 px-3 py-1 text-[11px] text-teal-light">
          {post.red}
        </span>
        {!post.miniatura && (
          <span className="max-w-[80%] text-center text-xs text-muted">
            Contenido pendiente
          </span>
        )}
      </div>
      <span className="mt-3 block text-sm text-paper">{post.titulo}</span>
    </button>
  );
}
