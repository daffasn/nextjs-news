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

export async function PUT(req, { params }) {

    const {title, content, catName, image, publicId} = await req.json()

    const id = params.id

    try {
        const post = await prisma.post.update({
            where: {
                id
            },
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
    
    const id = params.id

    try {
        const post = await prisma.post.delete({ 
            where: {
                id
            }
        })

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ message: "Error deleting post" })
    }
}