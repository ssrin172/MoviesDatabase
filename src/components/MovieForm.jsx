import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    navigate("/movies");
  };
  return (
    <div>
      <h1>Movie Form {id}</h1>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
