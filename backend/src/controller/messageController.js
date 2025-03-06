const db = require("../model/messageQueries");

function checkIfUserMessage({ user, messageId }) {
    return user.messages.find(m => m.id === messageId);
}

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

    async deleteMessage(req, res) {
        if (!checkIfUserMessage({ user: req.user, messageId: req.params.messageId })) return res.sendStatus(403);

        await db.deleteMessage({ id: req.params.messageId });

        res.sendStatus(200);
    }
}

module.exports = new Message();
