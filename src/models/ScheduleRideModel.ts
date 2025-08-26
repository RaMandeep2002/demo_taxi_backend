import mongoose, { Document, Schema } from "mongoose";

export interface IScheduleRide extends Document {
    customerName: string;
    customer_phone_number: string;
    customer_email?: string;
    number_of_passengers?: string;
    pickuptime: string;
    pickupDate: string;
    pickupAddress: string;
    dropOffAddress: string;
    status: "schedule" | "Pickup";
    roundTrip: boolean;
    returnDate?: string;
    returnTime?: string;
    sendtoemail?:boolean;
}


const ScheduleRideSchema: Schema = new Schema<IScheduleRide>({
    customerName: {
        type: String,
    },
    customer_phone_number: { type: String },
    customer_email:  { type: String },
    number_of_passengers:  { type: String },
    pickuptime: { type: String, required: true },
    pickupDate: { type: String, required: true },
    pickupAddress: { type: String },
    dropOffAddress: { type: String },
    status: { type: String, enum: ["schedule", "Pickup"], default: "schedule" },
    roundTrip: { type: Boolean, default: false },
    returnDate: { type: String },
    returnTime: { type: String },
    sendtoemail: {type:Boolean, default: false}
}, { timestamps: true });

export default mongoose.model<IScheduleRide>("ScheduleRide", ScheduleRideSchema);

