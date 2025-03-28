class Post {
    constructor() {
        this.postUrl = "https://bojji.onrender.com/post";
        this.token = localStorage.getItem("token");
    }

    async createPost({ body, images, statusHandler }) {
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
            }).then(res => {
                statusHandler("POSTED");
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

    async getSuggestedPosts() {
        try {
            const posts = await fetch(`${this.postUrl}/suggested`, {
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

    async interactOnPost({ id, authorId, type }) {
        try {
            const link = `${this.postUrl}/${id}/${type}`;

            await fetch(link, {
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

    async deletePost({ id }) {
        await fetch(`${this.postUrl}/delete/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
    }
}

export default new Post();
