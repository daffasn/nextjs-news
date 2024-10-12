import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const ITEMS_PER_PAGE = 10

export async function GET(req, {params}) {

    const session = await getServerSession(authOptions)
    
    const email = params.email

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    } else if (session.user.email !== email) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }

    
    const currentPage = Number(params.numberPage)

    const offset = (currentPage - 1) * ITEMS_PER_PAGE

    try {
        const posts = await prisma.post.findMany({
            where: {authorEmail: email},
            skip: offset,
            take: ITEMS_PER_PAGE,
            orderBy: {
                createdAt: 'desc',
            },
        })

        const postsCount = await prisma.post.count({
            where: {authorEmail: email}
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