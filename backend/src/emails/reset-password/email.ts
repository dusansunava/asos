import { createTransporter } from "@/config/email";
import { intlArgs, intl, replacedHtml } from "@/services/utils";
import fs from "fs";
import path from "path";

const CreateResetPasswordEmail = async (
  language: string,
  username: string,
  resetToken: string,
  email: string
) => {
  try {
    const translations = await intl(language);
    const emailGreeting = intlArgs(
      { username },
      translations["ResetPasswordEmail.emailGreeting"]
    );

    const transporter = createTransporter();
    const verifyLink = `${process.env.SERVER_HOST}:${process.env.FE_PORT}/reset-password?resetToken=${resetToken}`;
    const emailData: { [key: string]: string } = {
      emailTitle: translations["ResetPasswordEmail.subject"],
      emailGreeting: emailGreeting,
      emailDescription: translations["ResetPasswordEmail.emailDescription"],
      resetLink: verifyLink,
      resetButton: translations["ResetPasswordEmail.resetButton"],
    };
    const htmlTemplate = fs.readFileSync(
      path.join(
        path.resolve(),
        "src",
        "emails",
        "reset-password",
        "email.html"
      ),
      "utf-8"
    );

    const html = replacedHtml(emailData, htmlTemplate);
    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: translations["ResetPasswordEmail.subject"],
      text: translations["ResetPasswordEmail.subject"],
      html: html,
    });
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

export default CreateResetPasswordEmail;
