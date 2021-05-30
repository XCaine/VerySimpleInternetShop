export interface User {
    url: string,
    password: string,
    last_login: Date,
    is_superuser: boolean,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_active: boolean,
    date_joined: Date,
    groups: string[],
    user_permissions: string[]
}