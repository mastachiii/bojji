class Conversation {
    constructor() {
        this.conversationUrl = "http://localhost:8080/conversation";
        this.token = localStorage.getItem("token");
    }

    async createConversation({ receiverId }) {
        await fetch(`${this.conversationUrl}/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ receiverId }),
        });
    }
}

export default new Conversation();
