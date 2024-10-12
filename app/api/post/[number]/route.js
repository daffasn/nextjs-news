import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req, {params}) {
    
    const id = params.number

    try {
        const res = await prisma.post.findMany()
        
        const responseData = {
            id: id,
            res,
        };

        return NextResponse.json(responseData)
    } catch (error) {
        return NextResponse.json(error)
    }
}