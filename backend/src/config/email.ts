import nodemailer from "nodemailer";

export const createTransporter = () => {
  if (process.env.NODE_ENV === "production") {
    // return nodemailer.createTransport({
    //   service: "hotmail",
    //   host: "my.smtp.host",
    //   port: 465,
    //   secure: true, // use TLS
    //   auth: {
    //     user: "username",
    //     pass: "pass",
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });
  }

  return nodemailer.createTransport({
    service: "hotmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
};
