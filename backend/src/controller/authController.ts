import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { createUser, hashPassword } from "../services/authService.js";

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
        if (role) {
            throw new AppError(400, "Please select a user role")
        }
        const hashedPassword = await hashPassword(password);

        if (!hashedPassword) {
            throw new AppError(500, "Failed to create user")
        }
        
        // Create User
        const user = await createUser(email, hashedPassword, role);

        // Set Http Cookie
        // res.cookie("token", jwtToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 1000 * 60 * 60 * 24, // 1 day
        // });

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
    try {
        // Login 
    } catch (error) {
        next(error)
    }
}