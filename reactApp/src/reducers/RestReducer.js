import RestaurantService from "../service/RestaurantService";

const restReducer = (state = [], action) => {
    switch(action.type){
        case 'INIT_RESTS': 
            return action.data;
        default: 
            return state;
    }
}

export const initializeRestaurants = () => {
    return async dispatch => {
        const rests = await RestaurantService.getAllRestaurants();
        console.log(rests)
        dispatch({
            type: "INIT_RESTS", 
            data: rests.data
        })
    }
}

export default restReducer;