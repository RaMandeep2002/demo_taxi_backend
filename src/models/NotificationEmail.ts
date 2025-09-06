import mongoose, { Document, Schema } from "mongoose";
import { z } from "zod";

export interface INotificationEmail extends Document {
    email: string;
    appPassword: string;
}

const NotificationEmailSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
    },
    appPassword: {
        type: String,
        required: true,
    }
});
const emailregex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

export const emailNortificationSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Please enter a valid email address" })
        .refine((value) => emailregex.test(value), { message: "Email format is invalid" }),
    appPassword: z.string().min(6, "Password must be atleast 6 characters"),
})

export default mongoose.model<INotificationEmail>("NotificationEmail", NotificationEmailSchema);
