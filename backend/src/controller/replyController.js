const db = require("../model/replyQueries");

function checkIfUserReply({ user, replyId }) {
    return user.commentReplies.find(r => r.id === replyId);
}

class Reply {
    async createReply(req, res) {
        const reply = await db.createReply({ body: req.body.body, commentId: req.params.id, userId: req.user.id });

        res.status(201).json({ reply });
    }

    async deleteReply(req, res) {
        if (!checkIfUserReply({ user: req.user, replyId: req.params.replyId })) return res.sendStatus(403);

        await db.deleteReply({ id: req.params.replyId });

        res.sendStatus(200);
    }

    async getReply(req, res) {
        const reply = await db.getReply({ id: req.params.replyId });

        res.status(200).json({ reply });
    }

    async likeReply(req, res) {
        await db.likeReply({ id: req.params.replyId, userId: req.user.id });

        res.sendStatus(200);
    }

    async dislikeReply(req, res) {
        await db.dislikeReply({ id: req.params.replyId, userId: req.user.id });

        res.sendStatus(200);
    }
}

module.exports = new Reply();
