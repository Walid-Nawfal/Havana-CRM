export interface User {
    username: string;
    displayName: string;
    token: string;
    company: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    company: string;
}