const db = require("../model/storyQueries");
const { addDays } = require("date-fns");

class Story {
    async createStory(req, res) {
        const story = await db.createStory({ image: req.body.image, expiresAt: addDays(new Date(), 1), userId: req.user.id });

        res.status(201).json({ story });
    }
}

module.exports = new Story();
