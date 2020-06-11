import React, { useState } from "react";
import MenuService from "../service/MenuService";
import { useParams }from "react-router-dom"

const MenuDisplay = ({rest})=> {
    const [menuSel, setMenuSel] = useState({});

    const restId = useParams().restId;
    if(rest.id !== restId){
        return (<h2> ERROR! </h2>);
    }

    MenuService.getMenuByRestId(restId).then( response => {
        setMenuSel(response.data);
    }).catch(err => this.props.setErrorMessage(err));

}

export default MenuDisplay;
