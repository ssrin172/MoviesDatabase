import React from "react";

const Input = ({ inputName, label, inputValue, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="inputName">{label}</label>
      <input
        value={inputValue}
        onChange={onChange}
        id="inputName"
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
