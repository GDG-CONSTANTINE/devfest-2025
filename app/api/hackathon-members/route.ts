import { db } from "@/lib/firebase";
import generateShortLeaderKey from "@/lib/uuid_generator";
import ReqResponse from "@/Models/req_response";
import { HackathonEntry } from "@/Types/hackathon_entry";
import { addDoc, collection, doc, getDocs, increment, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import sendEmailToUser from "@/app/services/email_handler";
import { NextRequest, NextResponse } from 'next/server';

const participantsCollection = collection(db, 'participants');
const teamsCollection = collection(db, 'teams');
const leaderKeyLength = 8;

// Server-side helper functions
const isCodeUnique = async (code: string) => {
  const q = query(teamsCollection, where('leaderKey', '==', code));
  const snapshot = await getDocs(q);
  return snapshot.empty;
};

const isUserInTeam = async (fullName: string) => {
  const q = query(participantsCollection, where('fullName', '==', fullName));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

// Server-side createTeamInDb (internal)
async function createTeamInDb(hackathonEntry: HackathonEntry): Promise<ReqResponse> {
  try {
    const EMAIL_SENDING_RETRIES = 10;
    const MAX_KEY_RETRIES = 10;
    const RETRY_DELAY_MS = 1000;

    let emailCurrentRetry = 0;
    let keyRetryCount = 0;
    let emailSent = false;

    if (!hackathonEntry || (hackathonEntry.role === "member" && hackathonEntry.leader_key)) {
      return new ReqResponse("Request format incorrect: creating a team leader key must be empty", false, null);
    }

    let leaderKeyValue = generateShortLeaderKey(leaderKeyLength);
    let isUnique = await isCodeUnique(leaderKeyValue);

    while (!isUnique && keyRetryCount < MAX_KEY_RETRIES) {
      leaderKeyValue = generateShortLeaderKey(leaderKeyLength);
      isUnique = await isCodeUnique(leaderKeyValue);
      keyRetryCount++;
    }

    if (!isUnique) {
      return new ReqResponse("Failed to generate unique leader key after multiple attempts (code 441)", false, null);
    }

    const userEmail = hackathonEntry.email;
    const userName = hackathonEntry.full_name;

    while (!emailSent && emailCurrentRetry < EMAIL_SENDING_RETRIES) {
      const res = await sendEmailToUser({
        userName,
        userEmail,
        leaderKey: leaderKeyValue
      });

      if (res && res.success) {
        emailSent = true;
      } else {
        emailCurrentRetry++;

        if (!emailSent && emailCurrentRetry < EMAIL_SENDING_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
        }
      }
    }

    if (!emailSent) {
      return new ReqResponse(`Failed to send email after ${EMAIL_SENDING_RETRIES} attempts`, false, null);
    }

    await setDoc(doc(db, "teams", leaderKeyValue), {
      teamName: hackathonEntry.team_name,
      leaderKey: leaderKeyValue,
      leaderName: hackathonEntry.full_name,
      leaderEmail: hackathonEntry.email,
      state: "Pending",
      membersCount: 1,
      note: "",
      createdAt: Timestamp.now(),
    });

    return new ReqResponse("Team created successfully", true, leaderKeyValue);
  } catch (error) {
    if (error instanceof Error) {
      return new ReqResponse(`Failed to create team: ${error.name}`, false, error.message);
    }
    return new ReqResponse("Unknown error occurred while creating team", false, null);
  }
};

// Server-side createNewHackathonMember
async function createNewHackathonMember(hackathonEntry: HackathonEntry): Promise<ReqResponse> {
  try {
    console.log("start creating....")
    let leaderKey = null;
    let leaderNote = null;

    const isUserAlreadyInTeam = await isUserInTeam(hackathonEntry.full_name);
    if (isUserAlreadyInTeam) {
      return new ReqResponse("Can't join more then one team", false, "You're already a part of another team if you wanna switch teams feel free to connect us on owr email address!");
    }

    if (hackathonEntry.role === "leader") {
      console.log("star creating team process...")
      hackathonEntry.leader_key = null
      const newTeamRes = await createTeamInDb(hackathonEntry);
      if (newTeamRes && newTeamRes.success) {
        leaderKey = newTeamRes.data;
        leaderNote = "Leader key have been sent to your email ask your team mates to use it to join your team";
      } else {
        return newTeamRes;
      }
    } else {
      const leaderCodeIsNew = await isCodeUnique(hackathonEntry.leader_key!);
      if (leaderCodeIsNew) {
        return new ReqResponse("No team with that leader key", false, "check the leader key and try again no team use that key");
      }
    }

    await addDoc(participantsCollection, {
      fullName: hackathonEntry.full_name,
      email: hackathonEntry.email,
      phoneNumber: hackathonEntry.phone_number,
      universityOrCompany: hackathonEntry.university_or_company,
      TshirtSize: hackathonEntry.t_shirt_size,
      role: hackathonEntry.role,
      linkedinUrl: hackathonEntry.linkedin_url,
      githubUrl: hackathonEntry.github_url,
      portfolioUrl: hackathonEntry.portfolio_url,
      teamName: hackathonEntry.team_name,
      leaderKey: hackathonEntry.role === "leader" ? leaderKey : hackathonEntry.leader_key,
      whyParticipate: hackathonEntry.why_participate,
      createdAt: Timestamp.now(),
      note: "",
    });

    if (hackathonEntry.role === "member" && hackathonEntry.leader_key) {
      await updateDoc(doc(db, "teams", hackathonEntry.leader_key), {
        membersCount: increment(1)
      });
    }

    return new ReqResponse("Joined The Team!", true, (leaderNote ? `Your team was created ${leaderNote}` : "You have joined the team successfully"));
  } catch (error) {
    if (error instanceof Error) {
      return new ReqResponse(`failed to join team : ${error.name}`, false, error.message);
    }
    return new ReqResponse("Unknown error occurred while joining team", false, null);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const hackathonEntry = body as HackathonEntry;

    // Basic validation (add more as needed)
    if (!hackathonEntry || !hackathonEntry.full_name || !hackathonEntry.email) {
      return NextResponse.json({ message: 'Missing required fields: full_name, email' }, { status: 400 });
    }

    const result = await createNewHackathonMember(hackathonEntry);
    return NextResponse.json({
      success: result.success,
      message: result.message,
      data: result.data,
      error: result.message,
    }, { status: result.success ? 200 : 400 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}