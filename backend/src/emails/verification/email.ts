import { createTransporter } from "@/config/email";
import { intlArgs, intl, replacedHtml } from "@/services/utils";
import fs from "fs";
import path from "path";

const CreateVerificationEmail = async (
  language: string,
  username: string,
  verifyToken: string,
  email: string
) => {
  try {
    const translations = await intl(language);
    const emailGreeting = intlArgs(
      { username },
      translations["VerificationEmail.emailGreeting"]
    );
    const transporter = createTransporter();
    const verifyLink = `${process.env.SERVER_HOST}:${process.env.FE_PORT}/verify-email?verifyToken=${verifyToken}`;
    const emailData: { [key: string]: string } = {
      emailTitle: translations["VerificationEmail.subject"],
      emailGreeting: emailGreeting,
      emailDescription: translations["VerificationEmail.emailDescription"],
      verifyLink: verifyLink,
      verifyButton: translations["VerificationEmail.verifyButton"],
    };
    const htmlTemplate = fs.readFileSync(
      path.join(path.resolve(), "src", "emails", "verification", "email.html"),
      "utf-8"
    );

    const html = replacedHtml(emailData, htmlTemplate);
    transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: translations["VerificationEmail.subject"],
      text: translations["VerificationEmail.subject"],
      html: html,
    });
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

export default CreateVerificationEmail;
