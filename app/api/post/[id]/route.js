import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, {params}) {

    const id = params.id
    
    try {
        const posts = await prisma.post.findUnique({
            where: {
                id: id
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

        const responseData = {
            id: id,
            posts,
        };
         
        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json(error)
    }
}