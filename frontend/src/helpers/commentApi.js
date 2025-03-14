class Comment {
    constructor() {
        this.commentUrl = "http://localhost:8080/post";
        this.token = localStorage.getItem("token");
    }

    async commentOnPost({ id, comment }) {
        try {
            await fetch(`${this.postUrl}/${id}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({ body: comment }),
            });
        } catch {
            window.location.href = "/error";
        }
    }

    async interactOnComment({ id, type }) {
        try {
            await fetch(`${this.postUrl}/comment/${id}/${type}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
        } catch {
            window.location.href = "/error";
        }
    }

    async replyOnComment({ id, reply }) {
        try {
            await fetch(`${this.postUrl}/comment/${id}/reply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
                body: JSON.stringify({ body: reply }),
            });
        } catch {
            window.location.href = "/error";
        }
    }
}
