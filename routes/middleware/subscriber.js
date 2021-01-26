const express = require("express");
const Subscriber = require("../../models/subscriber");

const getSubscriber = async (req, res, next) => {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(req.params.id);
		if (subscriber == null) {
			return res.status(404).json({ message: "cannot find subscriber" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.subscriber = subscriber;
	next();
};

module.exports = getSubscriber;
