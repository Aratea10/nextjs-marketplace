"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { loginSchema } from "@/schemas/login.schema";
import { createToken, setAuthCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export type LoginState = {
    errors?: Record<string, string>;
    message?: string;
};

export async function loginAction(
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    const raw = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(raw);

    if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
            const field = issue.path[0] as string;
            fieldErrors[field] = issue.message;
        }
        return { errors: fieldErrors };
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return { message: "Email o contraseña incorrectos" };
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
        return { message: "Email o contraseña incorrectos" };
    }

    const token = await createToken({
        userId: user.id,
        email: user.email,
    });

    await setAuthCookie(token);

    redirect("/");
}
