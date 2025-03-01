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
}

(async () => {
    const db = new Reply();

    // await db.createReply({
    //     body: "The comment was persuasive and intellectually stimulating",
    //     userId: 1,
    //     commentId: "65e09ebb-1622-4343-9bc8-223d9df7db01",
    // });

    await db.dislikeReply({ id: "bc6ec135-7c0c-4d18-b60a-89f19bb7c92a", userId: 2 });

    const query = await prisma.comment.findMany({
        include: {
            replies: {
                include: {
                    likedBy: true,
                },
            },
        },
    });

    console.dir(query, { depth: null });
})();
