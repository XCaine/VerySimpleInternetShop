import './BasketPage.css'

import {Product} from "../models/Product";
import React, {Dispatch, SetStateAction, useRef} from "react";
import {Button} from "primereact/button";
import {DataView} from "primereact/dataview";
import {Toast} from "primereact/toast";
import {useHistory} from "react-router";

const BasketPage = (props: {
    basket: Product[],
    setBasket: Dispatch<SetStateAction<Product[]>>
}) => {

    const toast = useRef(null);
    const history = useHistory();

    const removeProductFromBasket = (product: Product) => {
        props.setBasket(props.basket.filter(basketItem => basketItem.name !== product.name));
        // @ts-ignore
        toast.current.show({
            severity: 'success',
            summary: 'Success!',
            detail: `${product.name} removed from basket`,
            life: 3000
        });
    }

    const renderListItem = (product: Product) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={product.image}
                         onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={product.name}/>
                    <div className="product-list-detail">
                        <div className="product-name">{product.name}</div>
                        <i className="pi pi-tag product-category-icon"/><span
                        className="product-category">{product.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${product.price}</span>
                        <Button className="p-button-danger"
                                icon="pi pi-shopping-cart"
                                label="Remove from basket"
                                onClick={() => removeProductFromBasket(product)}/>
                    </div>

                </div>
            </div>
        );
    }

    const calculateTotal = (): number => {
        let sum = 0;
        props.basket.forEach(item => sum += +item.price)
        return +sum.toFixed(2);
    }

    const handleOrderTransition = () => {
        history.push("/order");
    }

    const getButtonLabel = (): string => {
        return props.basket.length === 0 ? "Basket is empty" : "Finalize order"
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <h2>Total: ${calculateTotal()}</h2>
                    <Button
                        label={getButtonLabel()}
                        icon="pi pi-check"
                        className="p-button-lg"
                        onClick={() => handleOrderTransition()}
                        disabled={props.basket.length === 0}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="dataview">
                <div className="card">
                    <DataView
                        header={renderHeader()}
                        value={props.basket}
                        layout={'list'}
                        itemTemplate={renderListItem}
                    />
                </div>
            </div>
            <Toast ref={toast}/>
        </>

    );
}

export default BasketPage;