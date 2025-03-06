const db = require("../model/messageQueries");

class Message {
    async createMessage(req, res) {
        const message = await db.createMessage({
            conversationId: req.params.id,
            message: req.body.message,
            isImage: req.body.isImage,
            userId: req.user.id,
        });

        res.status(201).json({ message });
    }
}

module.exports = new Message();
