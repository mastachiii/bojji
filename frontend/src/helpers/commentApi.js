class Comment {
    constructor() {
        this.commentUrl = "http://localhost:8080/post";
        this.token = localStorage.getItem("token");
    }

    async createComment({ id, comment, authorId }) {
        try {
            await fetch(`${this.commentUrl}/${id}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({ body: comment, receiverId: authorId }),
            });
        } catch {
            window.location.href = "/error";
        }
    }

    async interactOnComment({ id, authorId, type }) {
        try {
            await fetch(`${this.commentUrl}/comment/${id}/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({ receiverId: authorId }),
            });
        } catch {
            window.location.href = "/error";
        }
    }
}

export default new Comment();
