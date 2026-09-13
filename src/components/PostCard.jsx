export default function PostCard({ post, onAbrir }) {
  return (
    <button className="post-card" onClick={() => onAbrir(post)}>
      <div className="post-card__miniatura" style={{ backgroundImage: `url(${post.miniatura})` }}>
        <span className="post-card__red">{post.red}</span>
      </div>
      <span className="post-card__titulo">{post.titulo}</span>
    </button>
  );
}
