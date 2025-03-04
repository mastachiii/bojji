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
}

module.exports = new Comment();
