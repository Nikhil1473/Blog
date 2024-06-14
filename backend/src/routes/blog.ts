import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { createPostInput , updatePostInput} from '@nikhil_pradhan/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string; 
    }
}>();


blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";
    // Bearer Token => ["Bearer", "token"];
    const token = header.split(" ")[1];
    
    try {
        const response: any = await verify(token, c.env.JWT_SECRET);
        
        if (!response) {
            c.status(403);
            return c.json({ error: "Unauthorized" });
        } else {
            c.set('userId', String(response.id)); 
            await next();  // Ensure next() is awaited
        }
    } catch (err) {
        c.status(403);
        return c.json({ error: "Unauthorized" });
    }
});


blogRouter.post('/', async (c) => {
    const authorId = c.get('userId');
    if (!authorId) {
        c.status(400);
        return c.json({ error: "User ID not found" });
    }

    const body = await c.req.json();
 
    const {success}=createPostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message: "Not Valid Input"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId 
        }
    });
    
    return c.json({
        id: post.id,
    });
});


blogRouter.put('/', async (c) => {
    const userId = c.get('userId');
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {success}=updatePostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
        message: "Not Valid Input"
        })
    }
    const post = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({
        id: post.id,
    });
});


blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:true
        }
    });

    return c.json({
        post
    });
});



blogRouter.get('/:id', async (c) => {
    const id = await c.req.param('id');

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
        where: {
            id:id
        }
        select: {
            title: true,
            content: true,
            author:{
                select:{
                    name:true,
                }
            }
        }
    });

    return c.json({
        post
    });
});

