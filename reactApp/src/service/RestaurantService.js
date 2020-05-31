import axios from "axios";
const baseUrl = "localhost:3004/api/restaurant";

const getAllRestaurants = async () => {
    const restaurants = await axois.get(baseUrl);
    return restaurants;
}