import {ApiClient} from "./ApiClient";
import {User} from "../models/User";
import {Customer} from "../models/Customer";
import {Product} from "../models/Product";
import {Order} from "../models/Order";

export class ApiService extends ApiClient {

    private static usersUrlSuffix = `users/`;
    private static productsUrlSuffix = `products/`;
    private static customersUrlSuffix = `customers/`;
    private static ordersUrlSuffix = `orders/`;

    public static orderNumberPrefix = "1000000";

    public static getUserList = (): Promise<User[]> => {
        return ApiService.getListOfItems<User>(ApiService.usersUrlSuffix);
    }

    public static getUser = (id: number): Promise<User> => {
        return ApiService.getSingleItem<User>(`${ApiService.usersUrlSuffix}${id}/`);
    }

    public static getProductList = (): Promise<Product[]> => {
        return ApiService.getListOfItems<Product>(ApiService.productsUrlSuffix);
    }

    public static postCustomer = (newCustomer: Customer): Promise<Customer> => {
        return ApiService.postSingleItem<Customer>(ApiService.customersUrlSuffix, newCustomer);
    }

    public static getOrderList = (): Promise<Order[]> => {
        return ApiService.getListOfItems<Order>(ApiService.ordersUrlSuffix);
    }
    
    public static postOrder = (newOrder: Order): Promise<Order> => {
        return ApiService.postSingleItem<Order>(ApiService.ordersUrlSuffix, newOrder);
    }

    public static getCustomerList = (): Promise<Customer[]> => {
        return ApiService.getListOfItems<Customer>(ApiService.ordersUrlSuffix);
    }
}