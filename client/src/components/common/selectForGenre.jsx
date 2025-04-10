import React from "react";

const Select = (inputName, label, options, error, ...rest) => {
  return (
    <div className="form-group">
      <label htmlFor={inputName}>{label}</label>
      <select
        name={inputName}
        id={inputName}
        {...rest}
        className="form-control"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
