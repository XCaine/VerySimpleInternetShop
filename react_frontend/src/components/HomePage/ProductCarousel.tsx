import React, {useState, useEffect, Dispatch, SetStateAction, useRef} from 'react';
import {Carousel} from 'primereact/carousel';
import {Button} from 'primereact/button';
import './ProductCarousel.css';
import {ApiService} from "../../api/ApiService";
import {Product} from "../../models/Product";
import {Toast} from "primereact/toast";

const ProductCarousel = (props: {
    basket: Product[],
    setBasket: Dispatch<SetStateAction<Product[]>>
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const toast = useRef(null);
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    useEffect(() => {
        ApiService.getProductList().then(data => setProducts(data.slice(0, 9)));
    }, []);

    const addProductToCart = (product: Product) => {
        props.setBasket([...props.basket, product]);
        // @ts-ignore
        toast.current.show({
            severity: 'success',
            summary: 'Success!',
            detail: `${product.name} added to basket`,
            life: 3000
        });
    }

    const productTemplate = (product: Product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="p-mb-3">
                        <img src={product.image}
                             onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                             alt={product.name} className="product-image"/>
                    </div>
                    <div>
                        <h4 className="p-mb-1">{product.name}</h4>
                        <h6 className="p-mt-0 p-mb-3">${product.price}</h6>
                        <span
                            className={`product-badge status-${product.inventory_status.toLowerCase()}`}>{product.inventory_status}</span>
                    </div>
                    <Button
                        style={{marginTop: '5px'}}
                        icon="pi pi-shopping-cart"
                        className="p-button-sm"
                        disabled={product.inventory_status === 'OUTOFSTOCK'}
                        onClick={() => addProductToCart(product)}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="carousel">
                <div className="card">
                    <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
                              className="custom-carousel" circular
                              autoplayInterval={5000} itemTemplate={productTemplate}
                              header={<h3 style={{marginLeft: '4%'}}>Recommended:</h3>}/>
                </div>
            </div>
            <Toast ref={toast}/>
        </>
    );
}

export default ProductCarousel;