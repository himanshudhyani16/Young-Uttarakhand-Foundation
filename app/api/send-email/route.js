import nodemailer from "nodemailer";
import { buildEmailHtml, buildEmailText } from "@/app/lib/emailTemplate";

/**
 * POST /api/send-email
 * Body: multipart/form-data (FormData) — includes all registration fields
 *       plus an optional "paymentScreenshot" file.
 * Sends a themed HTML email via Gmail SMTP with the screenshot as an attachment.
 */
export async function POST(request) {
  try {
    const fd = await request.formData();

    /* ── extract text fields ── */
    const data = {
      membershipType: fd.get("membershipType") || "",
      fullName:       fd.get("fullName")       || "",
      fullAddress:    fd.get("fullAddress")     || "",
      phoneNumber:    fd.get("phoneNumber")     || "",
      email:          fd.get("email")           || "",
      maritalStatus:  fd.get("maritalStatus")   || "",
      familyMembers:  JSON.parse(fd.get("familyMembers") || "[]"),
    };

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

    /* ── handle optional payment screenshot attachment ── */
    const attachments = [];
    const screenshotFile = fd.get("paymentScreenshot");

    if (screenshotFile && screenshotFile.size > 0) {
      const arrayBuffer = await screenshotFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: screenshotFile.name || "payment-screenshot",
        content: buffer,
        contentType: screenshotFile.type || "application/octet-stream",
      });
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
    const hasScreenshot = attachments.length > 0;

    /* ── send email ── */
    await transporter.sendMail({
      from:     `"YUF Registration" <${gmailUser}>`,
      to:       recipient,
      replyTo:  email,
      subject:  `🏔️ New ${membershipLabel} Registration – ${fullName} (${fee}/yr)${hasScreenshot ? " 📎" : ""}`,
      text:     buildEmailText(data, hasScreenshot),
      html:     buildEmailHtml(data, hasScreenshot),
      attachments,
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
