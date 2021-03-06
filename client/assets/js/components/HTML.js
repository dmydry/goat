"use strict";

import React, {PropTypes} from "react";

export default class HTML extends React.Component {

	static propTypes = {
		initialMarkup: PropTypes.string,
		initialState: PropTypes.object
	};

	render() {
		return (
			<html>
			<head>
				<meta charSet="utf-8"/>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
				<meta name="description" content="description"/>
				<meta name="keywords" content="keywords"/>
				<meta name="robots" content="all"/>
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
				<link rel="shortcut icon" href="/favicon.ico"/>
				<link href="/build/style.css" rel="stylesheet"/>
				<title>G.O.A.T.</title>
			</head>
			<body>
				<div id="app" dangerouslySetInnerHTML={{__html: this.props.initialMarkup}}></div>
				<script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`}}></script>
				<script src="/build/bundle.js" type="text/javascript"></script>
			</body>
			</html>
		);
	}
}
