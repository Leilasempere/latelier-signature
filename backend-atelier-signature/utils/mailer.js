import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, firstName) => {
  try {
    // ✅ Génère un vrai token JWT avec la même clé que dans ton .env
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24h" });

    // ✅ Lien de confirmation avec le token
    const confirmationLink = `http://localhost:5000/api/users/verify?token=${token}`;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Confirmez votre inscription - L’Atelier Signature",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;
                    border:1px solid #eee;border-radius:10px;">
          <h2 style="color:#c27ba0;">Bienvenue ${firstName} 💫</h2>
          <p>Merci de votre inscription sur <b>L’Atelier Signature</b>.</p>
          <p>Pour activer votre compte, cliquez sur le bouton ci-dessous :</p>
          <p style="text-align:center;margin:30px 0;">
            <a href="${confirmationLink}"
               style="background-color:#c27ba0;color:#fff;padding:12px 20px;
                      text-decoration:none;border-radius:8px;font-weight:bold;">
               ✅ Confirmer mon inscription
            </a>
          </p>
          <p>Ce lien est valable 24 heures.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📩 Mail de confirmation envoyé à ${email}`);
  } catch (error) {
    console.error("Erreur lors de l’envoi du mail :", error);
  }
};
