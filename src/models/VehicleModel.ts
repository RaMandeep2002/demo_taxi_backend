import mongoose, { Document, Schema, Types } from "mongoose";

// Interface for Vehicle
export interface IVehicle extends Document {
  registrationNumber: string;
  company: string;
  vehicleModel: string;
  year: number;
  vehicle_plate_number: string;
  vin_number?: string;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  registration_State?: string;
  registration_Expiry_Date?: string;
  last_Inspection_Date?: string;
  status: "active" | "free";
  currentDriver?: Types.ObjectId;
  isActive: boolean;
  isAssigned: boolean;
}

// Vehicle Schema
const VehicleSchema: Schema = new Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    vehicle_plate_number: {
      type: String,
    },
    vin_number: { type: String },
    color: { type: String },
    fuel_type: { type: String },
    transmission: { type: String },
    registration_State: { type: String },
    registration_Expiry_Date: { type: String },
    last_Inspection_Date: { type: String },
    status: {
      type: String,
      enum: ["active", "free"],
      default: "active",
    },
    currentDriver: {
      type: Schema.Types.ObjectId,
      ref: "Driver",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAssigned: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// Create and export model
export const Vehicle = mongoose.model<IVehicle>("Vehicle", VehicleSchema); 