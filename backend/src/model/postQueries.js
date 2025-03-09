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
        const selectFields = {
            select: {
                id: true,
                username: true,
                profilePicture: true,
            },
        };

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                likedBy: selectFields,
                comments: {
                    include: {
                        likedBy: selectFields,
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

    async getPostFeed({ userId }) {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    OR: [
                        { id: userId },
                        {
                            followers: {
                                some: {
                                    id: userId,
                                },
                            },
                        },
                    ],
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return posts;
    }
}

module.exports = new Post();
