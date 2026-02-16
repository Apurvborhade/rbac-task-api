import bcrypt from 'bcrypt'
import { prisma } from '../utils/prisma.js';
import { User } from '../types.js';
import AppError from '../utils/AppError.js';
import { signToken } from '../utils/jwt.js';
import { Role } from '../../generated/prisma/enums.js';

const SALT_ROUNDS = 10;

export async function createUser(email: string, hashedPassword: string, role?: Role) {

    const userRole: Role = role ?? Role.USER;

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: userRole as any
        }
    })

    return user

}

export async function signinUser(email: string, password: string, user: User) {

    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch)
    if (!isMatch) {
        throw new AppError(401, "Invalid credentials");
    }

    return signToken({ id: user.id, role: user.role })

}

export async function hashPassword(plainTextPassword: string) {

    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(plainTextPassword, salt)

    return hash;

}