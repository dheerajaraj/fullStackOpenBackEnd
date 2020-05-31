import axios from "axios";
const baseUrl = "localhost:3004/api/menu";

const getMenuById = async menuId => {
    const menu = await axios.get(baseUrl+"/"+menuId);
    return menu; 
}