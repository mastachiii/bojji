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

module.exports = new Story();
