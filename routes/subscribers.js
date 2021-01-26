const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");
const getSubscriber = require("./middleware/subscriber");

// get all
router.get("/", async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.json(subscribers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// get one
router.get("/:id", getSubscriber, (req, res) => {
	res.json(res.subscriber);
});

// create one
router.post("/", async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscribedToChannel: req.body.subscribedToChannel,
	});
	try {
		const newSubscriber = await subscriber.save();
		res.status(201).json(newSubscriber);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// update one
router.patch("/:id", getSubscriber, async (req, res) => {
	const result = res.subscriber;
	const request = req.body;
	if (req.body.name != null) {
		result.name = request.name;
	}
	if (req.body.subscribedToChannel != null) {
		result.subscribedToChannel = request.subscribedToChannel;
	}
	try {
		const updatedSubscriber = await res.subscriber.save();
		res.json(updatedSubscriber);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// delete one
router.delete("/:id", getSubscriber, async (req, res) => {
	try {
		await res.subscriber.remove();
		res.json({ message: "subscriber deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
