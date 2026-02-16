import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { createUser, hashPassword, signinUser } from "../services/authService.js";
import { signToken } from "../utils/jwt.js";
import { prisma } from "../utils/prisma.js";

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    // Register
    const { email, password, role } = req.body;

    try {
        if (!email) {
            throw new AppError(400, "Please enter an email address")
        }
        if (!password) {
            throw new AppError(400, "Please enter a password")
        }
        if (!role) {
            throw new AppError(400, "Please select a user role")
        }

        const userAlreadyExists = await prisma.user.findUnique({ where: { email } });

        if (userAlreadyExists) {
            throw new AppError(400, "User Already Exists")
        }
        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            throw new AppError(500, "Failed to create user")
        }

        // Create User
        const user = await createUser(email, hashedPassword, role);

        if (!user) {
            throw new AppError(500, "Failed to create User")
        }


        const jwtToken = await signToken({ id: user?.id, role: user.role })

        // Set Http Cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        res.send({
            success: true, message: "User created successfully", data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
    // Login 
    const { email, password } = req.body;
    try {
        if (!email) {
            throw new AppError(400, "Please enter an email address")
        }
        if (!password) {
            throw new AppError(400, "Please enter a password")
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const jwtToken = await signinUser(email, password, user);

        // Set Http Cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        res.send({
            success: true, message: "User Logged in successfully", data: {
                user
            }
        })

    } catch (error) {
        next(error)
    }
}