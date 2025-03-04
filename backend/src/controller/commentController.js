const db = require("../model/commentQueries");

class Comment {
    async createComment(req, res) {
        const comment = await db.createComment({ body: req.body.body, userId: req.user.id, postId: req.params.id });

        res.status(201).json({ comment });
    }
}

module.exports = new Comment();
