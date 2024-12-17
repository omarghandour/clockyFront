// pages/api/send-email.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse the incoming form data
    const formData = await request.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const message = formData.get("message") as string | null;
    const file = formData.get("file") as any | null;

    // Validate required fields
    if (!name || !email || !message || !file) {
      return NextResponse.json(
        { message: "Name, email, message, and file are required" },
        { status: 400 }
      );
    }
    // Convert file to a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    // Configure your email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email with attachment
    const mailOptions: any = {
      from: "Andrew Clocky",
      to: "omarghandour556@gmail.com",
      subject: "Contact Form Submission with Attachment",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      attachments: [
        {
          filename: file.name,
          content: fileBuffer,
          contentType: file.type,
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email with file sent successfully!" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
