import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import RestaurantService from "../service/RestaurantService";
import {Link} from "react-router-dom";
 
const RestaurantDisplay = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleRestaurantSelect = (rest)=>{
    this.props.setRestSelection(rest);
  }

  const displayRestDetails = (rest) => {
    return (
      <div>
        <Link to={`/menu/${rest.id}`} onClick={handleRestaurantSelect.bind(this,rest)}>
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
    const rests = useSelector(({rest})=>{
      return rest
    })
    return (
      <div style={blogStyle}>
        <h2>Nearby Restaurants</h2> 
        <ul>
          {rests.map((rest, index) => (
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

export default RestaurantDisplay;
