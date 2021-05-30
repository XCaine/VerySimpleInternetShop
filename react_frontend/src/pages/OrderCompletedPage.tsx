const OrderCompletedPage = (props: {
    orderNumber: string
}) => {
    return (
        <>
            <h1>Order {props.orderNumber} successfully created!</h1>
            <h1>Write down order number to check its status later</h1>
            <h1>We'll send you more information shortly</h1>
        </>
    );
};

export default OrderCompletedPage;