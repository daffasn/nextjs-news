import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const ITEMS_PER_PAGE = 10

export async function GET(req, {params}) {

    const catName = params.catName

    const query = params.query

    const currentPage = Number(params.numberPage)

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        const posts = await prisma.post.findMany({
            where: {
                catName,
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

        const postsCount = await prisma.post.count({
            where: {
                catName,
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
            }
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