import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, {params}) {

    const query = params.query

    try {
        const post = await prisma.post.findMany({
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
        })
         
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json(error)
    }
}