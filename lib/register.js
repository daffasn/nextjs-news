"use server"

import { prisma } from "./prisma";
import { signUpSchema } from "./zod";
import bcryptjs from "bcryptjs"

export async function handleSignUp({name, email, password, confirmPassword}) {
    try {
        const parsedCredentials = signUpSchema.safeParse({ name, email, password, confirmPassword });
        if (!parsedCredentials.success) {
            return { success: false, message: "Invalid data." };
        }

        // check if the email is already taken
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return { success: false, message: "Email already exists. Login to continue." };
        }

                // hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return { success: true, message: "Account created successfully." };
    } catch (error) {
        console.error("Error creating account:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}