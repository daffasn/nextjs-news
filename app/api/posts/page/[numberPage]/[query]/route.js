import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const ITEMS_PER_PAGE = 10

export async function GET(req, {params}) {

    const currentPage = Number(params.numberPage)
    const query = params.query

    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    
    try {
        const posts = await prisma.post.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        authorEmail: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
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
        });
        
        const postsCount = await prisma.post.count({
            where: {
                OR: [
                    {
                        title: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        authorEmail: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        });

        const responseData = {
            totalPages: Math.ceil(postsCount / ITEMS_PER_PAGE),
            posts,
        };
         
        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json(error)
    }
}