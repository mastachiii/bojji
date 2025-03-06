const db = require("../model/conversationQueries");

class Conversation {
    async createConversation(req, res) {
        const conversation = await db.createConversation({ userIds: [req.user.id, req.body.receiverId] });

        res.status(201).json({ conversation });
    }

    async leaveConversation(req, res) {
        await db.leaveConversation({ id: req.params.id, userId: req.user.id });

        res.sendStatus(200);
    }

    async getConversation(req, res) {
        const conversation = await db.getConversation({ id: req.params.id });

        res.status(200).json({ conversation });
    }
}

module.exports = new Conversation();
