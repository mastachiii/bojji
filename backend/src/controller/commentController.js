const db = require("../model/commentQueries");

class Comment {
    async createComment(req, res) {
        await db.createComment({ body: req.body.body, userId: req.user.id, postId: req.params.id });

        res.sendStatus(201);
    }
}

module.exports = new Comment();
