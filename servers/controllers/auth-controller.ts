import parseRequest from "@/helpers/parse-request";
import { Hono } from "hono";
import { randomBytes } from 'crypto';
import { prisma } from "@/lib/prisma";

export const authController = new Hono();

interface LoginProps {
    email: string, username: string, password: string
}

const generateRandomToken = async (length: number) => {
    return randomBytes(length).toString('hex');
};

authController.post('/login', async (c) => {
    const request = await parseRequest<LoginProps>(c);
    const newToken = await generateRandomToken(16);

    let response;
    let dataUser;
    if (request.email !== process.env.EMAIL) {
        response = {
            success: false,
            message: "User tidak ditemukan!"
        }
    } else {
        dataUser = await prisma.user.findFirst({
            where: { email: request.email ?? process.env.EMAIL }
        })

        if (!dataUser) {
            response = {
                success: false,
                message: "User tidak ditemukan!"
            }
        } else {
            if (dataUser?.password !== request.password) {
                response = {
                    success: false,
                    message: "User tidak ditemukan!"
                }
            } else {
                dataUser = await prisma.user.update({
                    where: { user_id: dataUser?.user_id },
                    data: { token: newToken }
                })
                response = {
                    success: true,
                    message: "Berhasil Login!",
                    token: newToken,
                    data: dataUser
                }
            }
        }
    }

    return c.json(response);
})