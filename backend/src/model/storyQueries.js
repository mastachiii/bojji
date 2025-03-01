const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Story {
    async createStory({ image, expiresAt, userId }) {
        await prisma.story.create({
            data: {
                image,
                expiresAt,
                author: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async likeStory({ id, userId }) {
        await prisma.story.update({
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

    async dislikeStory({ id, userId }) {
        await prisma.story.update({
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

    async deleteStory({ id }) {
        await prisma.story.delete({
            where: { id },
        });
    }
}

(async () => {
    const db = new Story();

    // await db.createStory({ image: "IMAGE", expiresAt: new Date(), userId: 3 });
    // await db.dislikeStory({ id: "fd3558dc-55e4-4817-815a-f10db018c410", userId: 1 });

    const query = await prisma.user.findUnique({
        where: { id: 3 },
        include: {
            stories: {
                include: {
                    likedBy: true,
                },
            },
        },
    });

    console.dir(query, { depth: null });
})();
