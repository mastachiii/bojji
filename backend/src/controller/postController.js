const db = require("../model/postQueries");

class Post {
    async createPost(req, res) {
        const post = await db.createPost({ body: req.body.body, images: req.body.images, id: req.user.id });

        res.status(201).json({ post });
    }
}

module.exports = new Post();
