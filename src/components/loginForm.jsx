import React, { Component } from "react";
import Input from "./common/inputForLogin";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options); //here we are destructuring the result property to retrieve result.error

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ id, value }) => {
    const obj = { [id]: value }; // this is the single property we are validating
    const subSchema = { [id]: this.schema[id] }; // we have to create a subschema of one property as we are only validating one property in this function
    const { error } = Joi.validate(obj, subSchema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.id] = errorMessage;
    else delete errors[input.id];

    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault(); //this prevents the entiner page from reloading when the submit button is clicked

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    //call to server
    console.log("submitted");
  };
  render() {
    const { account } = this.state;
    const { errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            inputName="username"
            label="Username"
            inputValue={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            inputName="password"
            label="Password"
            inputValue={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
