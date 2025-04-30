import React, { Component } from "react";
import axios from "axios";

class Rentals extends Component {
  state = {
    rentals: [],
  };

  async componentDidMount() {
    try {
      const { data: rentals } = await axios.get(
        "http://localhost:3900/api/rentals"
      );
      this.setState({ rentals });
    } catch (ex) {
      console.error("Error fetching rentals:", ex);
    }
  }

  render() {
    const { rentals } = this.state;

    if (rentals.length === 0) return <p>No rentals found.</p>;

    return (
      <div>
        <h1>Rentals</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Movie</th>
              <th>Daily Rental Rate</th>
              <th>Date Out</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental._id}>
                <td>{rental.customer.name}</td>
                <td>{rental.customer.phone}</td>
                <td>{rental.movie.title}</td>
                <td>{rental.movie.dailyRentalRate}</td>
                <td>{new Date(rental.dateOut).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Rentals;
