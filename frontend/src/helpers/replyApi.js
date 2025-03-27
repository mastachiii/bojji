class Reply {
    constructor() {
        this.replyUrl = "https://bojji.onrender.com/post/comment";
        this.token = localStorage.getItem("token");
    }

    async createReply({ id, reply }) {
        try {
            await fetch(`${this.replyUrl}/${id}/reply`, {
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

    async interactOnReply({ id, type }) {
        try {
            await fetch(`${this.replyUrl}/reply/${id}/${type}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });
        } catch {
            window.location.href = "/error";
        }
    }
}

export default new Reply();
