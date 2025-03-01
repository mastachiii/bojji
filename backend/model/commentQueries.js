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

(async () => {
    const db = new Comment();

    // await db.createComment({ body: "amazing post!", userId: 2, postId: "871b539e-7745-4c40-97d2-af641be4efaf" });
    await db.dislikeComment({ id: "65e09ebb-1622-4343-9bc8-223d9df7db01", userId: 1 });

    const query = await prisma.post.findMany({
        include: {
            likedBy: true,
            comments: {
                include: {
                    likedBy: true,
                },
            },
        },
    });

    console.dir(query, { depth: null });
})();
