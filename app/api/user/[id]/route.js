import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req, { params }) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }

    try {
        const id = params.id
        const user = await prisma.user.findUnique({
            where: { id }
        })
         
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req, { params }) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }
     
    const id = params.id
    
    const {name, email, password, image, publicId} = await req.json()

    console.log("GET INFO USER:", {name, email, password, image, publicId});

    const existingUsers = await prisma.user.findMany({
        where: {
            email: email,
            id: { not: id }
        },
        select: {
            id: true,
        },
    });
    
    if (existingUsers.length > 0) {
        return NextResponse.json({ message: 'Email is already in use' }, { status: 400 });
    }

    let resPassword

    if (password === undefined || password === null) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: { password: true }
        });

        resPassword = user.password   
    } else {
        resPassword = await bcryptjs.hash(password, 10);
    }


    try {
        await prisma.user.update({
            where: {
                id
            },
            data: {
                name, email, password: resPassword, image, publicId
            }
        })

        return NextResponse.json('HELLO SUCCESS')
    } catch (error) {
        return NextResponse.json({ message: "Error editing post", error: error }, { status: 500 })
    }
}