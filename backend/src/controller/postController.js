const db = require("../model/postQueries");

class Post {
    async createPost(req, res) {
        await db.createPost({ body: req.body.body, images: req.body.images, id: req.user.id });

        res.sendStatus(201);
    }
}

module.exports = new Post();
