const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Notification {
    async createNotification({ userId, postId, targetId, type }) {
        const notification = await prisma.notification.create({
            data: {
                type,
                user: {
                    connect: {
                        id: userId,
                    },
                },
                post: {
                    connect: {
                        id: postId,
                    },
                },
                targetUser: {
                    connect: {
                        id: targetId,
                    },
                },
            },
        });

        console.log({ notification })
    }
}

module.exports = new Notification();
