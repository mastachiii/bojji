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

    async messageConversation({ id, message }) {
        await fetch(`${this.conversationUrl}/${id}/message`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
    }
}

export default new Conversation();
