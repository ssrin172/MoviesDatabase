import React, { Component } from "react";
import Movies from "./components/movies";
import Notfound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/MovieForm";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/movies/:id" element={<MovieForm />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/customers" element={<Customers />}></Route>
            <Route path="/rentals" element={<Rentals />}></Route>
            <Route path="not-found" element={<Notfound />}></Route>
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
