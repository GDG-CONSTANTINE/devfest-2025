import ReqResponse from "@/Models/req_response";
import { HackathonEntry } from "@/Types/hackathon_entry";

const API_BASE = '/api'; // Adjust if using a different base path

// Helper function to make POST requests to API routes
async function apiPost<T>(endpoint: string, body: T): Promise<ReqResponse> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new ReqResponse(data.message, data.success, data.data || data.error);
  } catch (error) {
    console.error('API call failed:', error);
    return new ReqResponse('Network or API error occurred', false, error instanceof Error ? error.message : null);
  }
}

// Client-side wrapper for createNewAttendant
async function createNewAttendant({ full_name, email }: { full_name: string, email: string }): Promise<ReqResponse> {
  return apiPost('/attendants', { full_name, email });
}

// Client-side wrapper for createNewHackathonMember
async function createNewHackathonMember(hackathonEntry: HackathonEntry): Promise<ReqResponse> {
  return apiPost('/hackathon-members', hackathonEntry);
}


// Optional: Client-side wrapper for joinWorkShop (not exported originally, but included for completeness)
async function joinWorkShop({ fullName, email, workshopTitle }: { fullName: string, email: string, workshopTitle: string }): Promise<ReqResponse> {
  return apiPost('/workshops', { fullName, email, workshopTitle });
}

export {
  createNewAttendant,
  createNewHackathonMember,
  joinWorkShop,
};