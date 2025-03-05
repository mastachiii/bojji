const db = require("../model/conversationQueries");

class Conversation {
    async createConversation(req, res) {
        await db.createConversation({ userIds: [req.user.id, req.body.receiverId] });

        res.sendStatus(201);
    }
}

module.exports = new Conversation();