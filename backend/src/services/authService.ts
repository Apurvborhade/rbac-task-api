import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma.js';
import { Role } from '../types.js';

const SALT_ROUNDS = 10;

export async function createUser(email: string, hashedPassword: string, role?: Role) {
    try {
        const userRole: Role = role ?? Role.USER;

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: userRole as any
            }
        })

        return user
    } catch (error) {
        console.log("Error (User create): ", error)
    }
}

export async function hashPassword(plainTextPassword: string) {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hash = await bcrypt.hash(plainTextPassword, salt)

        return hash;
    } catch (error) {
        console.log("Error:(Password Hash) ", error)
    }
}