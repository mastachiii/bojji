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
        console.log(req.body);

        const post = await db.createPost({ body: req.body.body, images: req.body.images, id: req.user.id });

        res.status(201).json({ post });
    }

    async updatePost(req, res) {
        if (!checkIfUserPost({ user: req.user, postId: req.params.id })) return res.sendStatus(403);

        const post = await db.getPost({ id: req.params.id }); // If user does not update images or body, use current details

        await db.updatePost({ id: req.params.id, body: req.body.body || post.body, images: req.body.images || post.images });

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

    // Posts made by friends to populate user newsfeed
    async getPostFeed(req, res) {
        const posts = db.getPostFeed({ userId: req.user.id });

        res.status(200).json({ posts });
    }
}

module.exports = new Post();
