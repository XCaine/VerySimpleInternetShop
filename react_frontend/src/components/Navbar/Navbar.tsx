import './Navbar.css';

import {Menubar} from "primereact/menubar";
import {useHistory} from "react-router";
import {Product} from "../../models/Product";

const Navbar = (props: {
    basket: Product[],
}) => {

    const history = useHistory();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-file',
            command: (event: any) => {
                history.push("/home");
            }
        },
        {
            label: `Basket (${props.basket.length})`,
            icon: 'pi pi-fw pi-shopping-cart',
            command: (event: any) => {
                history.push("/basket");
            }
        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-briefcase',
            command: (event: any) => {
                history.push("/contact");
            }
        },
        {
            label: 'Check your order',
            icon: 'pi pi-fw pi-amazon',
            command: (event: any) => {
                history.push("/checkyourorder");
            }
        },
        /*{
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            command: (event: any) => {
                history.push("/users");
            }
        },
        {
            label: 'Account',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Log in',
                    icon: 'pi pi-fw pi-user',
                    command: (event: any) => {
                        history.push("/users");
                    }
                },
                {
                    label: 'Register',
                    icon: 'pi pi-fw pi-user',
                    command: (event: any) => {
                        history.push("/users");
                    }
                },
            ],
        },*/
    ];

    return (
        <div>
            <div className="card">
                <Menubar className='Nav-bar' model={items}/>
            </div>
        </div>
    );
}

export default Navbar;