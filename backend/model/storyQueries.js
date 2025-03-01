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
}

(async () => {
    const db = new Story();

    // await db.createStory({ image: "IMAGE", expiresAt: new Date(), userId: 2 });

    const query = await prisma.user.findUnique({
        where: { id: 2 },
        include: {
            stories: true,
        },
    });

    console.dir(query, { depth: null });
})();
