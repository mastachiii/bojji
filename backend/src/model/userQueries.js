const { PrismaClient } = require("@prisma/client");

const databaseUrl = process.env.NODE_ENV === "test" ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
});

class User {
    async createUser({ fullName, email, username, password }) {
        await prisma.user.create({
            data: {
                fullName,
                email,
                username,
                password,
            },
        });
    }

    async getUser({ id }) {
        const selectFields = {
            select: {
                id: true,
                username: true,
                profilePicture: true,
            },
        };

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                username: true,
                profilePicture: true,
                bio: true,
                followers: selectFields,
                following: selectFields,
                posts: true,
                stories: true,
                conversations: true,
            },
        });

        return user;
    }

    async getUserByUsername({ username }) {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        return user;
    }

    async updateUser({ profilePicture, bio, username, fullName, id }) {
        await prisma.user.update({
            where: { id },
            data: {
                profilePicture,
                bio,
                username,
                fullName,
            },
        });
    }

    async followUser({ id, username }) {
        await prisma.user.update({
            where: { id },
            data: {
                following: {
                    connect: {
                        username,
                    },
                },
            },
        });

        await prisma.user.update({
            where: { username },
            data: {
                followers: {
                    connect: {
                        id,
                    },
                },
            },
        });
    }

    async unfollowUser({ username, id }) {
        await prisma.user.update({
            where: { id },
            data: {
                following: {
                    disconnect: {
                        username,
                    },
                },
            },
        });

        await prisma.user.update({
            where: {
                username,
            },
            data: {
                followers: {
                    disconnect: {
                        id,
                    },
                },
            },
        });
    }

    async searchUsers({ filter }) {
        const search = await prisma.user.findMany({
            take: 20,
            where: {
                username: {
                    contains: filter,
                },
            },
            select: {
                username: true,
                id: true,
                profilePicture: true,
            },
        });

        return search;
    }
}

module.exports = new User();
