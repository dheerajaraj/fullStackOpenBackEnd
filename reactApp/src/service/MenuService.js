import axios from "axios";
const baseUrl = "localhost:3004/api/menu";

const getMenuByRestId = async restId => {
    const menu = await axios.get(baseUrl+"/"+restId);
    return menu; 
}