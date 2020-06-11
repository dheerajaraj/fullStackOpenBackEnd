import axios from "axios";
const baseUrl = "http://localhost:3004/api/restaurant";

const getAllRestaurants = async () => {
    const restaurants = await axios.get(baseUrl);
    console.log(restaurants);
    return restaurants;
}

export default {getAllRestaurants};