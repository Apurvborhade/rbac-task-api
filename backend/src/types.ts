
export enum Role {
    USER,
    ADMIn
}
export type User = {
    id: any,
    email: string,
    password: string,
    role: string,
    createdAt: any
}