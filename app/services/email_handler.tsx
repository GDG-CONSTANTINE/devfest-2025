import ReqResponse from "@/Models/req_response"




export default async function sendEmailToUser({ userName, userEmail, leaderKey }
    : { userName: string, userEmail: string, leaderKey: string }) {
    try {
        const res = await fetch('/api/send-email', {
            method: "POST",
            cache: "no-cache",
            body: JSON.stringify({
                userName,
                userEmail,
                leaderKey
            }),
            headers: {
                'content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const data = await res.json()
            return new ReqResponse("Email sent with leader key", true, "")
        }

        return new ReqResponse("Failed to Send Email", false, "")
    } catch (error) {
        if (error instanceof Error) {
            return new ReqResponse("Failed to Send Email", false, error.message)
        }
    }
}