import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Brevo SMTP connection failed:", error);
    } else {
        console.log("✅ Brevo SMTP connection successful");
    }
});