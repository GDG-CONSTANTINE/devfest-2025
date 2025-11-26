import emailBody from '@/lib/email_body';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const body = await request.json();
  const leaderName = body.userName;
  const leaderKey = body.leaderKey;
  const receiverEmail = body.userEmail;
  const email = {
    from: `GDG constantine <${process.env.SMTP_USER}>`,
    to: receiverEmail,
    subject: 'Update About Hackathon Team Creation',
    html: emailBody({ leaderName, leaderKey }),
    headers: {
      'X-Entity-Ref-ID': 'newmail',
    },
  };

  // transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(email);
    return NextResponse.json(
      { message: 'email sent secussfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}