import { Profile } from "./Profile";

export interface User{
    data: {
        _id?: number;
        firstName?: string;
        token: string;
        lastName?: string;
        email: string;
        isAuthenticate?: string;
        name: string;
    }
}