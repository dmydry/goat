"use strict";

import {USER_LOGIN, USER_LOGOUT} from "../constants/constants";

const user = null;

export default function update(state = user, action) {
	switch (action.type) {
		case USER_LOGIN:
			return action.user;
		case USER_LOGOUT:
			return null;
		default:
			return state;
	}
}
