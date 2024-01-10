import './PostTag.css';

const PostTag = ({ tag }) => {
    return (
        <>
            <span className="post-tag">{tag}</span>
        </>
    );
}

export default PostTag;