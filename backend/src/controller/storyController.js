const db = require("../model/storyQueries");
const { addDays } = require("date-fns");

class Story {
    async createStory(req, res) {
        const story = await db.createStory({ image: req.body.image, expiresAt: addDays(new Date(), 1), userId: req.user.id });

        res.status(201).json({ story });
    }

    async deleteStory(req, res) {
        const checkStoryFromUser = req.user.stories.find(s => s.id === req.params.id);

        if (!checkStoryFromUser) return res.sendStatus(403);

        await db.deleteStory({ id: req.params.id });

        res.sendStatus(200);
    }
}

module.exports = new Story();
