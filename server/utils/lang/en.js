"use strict";

export default {
	"error": {
		"server": {
			// SERVER
			"no-param": "Required parameter not found",
			"page-not-found": "Page Not Found",
			"invalid-param": "Param is invalid",
			"access-denied": "Access denied",
			"method-not-allowed": "Method not allowed",
			"server-error": "An error has occurred.",
			"missing-credentials": "Missing credentials",
			"incorrect-password": "Incorrect password.",
			"incorrect-name": "Incorrect username."

			// USER

			// API
		},
		"model": {

		},
		"mongo": {
			"E11000": "Duplicate key error"
		}
	},
	messages: {
		"password-changed": "Password successfully changed, now you can login with a new password",
		"instructions-sent": "Instructions were sent to entered email"
	},
	email: {
		subject: {
			"/test": "Test",
			"/user/remind": "G.O.A.T Password Reset Instructions",
			"/user/verify": "G.O.A.T Email Verification"
		}
	}
};