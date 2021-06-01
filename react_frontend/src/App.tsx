import './App.css';
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/themes/saga-blue/theme.css'

import PrimeReact from "primereact/api";
import Navbar from "./components/Navbar/Navbar";
import {Redirect, Route, Switch} from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BasketPage from "./pages/BasketPage";
import {useEffect, useState} from "react";
import {Product} from "./models/Product";
import UsersPage from "./pages/UsersPage";
import OrderPage from "./pages/OrderPage";
import OrderCompletedPage from "./pages/OrderCompletedPage";
import ViewOrderPage from "./pages/ViewOrderPage";

PrimeReact.ripple = true;

const App = () => {
    const [basket, setBasket] = useState<Product[]>([]);
    const [currentOrderNumber, setCurrentOrderNumber] = useState<string>("");

    // useEffect(() => {
    //     console.log(basket);
    // }, [basket])

    return (
        <div className="App">
            <header className="App-header">
                <Navbar basket={basket}/>
            </header>
            <div className={"App-body"}>
                <Switch>
                    <Route exact path="/home">
                        <HomePage basket={basket} setBasket={setBasket}/>
                    </Route>
                    <Route exact path="/basket">
                        <BasketPage basket={basket} setBasket={setBasket}/>
                    </Route>
                    <Route exact path="/contact">
                        <AboutPage/>
                    </Route>
                    <Route exact path="/users">
                        <UsersPage/>
                    </Route>
                    <Route exact path="/order" >
                        <OrderPage basketProducts={basket} setBasketProducts={setBasket} setOrderNumber={setCurrentOrderNumber}/>
                    </Route>
                    <Route exact path="/ordercompleted" >
                        <OrderCompletedPage orderNumber={currentOrderNumber}/>
                    </Route>
                    <Route exact path="/checkyourorder" >
                        <ViewOrderPage/>
                    </Route>
                    <Redirect from="/" to="/home"/>
                </Switch>
            </div>
        </div>
    );
}

export default App;

