const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Reply {
    async createReply({ body, userId, commentId }) {
        await prisma.reply.create({
            data: {
                body,
                comment: {
                    connect: {
                        id: commentId,
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

    async likeReply({ id, userId }) {
        await prisma.reply.update({
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

    async dislikeReply({ id, userId }) {
        await prisma.reply.update({
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

    async deleteReply({ id }) {
        await prisma.reply.delete({
            where: { id },
        });
    }
}
