import React from "react";

const Input = ({ inputName, label, inputValue, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor="inputName">{label}</label>
      <input
        value={inputValue}
        onChange={onChange}
        id={inputName}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error} </div>}
    </div>
  );
};

export default Input;
