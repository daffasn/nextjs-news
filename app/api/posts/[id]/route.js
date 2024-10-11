import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req, {params}) {
    
    const id = params.id

    try {
        const res = await prisma.post.findUnique({
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
        
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req, { params }) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }

    const {title, content, catName, image, publicId} = await req.json()

    const id = params.id

    try {
        const post = await prisma.post.update({
            where: {id},
            data: {
                title, content, image, publicId, catName
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ message: "Error editing post" })
    }
}

export async function DELETE(req, { params }) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }
    
    const id = params.id

    try {
        const post = await prisma.post.delete({ 
            where: {id}
        })

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ message: "Error deleting post" })
    }
}