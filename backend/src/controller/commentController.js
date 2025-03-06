const db = require("../model/commentQueries");

function checkIfUserComment({ user, commentId }) {
    return user.comments.find(c => c.id === commentId);
}

class Comment {
    async createComment(req, res) {
        const comment = await db.createComment({ body: req.body.body, userId: req.user.id, postId: req.params.id });

        res.status(201).json({ comment });
    }

    async deleteComment(req, res) {
        if (!checkIfUserComment({ user: req.user, commentId: req.params.id })) return res.sendStatus(403);

        await db.deleteComment({ id: req.params.id });

        res.sendStatus(200);
    }

    async likeComment(req, res) {
        await db.likeComment({ id: req.params.id, userId: req.user.id });

        res.sendStatus(200);
    }

    async dislikeComment(req, res) {
        await db.dislikeComment({ id: req.params.id, userId: req.user.id });

        res.sendStatus(200);
    }

    async getComment(req, res) {
        const comment = await db.getComment({ id: req.params.id });

        res.status(200).json({ comment });
    }
}

module.exports = new Comment();