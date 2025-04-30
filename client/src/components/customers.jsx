import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const { data } = await axios.get("http://localhost:3900/api/customers");
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err.message);
      }
    }

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Gold Member</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.isGold ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Customers;
