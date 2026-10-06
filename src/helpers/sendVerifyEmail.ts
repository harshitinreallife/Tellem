import { transporter } from "@/lib/brevo";
import VerificationEmail from "../../emails/emailTemplate";
import { apiResponse } from "@/types/apiResponse";
import { render } from "@react-email/render";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<apiResponse> {
    try {
        const emailHtml = await render(
            VerificationEmail({
                username,
                otp: verifyCode,
            })
        );

        const info = await transporter.sendMail({
            from: `"Tellem" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject: "Verification Code",
            html: emailHtml,
        });

        console.log("✅ Email sent:", info.messageId);

        return {
            success: true,
            message: "Verification email sent successfully",
        };

    } catch (emailError) {
        console.error("❌ Error in sending email:", emailError);

        return {
            success: false,
            message: "Failed to send verification email",
        };
    }
}