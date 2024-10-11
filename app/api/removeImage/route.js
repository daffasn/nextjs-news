import cloudinary from "cloudinary"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const removeImage = async(publicIdTemp) => {
    try {
        const res = await cloudinary.v2.uploader.destroy(publicIdTemp)
        console.log("Image removed")
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req) {

    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated!" }, { status: 401 })
    }

    const {publicIdTemp} = await req.json()
    await removeImage(publicIdTemp)
    return NextResponse.json({message: "success"})
}