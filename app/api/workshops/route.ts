import { db } from "@/lib/firebase";
import ReqResponse from "@/Models/req_response";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';

async function joinWorkShop({ fullName, email, workshopTitle }: { fullName: string, email: string, workshopTitle: string }): Promise<ReqResponse> {
  try {
    await addDoc(collection(db, "WorkShops", workshopTitle, "participants"), {
      fullName: fullName,
      email: email
    });
    return new ReqResponse("Joined workshop successfully", true, null);
  } catch (error) {
    if (error instanceof Error) {
      return new ReqResponse(`Failed to join workshop: ${error.name}`, false, error.message);
    }
    return new ReqResponse("Unknown error occurred while joining workshop", false, null);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, workshopTitle } = body;

    if (!fullName || !email || !workshopTitle) {
      return NextResponse.json({ message: 'Missing required fields: fullName, email, workshopTitle' }, { status: 400 });
    }

    const result = await joinWorkShop({ fullName, email, workshopTitle });
    return NextResponse.json({
      success: result.success,
      message: result.message,
      data: result.data,
      error: result.message,
    }, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}