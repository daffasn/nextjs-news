import { NextResponse } from "next/server"

async function GET(req) {
    return NextResponse.json('HELLO WORLD')
}