import nodemailer from "nodemailer";
import { buildEmailHtml, buildEmailText } from "@/app/lib/emailTemplate";

/**
 * POST /api/send-email
 * Body: registration form data JSON
 * Sends a themed email via Gmail SMTP using an App Password.
 */
export async function POST(request) {
  try {
    const data = await request.json();

    /* ── validate required fields ── */
    const { fullName, phoneNumber, email, membershipType } = data;
    if (!fullName || !phoneNumber || !email || !membershipType) {
      return Response.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    /* ── check env vars ── */
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.RECIPIENT_EMAIL || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env.local");
      return Response.json(
        { success: false, error: "Server email configuration is missing." },
        { status: 500 }
      );
    }

    /* ── create transporter ── */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const isFamily = membershipType === "family";
    const membershipLabel = isFamily ? "Family" : "Individual";
    const fee = isFamily ? "$40" : "$20";

    /* ── send email ── */
    await transporter.sendMail({
      from: `"YUF Registration" <${gmailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `🏔️ New ${membershipLabel} Registration – ${fullName} (${fee}/yr)`,
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return Response.json(
      { success: false, error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
