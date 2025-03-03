const db = require("../model/postQueries");

class Post {
    async getPost(req, res) {
        const post = await db.getPost({ id: req.params.id });

        res.status(200).json({ post });
    }

    async createPost(req, res) {
        const post = await db.createPost({ body: req.body.body, images: req.body.images, id: req.user.id });

        res.status(201).json({ post });
    }
}

module.exports = new Post();
