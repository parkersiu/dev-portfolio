import { NextResponse } from "next/server";
import mail, * as sgMail from "@sendgrid/mail";

type ResponseData = {
  status?: string;
  message?: string;
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  let response: ResponseData = {};
  const body = await request.json();

  const message = `
  Name: ${body.name}\r\n
  Email: ${body.email}\r\n
  Message: ${body.message}
  `;
  const data = {
    to: "parker.siu@gmail.com",
    from: "test@email.com",
    subject: "Contact message from portfolio site",
    test: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  await sgMail
    .send(data)
    .then(() => {
      response = {
        status: "success",
        message: "Your message was sent. I'll be in contact shortly.",
      };
    })
    .catch((error) => {
      response = {
        status: "error",
        message: `Message failed to send with error, ${error}`,
      };
    });

  return NextResponse.json(response);
}
