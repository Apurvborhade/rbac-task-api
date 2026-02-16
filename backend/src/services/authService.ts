import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma.js';
import { User } from '../types.js';
import AppError from '../utils/AppError.js';
import { signToken } from '../utils/jwt.js';
import { Role } from '../../generated/prisma/enums.js';

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

export async function signinUser(email: string, password: string, user: User) {
    try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new AppError(401, "Invalid credentials");
        }
        return signToken({ id: user.id, role: user.role })
        
    } catch (error) {
        console.log("Error: (Could'nt Signin user): ", error)
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