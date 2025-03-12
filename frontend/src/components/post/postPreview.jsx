export default function PostPreview({ post }) {
    console.log({ post });
    return (
        <div>
            <p>{post.author.username}</p>
            {post.images.map(i => {
                return <img src={i} style={{ width: "300px" }} />;
            })}
            <p>{post.likedBy.length} likes</p>
            <button>LIKE</button>
        </div>
    );
}
