import React, { Component } from "react";

class LoginForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleLogin}>
        <div>
          {this.props.errorMessage}
          username
          <input
            type="text"
            value={this.props.username}
            name="username"
            onChange={this.props.handleLoginUsername}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={this.props.password}
            name="password"
            onChange={this.props.handleLoginPassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  }
}
export default LoginForm;
