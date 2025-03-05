const db = require("../model/conversationQueries");

class Conversation {
    async createConversation(req, res) {
        const conversation = await db.createConversation({ userIds: [req.user.id, req.body.receiverId] });

        res.status(201).json({ conversation });
    }
}

module.exports = new Conversation();
