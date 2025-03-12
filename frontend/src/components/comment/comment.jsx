export default function Comment({ comment }) {
    return (
        <span>
            <p>{comment.author.username}</p>
            <p>{comment.body}</p>
        </span>
    );
}
