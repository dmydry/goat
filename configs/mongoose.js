"use strict";

import fs from "fs";
import debug from "debug";
import mongoose from "mongoose";
import utils from "../utils/utils.js";
import configs from "../configs/config.js";

const config = configs[process.env.NODE_ENV];

export default function () {

	let log = debug("log:mongoose");

	let db = mongoose.connection;

	if (db.readyState) {
		return mongoose;
	}

	db.on("close", function () {
		log("connection closed");
	});
	db.on("connected", function () {
		log("MongoDB connected!");
	});
	db.on("connecting", function () {
		log("connecting to MongoDB...");
	});
	db.on("disconnected", function () {
		log("MongoDB disconnected!");
		mongoose.connect(config.mongo.url, config.mongo.options);
	});
	db.on("disconnecting", function () {
		log("connecting from MongoDB...");
	});
	db.on("error", function (error) {
		log("Error in MongoDb connection");
		log(error);
		mongoose.disconnect();
	});
	db.once("fullsetup", function () {
		log("All nodes are connected.");
	});
	db.once("open", function () {
		log("Connected to mongo server.");
	});
	db.on("reconnected", function () {
		log("MongoDB reconnected!");
	});

	mongoose.connect(config.mongo.url, config.mongo.options);

	function toTitleCase(str) {
		return str.split(".")[0].replace(/(^|_)(\w)/g, function (all, $1, $2) {
			return $2.toUpperCase();
		});
	}

	fs.readdirSync(utils.getPath("models")).forEach(file => {
		mongoose.model(toTitleCase(file), require(utils.getPath("models", file)));
	});

	return mongoose;

}
