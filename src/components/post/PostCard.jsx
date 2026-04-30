import { useNavigate } from "react-router-dom";
import PhotoPost from "./PhotoPost";
import VideoPost from "./VideoPost";
import TextPost from "./TextPost";

// PostCard is the feed-level wrapper.
// It normalizes the backend post shape and picks the right component.
// Backend returns: { post_id, caption, media_url, media_type, display_name, avatar_url, comment_count, created_at }
// PostCard maps this to the shape PhotoPost/VideoPost/TextPost expect.

export default function PostCard({ post, mode = "feed" }) {
    const navigate = useNavigate();

    const normalized = {
        id:           post.post_id,
        caption:      post.caption,
        imageUrl:     post.media_type === "image" ? post.media_url : undefined,
        videoUrl:     post.media_type === "video" ? post.media_url : undefined,
        text:         post.caption, // TextPost uses post.text
        username:     post.display_name,
        avatarUrl:    post.avatar_url,
        commentCount: post.comment_count,
        likeCount:    0, // likes not implemented
        timestamp:    new Date(post.created_at).toLocaleDateString(),
        // Pass through the full post for navigation state
        _raw:         post,
    };

    const handleClick = () => {
        navigate(`/posts/${post.post_id}`, { state: normalized._raw });
    };

    const props = { post: normalized, mode, onClick: handleClick };

    if (post.media_type === "image") return <PhotoPost {...props} />;
    if (post.media_type === "video") return <VideoPost {...props} />;
    return <TextPost {...props} />;
}