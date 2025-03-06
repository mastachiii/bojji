const db = require("../model/messageQueries");

class Message {
    async createMessage(req, res) {
        await db.createMessage({ conversationId: req.params.id, message: req.body.message, isImage: req.body.isImage, userId: req.user.id });

        res.sendStatus(201);
    }
}

module.exports = new Message();