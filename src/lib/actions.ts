"use server";

import ContactFormEmail from "@/components/email/ContactFormEmail";
import { Resend } from "resend";
import { z } from "zod";
import { ContactFormSchema } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);


type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);

  if (result.error) {
    return { error: result.error.format() };
  }

  try {
    const { name, email, message } = result.data;
    const { data, error } = await resend.emails.send({
      from: `matthew.com <contact@matthew.com>`,
      to: "matthewaraujo.dev@gmail.com",
      replyTo: [email],
      cc: [email],
      subject: `New message from ${name}!`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`,
      react: ContactFormEmail({ name, email, message }),
    });

    if (!data || error) {
      throw new Error("Failed to send email!");
    }

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An unexpected error occurred." };
  }
}

