class Conversation {
    constructor() {
        this.conversationUrl = "https://localhost:8080/conversation";
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

    async messageConversation({ id, message, statusHandler }) {
        await fetch(`${this.conversationUrl}/${id}/message`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        }).then(res => statusHandler(""));
    }
}

export default new Conversation();
