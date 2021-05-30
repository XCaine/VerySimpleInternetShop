import React, {useEffect, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ApiService} from "../api/ApiService";
import {Order} from "../models/Order";
import {Toast} from "primereact/toast";

const ViewOrderPage = () => {

    const [orderNumber, setOrderNumber] = useState<string>("");
    const [order, setOrder] = useState<Order>();

    const toast = useRef(null);

    const validateOrderNumber = () => {
        return orderNumber.length >= ApiService.orderNumberPrefix.length && /^\d+$/.test(orderNumber);
    }

    const searchOrder = () => {
        ApiService.getOrderList().then(data => {
            const selectedOrder = data.filter(order => order.number === orderNumber)[0]
            if (selectedOrder != null) {
                setOrder(selectedOrder);
            } else {
                // @ts-ignore
                toast.current.show({
                    severity: 'warn',
                    summary: 'Order not found!',
                    detail: `We couldn't find the order with number ${orderNumber}`,
                    life: 3000
                });
            }
        })
    }

    return (
        <>
            <div style={{marginLeft: "5%", marginTop: "5%"}}>
                <div className="p-grid">
                    <div className="p-col-4">
                        <InputText
                            className="box"
                            placeholder="Order number"
                            onChange={(e: any) => setOrderNumber(e.target.value)}
                            value={orderNumber}
                        />
                        <Button
                            className="box"
                            label="Search"
                            icon="pi pi-search"
                            disabled={!validateOrderNumber()}
                            onClick={() => searchOrder()}
                        />
                    </div>
                </div>
                {order != null && order.status != null && order.status !== "" ? (
                        <h1>Order status: {order.status}</h1>
                    ) :
                    (<></>)
                }
            </div>
            <Toast ref={toast}/>
        </>
    );
}

export default ViewOrderPage;