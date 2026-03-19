import { useNavigate } from 'react-router-dom';
import TextPost from '../post/TextPost';
import PhotoPost from '../post/PhotoPost';
import VideoPost from '../post/VideoPost';
import './UserGalleryStyle.css';

export default function UserGallery({ posts = [] }) {
    const navigate = useNavigate();

    if (posts.length === 0) {
        return (
            <div className="gallery-empty">
                <p>no posts yet...</p>
                <span>your photos, videos, and text posts will show here</span>
            </div>
        );
    }

    const renderPost = (post) => {
        const props = {
            key: post.id,
            post,
            mode: 'grid',
            onClick: () => navigate(`/posts/${post.id}`),
        };

        switch (post.type) {
            case 'photo': return <PhotoPost {...props} />;
            case 'video': return <VideoPost {...props} />;
            case 'text':  return <TextPost  {...props} />;
            default:      return null;
        }
    };

    return (
        <div className="gallery-grid">
            {posts.map(renderPost)}
        </div>
    );
}