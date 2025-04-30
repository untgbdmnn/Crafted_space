import { prisma } from '@/lib/prisma'
import { User } from '@/prisma/generated/prisma'
import { authController } from '@/servers/controllers/auth-controller'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export interface Context {
    user?: User
}
const app = new Hono<{ Variables: Context }>().basePath('/api')

app.route('/auth', authController)

app.use('*', async (c, next) => {
    const authHeader = c.req.header('Authorization');
    const token = authHeader?.split(' ')[1];

    const user = await prisma.user.findFirst({
        where: { token: token }
    })

    c.set('user', user || undefined);
    await next();
});

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
export const PUT = handle(app)