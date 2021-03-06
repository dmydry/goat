"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

import q from "q";
import debug from "debug";
import mongoose from "mongoose";
import configs from "../server/configs/config.js";

import CategoryModel from "../server/models/user/category.js";
import CategoryController from "../server/controllers/category.js";

debug.enable("db-setup:*");
const log = debug("db-setup:category");

mongoose.Promise = q.Promise;

const connection = mongoose.createConnection(configs[process.env.NODE_ENV].mongo.user.url, configs[process.env.NODE_ENV].mongo.user.options, () => {
	log(`connected ${configs[process.env.NODE_ENV].mongo.user.url}`);
});

connection.model("Category", CategoryModel);

const categoryController = new CategoryController(false, connection);

categoryController.model.remove()
	.then(result => {
		log("removed:", result);

		return categoryController
			.create([{
				title: "Books",
				categoryId: "books"
			}, {
				title: "Cars",
				categoryId: "cars"
			}])
			.then(category1 => {
				return categoryController
					.create([{
						title: "Programming",
						categoryId: "programming",
						parent: category1[0]._id
					}, {
						title: "Cooking",
						categoryId: "cooking",
						parent: category1[0]._id
					}, {
						title: "Lyrics",
						categoryId: "lyrics",
						parent: category1[0]._id
					}, {
						title: "Tata Motors",
						categoryId: "tata_motors",
						parent: category1[1]._id
					}, {
						title: "BMW",
						categoryId: "bmw",
						parent: category1[1]._id
					}, {
						title: "Ford",
						categoryId: "ford",
						parent: category1[1]._id
					}])
					.then(category2 => {
						return categoryController
							.create([{
								title: "PHP",
								categoryId: "php",
								parent: category2[0]._id
							}, {
								title: "Java",
								categoryId: "java",
								parent: category2[0]._id
							}, {
								title: "javascript",
								categoryId: "ecmascript",
								parent: category2[0]._id
							}, {
								title: "1000+ soups",
								categoryId: "1000__soups",
								parent: category2[1]._id
							}, {
								title: "Raw vegan food",
								categoryId: "raw_vegan_food",
								parent: category2[1]._id
							}, {
								title: "Pastry",
								categoryId: "pastry",
								parent: category2[1]._id
							}, {
								title: "Pushkin",
								categoryId: "pushkin",
								parent: category2[2]._id
							}, {
								title: "Akhmatova",
								categoryId: "akhmatova",
								parent: category2[2]._id
							}, {
								title: "Kobzon",
								categoryId: "kobzon",
								parent: category2[2]._id
							}, {
								title: "Land Rover",
								categoryId: "land_rover",
								parent: category2[3]._id
							}, {
								title: "Range Rover",
								categoryId: "land_rover",
								parent: category2[3]._id
							}, {
								title: "Land Cruiser",
								categoryId: "land_cruiser",
								parent: category2[3]._id
							}, {
								title: "BMW 7",
								categoryId: "bmw_7",
								parent: category2[4]._id
							}])
							.then(category3 => {
								return [].concat(category1, category2, category3);
							});
					});
			});
	})
	.then(result => {
		log("OK");
		log(result.length);
	})
	.catch(e => {
		log("FAIL");
		if (e.name === "ValidationError") {
			const categorys = Object.keys(e.errors).map(key => e.errors[key].category);
			log(categorys);
		} else {
			log(e);
		}
	})
	.done(() => {
		log("DONE");
		process.exit(0);
	});
