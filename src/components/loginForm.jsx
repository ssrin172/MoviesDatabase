import React, { Component } from "react";
import Input from "./common/inputForLogin";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //this prevents the entiner page from reloading when the submit button is clicked
    console.log("submitted");
  };
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            inputName="username"
            label="Username"
            inputValue={account.username}
            onChange={this.handleChange}
          />
          <Input
            inputName="password"
            label="Password"
            inputValue={account.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
