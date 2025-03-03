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
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                followers: true,
                following: true,
                posts: true,
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
}

(async () => {
    const db = new User();

    // await db.createUser({
    //     fullName: "Al Asid",
    //     email: "mastachii273@gmai.com",
    //     username: "mastachii",
    //     password: "alsaliasid12",
    // });

    // await db.createUser({
    //     fullName: "Audrey Hepburn",
    //     email: "audreyHepburn123@gmail.com",
    //     username: "audreyHepburn123",
    //     password: "alsaliasid12",
    // });

    const query = await prisma.user.findMany();
})();

module.exports = new User();
