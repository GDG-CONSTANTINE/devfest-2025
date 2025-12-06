import { db } from "@/lib/firebase";
import ReqResponse from "@/Models/req_response";
import { addDoc, collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from 'next/server';

const attendantsCollection = collection(db, 'attendants');

// Server-side implementation of isUserAlreadyAttend
const isUserAlreadyAttend = async (email: string) => {
    const q = query(attendantsCollection, where('email', '==', email));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
};

// Server-side createNewAttendant
async function createNewAttendant({ full_name, email }: { full_name: string, email: string }): Promise<ReqResponse> {
    try {
        const isUserAttended = await isUserAlreadyAttend(email);
        if (isUserAttended) {
        return new ReqResponse("You're Already registered", false, "You're already registered in the event no need for doing it again");
        }

        await addDoc(attendantsCollection, {
        fullName: full_name,
        email: email,
        attendeesState: false,
        createdAt: Timestamp.now()
        });

        return new ReqResponse("You've been Registered", true, null);
    } catch (error) {
        if (error instanceof Error) {
        return new ReqResponse(`failed to register to event : ${error.name}`, false, error.message);
        }
        return new ReqResponse("Unknown error occurred while registering", false, null);
    }
    }

    export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { full_name, email } = body;

        if (!full_name || !email) {
        return NextResponse.json({ message: 'Missing required fields: full_name, email' }, { status: 400 });
        }

        const result = await createNewAttendant({ full_name, email });
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