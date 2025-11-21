import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendMail = async ({ to, subject, html, attachments = [] }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,     // smtp-relay.brevo.com
      port: process.env.MAIL_PORT,     // 587
      secure: false,                   // IMPORTANT pour 587 (TLS)
      auth: {
        user: process.env.MAIL_USER,   // Login SMTP Brevo
        pass: process.env.MAIL_PASS,   // Password SMTP Brevo
      },
    });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email envoyé à :", to);
  } catch (error) {
    console.error("Erreur envoi email :", error);
    throw error;
  }
};
