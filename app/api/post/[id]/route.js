import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, {params}) {

    const id = params.id
    
    try {
        const posts = await prisma.post.findMany()

        const responseData = {
            id: id,
            posts,
        };
         
        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json(error)
    }
}