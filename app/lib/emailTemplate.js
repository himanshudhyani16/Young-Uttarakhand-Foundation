/**
 * Generates a themed HTML email for YUF registration submissions.
 * Colors mirror the web form: saffron (#FF6B00), crimson (#C41E3A), gold (#D4A843), dark-green (#1B4332)
 */
export function buildEmailHtml(data) {
  const {
    membershipType,
    fullName,
    fullAddress,
    phoneNumber,
    email,
    maritalStatus,
    spouseName,
    spousePhone,
    spouseEmail,
    children,
  } = data;

  const isFamily = membershipType === "family";
  const annualFee = isFamily ? "$40" : "$20";
  const membershipLabel = isFamily ? "Family" : "Individual";
  const submittedAt = new Date().toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    dateStyle: "full",
    timeStyle: "short",
  });

  const filledChildren = (children || []).filter((c) => c && c.trim() !== "");

  /* ── helpers ── */
  const row = (label, value) =>
    value
      ? `
      <tr>
        <td style="padding:10px 16px;font-size:13px;color:#7A7A8E;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;border-bottom:1px solid #F0E8DC;width:36%;">${label}</td>
        <td style="padding:10px 16px;font-size:15px;color:#1A1A2E;border-bottom:1px solid #F0E8DC;">${value}</td>
      </tr>`
      : "";

  const sectionTitle = (icon, title) => `
    <tr>
      <td colspan="2" style="padding:20px 16px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="width:32px;height:32px;background:linear-gradient(135deg,#FF6B00,#CC5500);border-radius:8px;text-align:center;vertical-align:middle;font-size:16px;line-height:32px;">${icon}</td>
            <td style="padding-left:10px;font-family:'Georgia',serif;font-size:13px;font-weight:700;color:#C41E3A;text-transform:uppercase;letter-spacing:2px;vertical-align:middle;">${title}</td>
            <td style="padding-left:12px;"><hr style="border:none;border-top:2px solid #E0D5C7;margin:0;" /></td>
          </tr>
        </table>
      </td>
    </tr>`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New YUF Registration – ${fullName}</title>
</head>
<body style="margin:0;padding:0;background:#FFF8F0;font-family:'Helvetica Neue',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFF8F0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;">

          <!-- ── HEADER BANNER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#C41E3A 0%,#9C1830 100%);border-radius:16px 16px 0 0;padding:0;overflow:hidden;">
              <!-- Sub-banner -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:16px 24px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:rgba(0,0,0,0.25);border-radius:4px;padding:6px 20px;">
                          <span style="font-family:'Georgia',serif;font-size:12px;font-weight:700;color:#FFD700;letter-spacing:3px;text-transform:uppercase;">
                            Rangela Garhwal &nbsp;&bull;&nbsp; Chabila Kumaon
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:14px 24px 6px;">
                    <h1 style="margin:0;font-family:'Georgia',serif;font-size:26px;font-weight:900;color:#FFFFFF;letter-spacing:2px;text-transform:uppercase;line-height:1.2;">
                      Young Uttarakhand Foundation
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding:0 24px 14px;">
                    <p style="margin:0;font-family:'Georgia',serif;font-style:italic;font-size:14px;color:rgba(255,255,255,0.85);">
                      &ldquo;Rooted in culture, united in progress.&rdquo;
                    </p>
                  </td>
                </tr>
                <!-- Gold accent strip -->
                <tr>
                  <td style="height:4px;background:linear-gradient(90deg,#D4A843,#FF6B00,#D4A843);"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── ALERT BADGE ── -->
          <tr>
            <td style="background:#FFFFFF;padding:20px 24px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:linear-gradient(135deg,rgba(255,107,0,0.08),rgba(212,168,67,0.08));border:1.5px solid rgba(212,168,67,0.35);border-radius:10px;padding:14px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-size:22px;width:36px;vertical-align:middle;">🔔</td>
                        <td style="vertical-align:middle;padding-left:10px;">
                          <p style="margin:0;font-size:13px;font-weight:700;color:#CC5500;text-transform:uppercase;letter-spacing:1px;">New Registration Received</p>
                          <p style="margin:4px 0 0;font-size:12px;color:#7A7A8E;">${submittedAt} (Mountain Time)</p>
                        </td>
                        <td align="right" style="vertical-align:middle;">
                          <span style="display:inline-block;background:linear-gradient(135deg,#1B4332,#2D6A4F);color:#fff;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;letter-spacing:1px;">
                            ${membershipLabel} &bull; ${annualFee}/yr
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── MAIN CONTENT CARD ── -->
          <tr>
            <td style="background:#FFFFFF;padding:8px 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="border:1.5px solid #E0D5C7;border-radius:12px;overflow:hidden;">

                ${sectionTitle("👤", "Personal Information")}
                ${row("Full Name", fullName)}
                ${row("Address", fullAddress ? fullAddress.replace(/\n/g, "<br>") : "")}
                ${row("Phone", phoneNumber)}
                ${row("Email", email ? `<a href="mailto:${email}" style="color:#FF6B00;text-decoration:none;">${email}</a>` : "")}
                ${row("Marital Status", maritalStatus ? maritalStatus.charAt(0).toUpperCase() + maritalStatus.slice(1) : "")}
                ${row("Membership", `${membershipLabel} – ${annualFee} / year`)}

                ${isFamily && (spouseName || spousePhone || spouseEmail) ? `
                  ${sectionTitle("💑", "Spouse Information")}
                  ${row("Spouse Name", spouseName)}
                  ${row("Spouse Phone", spousePhone)}
                  ${row("Spouse Email", spouseEmail ? `<a href="mailto:${spouseEmail}" style="color:#FF6B00;text-decoration:none;">${spouseEmail}</a>` : "")}
                ` : ""}

                ${isFamily && filledChildren.length > 0 ? `
                  ${sectionTitle("👧", "Children")}
                  ${filledChildren.map((c, i) => row(`Child ${i + 1}`, c)).join("")}
                ` : ""}

              </table>
            </td>
          </tr>

          <!-- ── ACTION PROMPT ── -->
          <tr>
            <td style="background:#FFFFFF;padding:0 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:linear-gradient(135deg,#1B4332,#2D6A4F);border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;font-family:'Georgia',serif;font-size:15px;font-weight:700;color:#E8C76A;text-transform:uppercase;letter-spacing:1px;">
                      💳 Payment Information
                    </p>
                    <p style="margin:0 0 14px;font-size:13px;color:rgba(255,255,255,0.8);line-height:1.6;">
                      Membership fees and donations can be paid by e-transfer to:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right:8px;" width="50%">
                          <a href="tel:403-400-5539" style="display:block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:10px 14px;text-decoration:none;color:#fff;">
                            <span style="font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.5px;display:block;">Phone</span>
                            <span style="font-size:14px;font-weight:600;">📞 403-400-5539</span>
                          </a>
                        </td>
                        <td width="50%">
                          <a href="mailto:uttarakhandsociety@gmail.com" style="display:block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:10px 14px;text-decoration:none;color:#fff;">
                            <span style="font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.5px;display:block;">Email</span>
                            <span style="font-size:13px;font-weight:600;">✉️ uttarakhandsociety@gmail.com</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0;font-size:12px;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:6px;">
                      📍 Records Office: 6102-2255, 32 ST N.E. Calgary, AB T1Y 0C2
                      &nbsp;&nbsp;<span style="background:rgba(212,168,67,0.25);border:1px solid rgba(212,168,67,0.35);border-radius:4px;padding:2px 8px;color:#E8C76A;font-weight:700;">#0117</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#C41E3A,#9C1830);border-radius:0 0 16px 16px;padding:16px 24px;text-align:center;">
              <!-- Gold strip at top -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
                <tr><td style="height:3px;background:linear-gradient(90deg,#D4A843,#FF6B00,#D4A843);border-radius:2px;"></td></tr>
              </table>
              <p style="margin:0;font-family:'Georgia',serif;font-size:13px;color:rgba(255,255,255,0.7);">
                This email was automatically generated by the<br/>
                <strong style="color:#FFD700;">Young Uttarakhand Foundation</strong> registration system.
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);">
                🙏 Jai Uttarakhand
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

/**
 * Plain-text fallback for email clients that don't render HTML.
 */
export function buildEmailText(data) {
  const {
    membershipType,
    fullName,
    fullAddress,
    phoneNumber,
    email,
    maritalStatus,
    spouseName,
    spousePhone,
    spouseEmail,
    children,
  } = data;

  const isFamily = membershipType === "family";
  const fee = isFamily ? "$40" : "$20";
  const lines = [
    "YOUNG UTTARAKHAND FOUNDATION – NEW REGISTRATION",
    "=".repeat(50),
    "",
    "PERSONAL INFORMATION",
    "-".repeat(30),
    `Full Name:      ${fullName}`,
    `Address:        ${fullAddress}`,
    `Phone:          ${phoneNumber}`,
    `Email:          ${email}`,
    `Marital Status: ${maritalStatus}`,
    `Membership:     ${isFamily ? "Family" : "Individual"} – ${fee}/year`,
  ];

  if (isFamily && spouseName) {
    lines.push("", "SPOUSE INFORMATION", "-".repeat(30));
    lines.push(`Spouse Name:  ${spouseName}`);
    if (spousePhone) lines.push(`Spouse Phone: ${spousePhone}`);
    if (spouseEmail) lines.push(`Spouse Email: ${spouseEmail}`);
  }

  const filledChildren = (children || []).filter((c) => c && c.trim());
  if (isFamily && filledChildren.length > 0) {
    lines.push("", "CHILDREN", "-".repeat(30));
    filledChildren.forEach((c, i) => lines.push(`Child ${i + 1}: ${c}`));
  }

  lines.push(
    "",
    "=".repeat(50),
    "Jai Uttarakhand 🙏",
    "Young Uttarakhand Foundation Registration System"
  );

  return lines.join("\n");
}
