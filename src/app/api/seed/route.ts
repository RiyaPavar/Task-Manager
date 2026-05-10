import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: 'Using mock data mode. No seeding required.' });
}
