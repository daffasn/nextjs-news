import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const cat = await prisma.category.findMany()
         
        return NextResponse.json(cat)
    } catch (error) {
        return NextResponse.json(error)
    }
}