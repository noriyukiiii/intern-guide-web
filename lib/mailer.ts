import nodemailer from "nodemailer";

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // ใช้อีเมลที่ใช้ส่ง
      pass: process.env.EMAIL_PASS, // ใช้ App Password
    },
  });

  const url = `${process.env.NEXT_PUBLIC_BASE_RES_API}`;
  const verificationUrl = `${url}/user/verify?token=${token}`;

  const emailTemplate = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f4f4f4;">
    <h2 style="text-align: center; color: #4CAF50;">Verify Your Email</h2>
    <p style="font-size: 16px; color: #555;">
      Hello,
    </p>
    <p style="font-size: 16px; color: #555;">
      Thank you for registering with our service. Please click the button below to verify your email address and complete your registration.
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
        Verify Email
      </a>
    </div>
    <p style="font-size: 16px; color: #555;">
      If you did not create an account, no further action is required.
    </p>
    <p style="font-size: 16px; color: #555;">
      Best regards,<br/>
      The MyApp Team
    </p>
  </div>
`;

  try {
    await transporter.sendMail({
      from: `"MyApp" <no-reply@myapp.com>`,
      to: email,
      subject: "Verify Your Email",
      html: emailTemplate,
    });
    console.log(`Sending verification email to: ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
