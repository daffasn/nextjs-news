import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const ITEMS_PER_PAGE = 2

export async function GET(req) {

    const offset = (2 - 1) * ITEMS_PER_PAGE
    
    try {
        const postsCount = await prisma.post.count()
        const posts = await prisma.post.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            include: {
                author: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        const responseData = {
            totalPages: Math.ceil(postsCount / ITEMS_PER_PAGE),
            posts,
        };
         
        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(req) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }

    const {title, content, catName, image, publicId} = await req.json()

    const authorEmail = session?.user?.email

    if (!title || !content) {
        return NextResponse.json(
          { message: "Title and content are required." },
          { status: 500 }
        );
    }

    try {
        const newPost = await prisma.post.create({
            data: {
                title, content, image, publicId, catName, authorEmail
            }
        })

        console.log("Post Created")
        return NextResponse.json(newPost)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}