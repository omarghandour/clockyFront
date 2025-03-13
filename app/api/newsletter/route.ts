import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// Define your Mongoose schema for subscriptions
const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Model for Subscription
const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

// Connect to MongoDB
async function connectDB() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const { email } = data;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Configure your email transport
    const transporter = nodemailer.createTransport({
      service: "smtp.hostinger.com",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for subscribing!",
      text: "Welcome to our newsletter. Stay tuned for updates!",
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Connect to the database and save the email
    await connectDB();
    const subscription = new Subscription({ email });
    await subscription.save();

    return NextResponse.json({ message: "Subscription successful!" });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { message: "Error processing subscription", error: error.message },
      { status: 500 }
    );
  }
}
