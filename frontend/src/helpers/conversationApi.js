class Conversation {
    constructor() {
        this.conversationUrl = "http://localhost:8080/conversation";
        this.token = localStorage.getItem("token");
    }

    async createConversation({ receiverId }) {
        await fetch(`${this.conversationUrl}/create`, {
            method: "POST",
            Authorization: `Bearer ${this.token}`,
            body: JSON.stringify({ receiverId }),
        });
    }
}
