import React, { useState, useEffect } from "react";
import RestaurantService from "../service/RestaurantService";

const client = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    RestaurantService.getAllRestaurants().then((response) => {
      setRestaurantList(response.data);
    });
  }, []);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const displayRestDetails = (rest) => {
    return (
      <div>
        <Link to="/menu">
          <figure>
            <picture />
            <figcaption>
              <span>{rest.restName}</span>
              <span>{rest.restRatings}</span>
            </figcaption>
          </figure>
        </Link>
      </div>
    );
  };

  const DisplayAllRestaurants = () => {
    return (
      <div style={blogStyle}>
        <h2>Nearby Restaurants</h2> 
        <ul>
          {restaurantList.map((rest, index) => (
            <li key={index}>
              {displayRestDetails(rest)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <DisplayAllRestaurants />
    </div>
  );
};

export default client;
