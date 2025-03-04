const db = require("../model/postQueries");

function checkIfUserPost({ user, postId }) {
    return user.posts.find(p => p.id === postId);
}


class Post {
    async getPost(req, res) {
        const post = await db.getPost({ id: req.params.id });

        res.status(200).json({ post });
    }

    async createPost(req, res) {
        const post = await db.createPost({ body: req.body.body, images: req.body.images, id: req.user.id });

        res.status(201).json({ post });
    }

    async updatePost(req, res) {
        if (!checkIfUserPost({ user: req.user, postId: req.params.id })) return res.sendStatus(403);

        await db.updatePost({ id: req.params.id, body: req.body.body, images: req.body.images });

        res.sendStatus(200);
    }

    async deletePost(req, res) {
        if (!checkIfUserPost({ user: req.user, postId: req.params.id })) return res.sendStatus(403);

        await db.deletePost({ id: req.params.id });

        res.sendStatus(200);
    }

    async likePost(req, res) {
        await db.likePost({ id: req.params.id, userId: req.user.id });

        res.sendStatus(200);
    }

    async dislikePost(req, res) {
        await db.dislikePost({ id: req.params.id, userId: req.user.id });

        res.sendStatus(200);
    }
}

module.exports = new Post();
