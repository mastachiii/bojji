const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
}

(async () => {
    const db = new User();

    await db.createUser({
        fullName: "Al Asid",
        email: "mastachii273@gmai.com",
        username: "mastachii",
        password: "alsaliasid12",
    });

    const query = await prisma.user.findMany();

    console.log(query);
})();

module.exports = User;
