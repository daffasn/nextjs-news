import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const ITEMS_PER_PAGE = 10

export async function GET(req, {params}) {

    const currentPage = Number(params.numberPage)

    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    
    try {
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

        const postsCount = await prisma.post.count()

        const responseData = {
            totalPages: Math.ceil(postsCount / ITEMS_PER_PAGE),
            posts,
        };
         
        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json(error)
    }
}