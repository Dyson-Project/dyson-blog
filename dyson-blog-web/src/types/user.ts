export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}