import React, { Component } from "react";
import Input from "./inputForLogin";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options); //here we are destructuring the result property to retrieve result.error

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

    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault(); //this prevents the entiner page from reloading when the submit button is clicked

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  renderInput(inputName, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        inputName={inputName}
        label={label}
        inputValue={data[inputName]}
        onChange={this.handleChange}
        error={errors[inputName]}
        type={type}
      />
    );
  }

  submitButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
