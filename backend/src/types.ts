import { Role } from "@prisma/client/index.js"

export type User = {
    id: any,
    email: string,
    password: string,
    role: Role,
    createdAt: any
}