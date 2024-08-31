import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import Navbar from "./common/navbar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 5,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (id) => {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  };

  // movieCount(filteredMovies) {
  //   const { length: count } = this.state.movies; // const count = this.state.movies.length // this is object destructuring
  //   return count === 0
  //     ? "There are no movies in the database"
  //     : `Showing ${filteredMovies.length} movies in the database`;
  // }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  //returns the list of sorted movies and the total number of filtered movies
  getPageData = () => {
    const {
      pageSize,
      // currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      sortColumn.order
    );

    return { sortedMovies, totalCount: filteredMovies.length };
  };
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;
    // we have to filter the movies to paginate based on the selected genre
    const { sortedMovies, totalCount } = this.getPageData();

    const movies = paginate(sortedMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedGenre={this.state.selectedGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col">
            <p>Showing {totalCount} movies in the database</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
