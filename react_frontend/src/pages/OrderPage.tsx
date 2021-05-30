import {Product} from "../models/Product";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {DataView} from "primereact/dataview";
import {ApiService} from "../api/ApiService";
import {Customer} from "../models/Customer";
import {Toast} from "primereact/toast";
import {Order} from "../models/Order";
import {useHistory} from "react-router";

const OrderPage = (props: {
    basketProducts: Product[],
    setBasketProducts: Dispatch<SetStateAction<Product[]>>
    setOrderNumber: Dispatch<SetStateAction<string>>
}) => {

    const [firstName, setFirstName] = useState<string>("TestFirstName");
    const [lastName, setLastName] = useState<string>("TestLastName");
    const [email, setEmail] = useState<string>("testemail" + Math.round((Math.random() * 100 * 100)) + "@example.com");
    const [street, setStreet] = useState<string>("Test Street");
    const [streetNumber, setStreetNumber] = useState<string>("15");
    const [city, setCity] = useState<string>("Warsaw");
    const [country, setCountry] = useState<string>("Poland");
    const [postalCode, setPostalCode] = useState<string>("00-123");

    const toast = useRef(null);

    const history = useHistory();

    const BasketItemsDataView = () => {
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
                        </div>

                    </div>
                </div>
            );
        }

        return (
            <>
                <div className="dataview">
                    <div className="card">
                        <DataView
                            header={<h3>Selected products</h3>}
                            value={props.basketProducts}
                            layout={'list'}
                            itemTemplate={renderListItem}
                        />
                    </div>
                </div>
            </>

        );
    };

    //TODO improve
    const validateForm = () => {
        return firstName !== ""
            && lastName !== ""
            && email !== ""
            && street !== ""
            && streetNumber !== ""
            && city !== ""
            && country !== ""
            && postalCode !== ""
        //&& props.basketProducts.length !== 0
    }

    const handleFormSubmission = async (event: any) => {
        event.preventDefault();
        const newCustomer: Customer = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            street: street,
            street_number: streetNumber,
            city: city,
            country: country,
            postal_code: postalCode,
        }

        let newCustomerUrl: string | undefined;
        await ApiService.postCustomer(newCustomer)
            .then(async (customerData) => {
                let orderNumber: number = 0//Math.round((Math.random() * 100 * 100));
                await ApiService.getOrderList().then(orders => {
                    orderNumber = orders.length;
                    newCustomerUrl = customerData.url;
                    const basketUrls: (string | undefined)[] = props.basketProducts.map(item => item.url);
                    const generatedOrderNumber = (+ApiService.orderNumberPrefix + orderNumber + 1).toString();
                    if (newCustomerUrl === undefined || basketUrls.some(url => url === undefined)) {
                        // @ts-ignore
                        toast.current.show({
                            severity: 'warn',
                            summary: 'Order creation failed!',
                            detail: "Could not resolve some of the selected products",
                            life: 3000
                        });
                    } else {
                        const newOrder: Order = {
                            number: generatedOrderNumber,
                            status: "pending",
                            customer: newCustomerUrl,
                            // @ts-ignore
                            products: basketUrls
                        }

                        ApiService.postOrder(newOrder)
                            .then(() => {
                                props.setBasketProducts([]);
                                props.setOrderNumber(generatedOrderNumber);
                                history.push("/ordercompleted");
                            })
                            .catch(() => {
                                // @ts-ignore
                                toast.current.show({
                                    severity: 'warn',
                                    summary: 'Order creation failed!',
                                    detail: "Could not resolve some of the selected products",
                                    life: 3000
                                });
                            });
                    }
                })
            })
            .catch((error: any) => {
                // @ts-ignore
                toast.current.show({
                    severity: 'warn',
                    summary: 'Customer creation failed!',
                    detail: error.toString() + "\nCheck network console for further details",
                    life: 3000
                });
            })


    }

    return (
        <>
            <div style={{marginTop: '10%'}} onSubmit={handleFormSubmission}>
                <h2>Fill in your delivery data to finalize order</h2>
                <div className="card">
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="First name"
                                           onChange={(e: any) => setFirstName(e.target.value)}
                                           value={firstName}
                                />
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="Last name" onChange={(e: any) => setLastName(e.target.value)}
                                           value={lastName}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="Email" onChange={(e: any) => setEmail(e.target.value)}
                                           value={email}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="Street" onChange={(e: any) => setStreet(e.target.value)}
                                           value={street}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="Street number"
                                           onChange={(e: any) => setStreetNumber(e.target.value)} value={streetNumber}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="City" onChange={(e: any) => setCity(e.target.value)}
                                           value={city}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="Country" onChange={(e: any) => setCountry(e.target.value)}
                                           value={country}/>
                            </div>
                        </div>
                        <div className="p-col-12 p-md-12">
                            <div className="p-inputgroup">
                                <InputText placeholder="PostalCode"
                                           onChange={(e: any) => setPostalCode(e.target.value)} value={postalCode}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                style={{marginTop: "20px", marginBottom: "20px"}}
                label="Submit order"
                icon="pi pi-check"
                className="p-button-lg"
                disabled={!validateForm()}
                onClick={(e) => handleFormSubmission(e)}
            />
            <BasketItemsDataView/>
            <Toast ref={toast}/>
        </>
    );
}

export default OrderPage;