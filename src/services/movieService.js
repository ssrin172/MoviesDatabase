import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  //existing movie update
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  //new movie
  return http.post(apiEndpoint, movie);
}
export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
