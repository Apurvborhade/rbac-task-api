import { Role } from "../generated/prisma/enums.js"

export type User = {
    id: any,
    email: string,
    password: string,
    role: Role,
    createdAt: any
}