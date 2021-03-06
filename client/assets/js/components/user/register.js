"use strict";

import React, {PropTypes, Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Input, ButtonInput} from "react-bootstrap";
import zxcvbn from "zxcvbn";
import API from "../../utils/API";
import {reEmail} from "../../../../../server/utils/constants/regexp";
import {email, password, confirm, firstName, lastName/* , phoneNumber*/} from "../../../../../server/utils/constants/misc";
import {USER_LOGIN} from "../../constants/constants";

const register = (data) =>
	dispatch =>
		API.register(data)
			.then(responce => {
				dispatch({
					type: USER_LOGIN,
					user: responce
				});
			});

@connect(
	() => ({}),
	dispatch => bindActionCreators({register}, dispatch)
)
export default class Register extends Component {

	static displayName = "Register";

	static propTypes = {
		email: PropTypes.string,
		// phoneNumber: PropTypes.string,
		password: PropTypes.string,
		confirm: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		history: React.PropTypes.object,
		register: PropTypes.func
	};

	static contextTypes = {
		router: PropTypes.object.isRequired
	};

	static defaultProps = {
		email,
		// phoneNumber
		password,
		confirm,
		firstName,
		lastName
	};

	state = {
		email: this.props.email,
		// phoneNumber: this.props.phoneNumber,
		password: this.props.password,
		confirm: this.props.confirm,
		firstName: this.props.firstName,
		lastName: this.props.lastName
	};

	onSubmit(e) {
		e.preventDefault();
		this.props.register(this.state)
			.then(() => {
				this.context.router.push("/user/profile");
			});
	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-body">
					<form className="form-horizontal" onSubmit={::this.onSubmit} autoComplete="off">
						<Input
							type="email"
							name="email"
							value={this.state.email}
							placeholder="me@example.com"
							label="Email"
							bsStyle={reEmail.test(this.state.email) ? null : "error"}
							hasFeedback
							wrapperClassName="col-xs-10"
							labelClassName="col-sm-2"
							onChange={e => this.setState({email: e.target.value})}
						/>
						{/*
						<Input
							type="text"
							name="phoneNumber"
							value={this.state.phoneNumber}
							placeholder="+1234567890"
							label="Phone number"
							wrapperClassName="col-xs-10"
							labelClassName="col-sm-2"
							onChange={e => this.setState({phoneNumber: e.target.value})}
						/>
						*/}
						<Input
							type="password"
							name="password"
							value={this.state.password}
							placeholder="******"
							label="Password"
							bsStyle={zxcvbn(this.state.password).score >= 1 ? null : "error"}
							hasFeedback
							wrapperClassName="col-xs-10"
							labelClassName="col-sm-2"
							onChange={e => this.setState({password: e.target.value})}
						/>
						<Input
							type="password"
							name="confirm"
							value={this.state.confirm}
							placeholder="******"
							label="Confirm password"
							bsStyle={this.state.password === this.state.confirm ? null : "error"}
							hasFeedback
							wrapperClassName="col-xs-10"
							labelClassName="col-sm-2"
							onChange={e => this.setState({confirm: e.target.value})}
						/>
						<Input
							type="text"
							name="firstName"
							value={this.state.firstName}
							placeholder="Fred"
							label="First name"
							wrapperClassName="col-xs-10"
							labelClassName="col-sm-2"
							onChange={e => this.setState({firstName: e.target.value})}
						/>
						<Input
							type="text"
							name="lastName"
							value={this.state.lastName}
							placeholder="Flintstone"
							label="Last name"
							wrapperClassName="col-xs-10"
							labelClassName="col-sm-2"
							onChange={e => this.setState({lastName: e.target.value})}
						/>
						<ButtonInput
							type="submit"
							value="Register"
							wrapperClassName="col-sm-offset-2 col-sm-10"
							disabled={this.state.disabled}
						/>
					</form>
				</div>
			</div>
		);
	}
}
