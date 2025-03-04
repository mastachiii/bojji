const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Post {
    async createPost({ body, images, id }) {
        const post = await prisma.post.create({
            data: {
                body,
                images,
                author: {
                    connect: {
                        id,
                    },
                },
            },
        });

        return post;
    }

    async deletePost({ id }) {
        await prisma.post.delete({
            where: { id },
        });
    }

    async getPost({ id }) {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                likedBy: true,
                comments: {
                    include: {
                        likedBy: true,
                    },
                },
            },
        });

        return post;
    }

    async likePost({ id, userId }) {
        await prisma.post.update({
            where: { id },
            data: {
                likedBy: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async dislikePost({ id, userId }) {
        await prisma.post.update({
            where: { id },
            data: {
                likedBy: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async updatePost({ id, images, body }) {
        await prisma.post.update({
            where: { id },
            data: {
                body,
                images,
                edited: true,
                createdAt: new Date(),
            },
        });
    }
}

module.exports = new Post();
