import { text } from "@fortawesome/fontawesome-svg-core";
import React, { Component } from "react";
//import { genres, getGenres } from "../../services/fakeGenreService";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onGenreChange,
  selectedGenre,
}) => {
  // we are adding textProperty and valueProperty as we do not want to hardcode things like "genre._id" and "genre.name"
  //we want this Listgroup to be reusable by other components.
  return (
    <ul className="list-group">
      {/* <li className="list-group-item">All Genres</li> */}
      {items.map((genre) => (
        <li
          key={genre[valueProperty]}
          onClick={() => onGenreChange(genre)}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
