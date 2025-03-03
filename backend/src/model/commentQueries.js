const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Comment {
    async createComment({ body, userId, postId }) {
        await prisma.comment.create({
            data: {
                body,
                post: {
                    connect: {
                        id: postId,
                    },
                },
                author: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async deleteComment({ id }) {
        await prisma.comment.delete({
            where: { id },
        });
    }

    async likeComment({ id, userId }) {
        await prisma.comment.update({
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

    async dislikeComment({ id, userId }) {
        await prisma.comment.update({
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
}

module.exports = new Comment();
