import emailBody from '@/lib/email_body';
import nodemailer from 'nodemailer';

interface SendEmailPayload {
  userName: string;
  userEmail: string;
  leaderKey: string;
}

const createTransport = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || '',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure : false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
} as nodemailer.TransportOptions);

export default async function sendEmailToUser(payload: SendEmailPayload): Promise<{ success: boolean; message?: string; error?: string }> {
  const transporter = createTransport();
  console.log("send email process...")
  const { userName, leaderKey, userEmail } = payload;
  const email = {
    from: `GDG constantine <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: 'Update About Hackathon Team Creation',
    html: emailBody({ leaderName: userName, leaderKey }), // Matched your naming
    headers: {
      'X-Entity-Ref-ID': 'newmail',
    },
  };

  try {
    console.log("send email...")
    await transporter.sendMail(email);
    console.log("email sent")
    return { success: true, message: 'email sent successfully' };
  } catch (error) {
    console.log('Email send error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
}