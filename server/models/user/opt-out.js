"use strict";

import {Schema} from "mongoose";

const OptOut = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	created: {
		type: Date,
		default: Date.now
	},
	type: String
}, {versionKey: false});

export default OptOut;
