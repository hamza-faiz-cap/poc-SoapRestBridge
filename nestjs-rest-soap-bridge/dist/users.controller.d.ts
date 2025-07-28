interface User {
    id?: number;
    name: string;
    email: string;
}
export declare class UsersController {
    private readonly logger;
    getAllUsers(): Promise<User[]>;
    addUser(user: User): Promise<User>;
}
export {};
