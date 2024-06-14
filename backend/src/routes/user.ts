import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import {signupInput,signinInput} from '@nikhil_pradhan/medium-common';
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,

    }
}>();

// whatever you wanted is present in c(context) req,res,env varilbe and more
userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } =signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message: "Not Valid Input"
        })
    }

    try {

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        // Perform signup logic here (e.g., save to database)
        // For now, just sending a success response
        return c.json({
            jwt: token
        })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }



});





userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message: "Not Valid Input"
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if (!user) {
        c.status(403);
        return c.json({
            error: "User not found"
        });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
        jwt: token
    });
});
