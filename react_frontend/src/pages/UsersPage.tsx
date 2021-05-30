import {useEffect, useState} from "react";
import {User} from "../models/User";
import {Customer} from "../models/Customer";
import {Button} from "primereact/button";
import {ApiService} from "../api/ApiService";

const UsersPage = () => {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const fetchedUsers = await ApiService.getUserList();
        setUsers(fetchedUsers);
        const user = await ApiService.getUser(1);
    }

    const onButtonClick = async (event: any) => {
        const newCustomer: Customer = {
            first_name: "admin",
            last_name: "admin",
            email: "admin@example.com",
            user: "http://127.0.0.1:8000/shop/users/1/"
        }
        const response = await ApiService.postCustomer(newCustomer);
    }

    return(
        <>
            <h1>Users page</h1>
            <Button label="Add customer" icon="pi pi-check" onClick={onButtonClick}/>
        </>
    );
}

export default UsersPage;