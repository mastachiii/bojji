const db = require("../model/replyQueries");

class Reply {
    async createReply(req, res) {
        const reply = await db.createReply({ body: req.body.body, commentId: req.params.id, userId: req.user.id });

        res.status(201).json({ reply });
    }
}

module.exports = new Reply();
