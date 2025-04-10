import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";

const Like = (props) => {
  return (
    <FontAwesomeIcon
      icon={props.liked ? solidHeart : regularHeart}
      style={{
        cursor: "pointer",
        color: props.liked ? "red" : "grey",
      }}
      onClick={props.onClick}
    />
  );
};

export default Like;
