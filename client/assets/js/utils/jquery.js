"use strict";

import $ from "jquery";
import debug from "debug";
import {MESSAGE_ADD} from "../constants/constants";

export default function configureJquery(store) {
	const log = debug("web:jquery");

	$.noConflict();

	function readCookie(name) {
		const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
		return match ? decodeURIComponent(match[3]) : null;
	}

	$.ajaxSetup({
		type: "post",
		dataType: "json",
		cache: false,
		author: "\x63\x74\x61\x70\x62\x69\x75\x6D\x61\x62\x70\x40\x67\x6D\x61\x69\x6C\x2E\x63\x6F\x6D",
		headers: {
			"X-XSRF-TOKEN": readCookie("XSRF-TOKEN")
		}
	});

	$(document)
		.ajaxStart(() => {
			$(document).css({cursor: "wait"});
		})
		.ajaxError((event, XMLHttpRequest, ajaxOptions, thrownError) => {
			log(ajaxOptions.method + " " + document.location.protocol + "//" + document.location.host + "/" + ajaxOptions.url + "?" + (ajaxOptions.data || ""));
			log(thrownError);
			store.dispatch({
				type: MESSAGE_ADD,
				message: {
					text: XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.errors || thrownError || "Unknown error!",
					type: "danger"
				}
			});
		})
		.ajaxSuccess((event, XMLHttpRequest, ajaxOptions) => {
			log(ajaxOptions.method + " " + document.location.protocol + "//" + document.location.host + "/" + ajaxOptions.url + "?" + (ajaxOptions.data || ""));
		})
		.ajaxComplete(() => {
			$(document).css({cursor: "auto"});
		});

	return $;
}
