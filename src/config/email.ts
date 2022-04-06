import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { USER_EMAIL, USER_PASSWORD } from "@/components/Utils";

export default async function sendEmail(
  email: string,
  subject: string,
  html: string
) {
  return await new Promise(async (resolve, reject) => {
    const options = {
      from: `Relived Roleplay <${USER_EMAIL}>`,
      to: email,
      subject,
      html,
    };

    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: USER_EMAIL,
          pass: USER_PASSWORD,
        },
      })
    );

    transporter.sendMail(options, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
