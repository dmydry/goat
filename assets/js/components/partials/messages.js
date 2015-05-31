"use strict";

import React, {PropTypes} from "react";
import {Alert} from "react-bootstrap";
import MessageStore from "../../stores/MessageStore.js";

export default class Message extends React.Component {

	static propTypes = {
		messages: PropTypes.array
	};

	static defaultProps = {
		messages: []
	};

	state = {
		messages: this.props.messages
	};

	constructor(props) {
		super(props);
		this.state = this.getStateFromStores();
	}

	getStateFromStores() {
		return {
			messages: MessageStore.getMessages()
		};
	}

	componentDidMount() {
		MessageStore.addChangeListener(this._onChange.bind(this));
	}

	componentWillUnmount() {
		MessageStore.removeChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		this.setState(this.getStateFromStores());
	}

	render() {
		return (
			<div>
				{this.state.messages.map(message =>
						<Alert key={message.id} dismissAfter={3000}
							onDismiss={() => { MessageStore.remove(message.id); }}
							bsStyle={message.type}>
							{message.text}
						</Alert>
				)}
			</div>
		);
	}
}
