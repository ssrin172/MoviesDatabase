import React from "react";

const Input = ({ inputName, label, inputValue, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{label}</label>
      <input
        {...rest}
        id={inputName}
        value={inputValue}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error} </div>}
    </div>
  );
};

export default Input;
