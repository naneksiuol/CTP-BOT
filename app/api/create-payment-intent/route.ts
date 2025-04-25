import { NextResponse } from "next/server"

export async function POST(request: Request) {
  return NextResponse.json({ message: "Donation system is currently being set up." }, { status: 503 })
}
