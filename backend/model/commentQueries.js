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
}

(async () => {
    const db = new Comment();

    await db.createComment({ body: "amazing post!", userId: 2, postId: "871b539e-7745-4c40-97d2-af641be4efaf" });

    const query = await prisma.post.findMany({
        include: {
            likedBy: true,
            comments: true,
        },
    });

    console.dir(query, { depth: null });
})();
