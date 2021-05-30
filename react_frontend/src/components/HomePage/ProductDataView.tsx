import './ProductDataView.css'

import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {Rating} from "primereact/rating";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Product} from "../../models/Product";
import {ApiService} from "../../api/ApiService";
import {ScrollTop} from "primereact/scrolltop";
import {ScrollPanel} from "primereact/scrollpanel";
import {Toast} from "primereact/toast";


const ProductDataView = (props: {
    basket: Product[],
    setBasket:  Dispatch<SetStateAction<Product[]>>
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [layout, setLayout] = useState<any>('grid');
    const [sortKey, setSortKey] = useState<any>(null);
    const [sortOrder, setSortOrder] = useState<any>(null);
    const [sortField, setSortField] = useState<any>(null);
    const toast = useRef(null);
    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];

    useEffect(() => {
        ApiService.getProductList().then(data => {
            setProducts(data);
        });
    }, []);

    const onSortChange = (event: any) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

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

    const renderListItem = (data: Product) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={`${data.image}`}
                         onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={data.name}/>
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <Rating value={+data.rating} readOnly cancel={false}/>
                        <i className="pi pi-tag product-category-icon"/><span
                        className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.price}</span>
                        <Button
                            icon="pi pi-shopping-cart"
                            label="Add to Cart"
                            disabled={data.inventory_status === 'OUTOFSTOCK'}
                            onClick={() => addProductToCart(data)}
                        />
                        <span
                            className={`product-badge status-${data.inventory_status.toLowerCase()}`}>{data.inventory_status}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data: Product) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"/>
                            <span className="product-category">{data.category}</span>
                        </div>
                        <span
                            className={`product-badge status-${data.inventory_status.toLowerCase()}`}>{data.inventory_status}</span>
                    </div>
                    <div className="product-grid-item-content">
                        <img src={`${data.image}`}
                             onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                             alt={data.name}
                            className='product-grid-image'
                        />
                        <div className="product-name">{data.name}</div>
                        <ScrollTop/>
                        <ScrollPanel style={{height: '100px'}}>
                            <div className="product-description">{data.description}</div>
                            <ScrollTop target="parent" threshold={100} className="custom-scrolltop" icon="pi pi-arrow-up" />
                        </ScrollPanel>

                        <Rating style={{marginTop: '5px'}} value={+data.rating} readOnly cancel={false}/>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${data.price}</span>
                        <Button
                            icon="pi pi-shopping-cart"
                            label="Add to Cart"
                            disabled={data.inventory_status === 'OUTOFSTOCK'}
                            onClick={() => addProductToCart(data)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product: any, layout: any) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price"
                              onChange={onSortChange}/>
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)}/>
                </div>
            </div>
        );
    }

    const header = renderHeader();


    return (
        <div className="dataview">
            <div className="card">
                <DataView value={products} layout={layout} header={header}
                          itemTemplate={itemTemplate} paginator rows={9}
                          sortOrder={sortOrder} sortField={sortField}/>
            </div>
            <Toast ref={toast}/>
        </div>
    );
}

export default ProductDataView;