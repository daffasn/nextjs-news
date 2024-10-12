import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, {params}) {

    const id = params.id
    
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
            }
        })
         
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json(error)
    }
}