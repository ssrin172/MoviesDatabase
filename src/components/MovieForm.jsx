import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "./../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import withRouter from "./withRouter";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().required().min(1).max(10).label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) {
      setTimeout(() => {
        this.props.navigate("/not-found");
      }, 0);
      return;
    }

    this.setState({ data: this.mapToViewModel(movie) });
    console.log("genre", movie.genre._id);
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    console.log("Saving movie:", this.state.data);
    this.props.navigate("/movies");
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          className="form-control"
        >
          <option value="" disabled>
            Choose...
          </option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Add New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.submitButton("Save")}
        </form>
      </div>
    );
  }
}

export default withRouter(MovieForm);
