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
}

(async () => {
    const db = new Reply();

    await db.createReply({
        body: "The comment was persuasive and intellectually stimulating",
        userId: 1,
        commentId: "65e09ebb-1622-4343-9bc8-223d9df7db01",
    });

    const query = await prisma.comment.findMany({
        include: {
            replies: true,
        },
    });

    console.dir(query, { depth: null });
})();
