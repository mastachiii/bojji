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
    async createUser({ fullName, email, username, password, profilePicture }) {
        await prisma.user.create({
            data: {
                fullName,
                email,
                username,
                password,
                profilePicture,
            },
        });
    }

    async getUserAuth({ username }) {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    }

    async getUserByUsername({ username }) {
        const selectFields = {
            select: {
                id: true,
                username: true,
                fullName: true,
                profilePicture: true,
                stories: true,
            },
        };

        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            select: {
                id: true,
                fullName: true,
                username: true,
                password: true,
                profilePicture: true,
                bio: true,
                followers: selectFields,
                following: selectFields,
                notifications: {
                    include: {
                        post: true,
                        user: { select: this.selectFields },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                posts: {
                    include: {
                        likedBy: {
                            select: this.selectFields,
                        },
                        comments: {
                            include: {
                                author: {
                                    select: this.selectFields,
                                },
                                likedBy: {
                                    select: this.selectFields,
                                },
                                replies: {
                                    include: {
                                        author: {
                                            select: this.selectFields,
                                        },
                                        likedBy: {
                                            select: this.selectFields,
                                        },
                                    },
                                },
                            },
                        },
                        author: {
                            include: {
                                followers: {
                                    select: this.selectFields,
                                },
                            },
                        },
                    },
                },
                stories: true,
                conversations: {
                    include: {
                        messages: {
                            include: {
                                sender: selectFields,
                            },
                        },
                        users: {
                            where: {
                                username: {
                                    not: username,
                                },
                            },
                        },
                    },
                    orderBy: {
                        updatedAt: "desc",
                    },
                },
            },
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
                    startsWith: filter,
                },
            },
            select: {
                username: true,
                id: true,
                profilePicture: true,
                fullName: true,
            },
        });

        return search;
    }
}

module.exports = new User();
