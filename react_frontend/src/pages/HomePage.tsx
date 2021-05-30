import './HomePage.css'

import React, {Dispatch, SetStateAction} from "react";
import ProductDataView from "../components/HomePage/ProductDataView";
import ProductCarousel from "../components/HomePage/ProductCarousel";
import {Product} from "../models/Product";


const HomePage = (props: {
    basket: Product[],
    setBasket:  Dispatch<SetStateAction<Product[]>>
}) => {
    return (
        <div>
            <ProductCarousel basket={props.basket} setBasket={props.setBasket}/>
            <ProductDataView basket={props.basket} setBasket={props.setBasket}/>
        </div>
    );
}

export default HomePage;