class Post {
    constructor() {
        this.postUrl = "http://localhost:8080/post";
        this.token = localStorage.getItem("token");
    }

    async createPost({ body, images }) {
        try {
            const formData = new FormData();

            formData.append("body", body);

            for (let i = 0; i < images.length; i++) {
                formData.append(`images`, images[i]);
            }

            await fetch(`${this.postUrl}/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                body: formData,
            });
        } catch {
            window.location.href = "/error";
        }
    }

    async getPostForFeed() {
        try {
            const posts = await fetch(`${this.postUrl}/feed`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            })
                .then(response => response.json())
                .then(data => data.posts);

            return posts;
        } catch {
            window.location.href = "/error";
        }
    }

    async interactOnPost({ id, type }) {
        try {
            const link = `${this.postUrl}/${id}/${type}`;

            await fetch(link, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
        } catch {
            window.location.href = "/error";
        }
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
            const link = `${this.postUrl}/comment/${id}/${type}`;

            await fetch(link, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                },
            });
        } catch {
            window.location.href = "/error";
        }
    }
}

export default new Post();
