import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Interface definitions matching the existing schema
export interface IUser extends Document {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  profileImageUrl?: string;
  company?: string;
  role?: string;
  division?: string;
  phoneNumber?: string;
  city?: string;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISession extends Document {
  _id: string;
  sid: string;
  sess: any;
  expire: Date;
}

// User Schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    profileImageUrl: {
      type: String,
    },
    company: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    division: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Session Schema
const SessionSchema = new Schema<ISession>(
  {
    sid: {
      type: String,
      required: true,
    },
    sess: {
      type: Schema.Types.Mixed,
      required: true,
    },
    expire: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: false, // We manage expiry manually
  }
);

// Create indexes
UserSchema.index({ email: 1 }, { unique: true });
SessionSchema.index({ expire: 1 }, { expireAfterSeconds: 0 });

// Models
export const User = mongoose.model<IUser>('User', UserSchema);
export const Session = mongoose.model<ISession>('Session', SessionSchema);

// Zod schemas (keeping existing validation)
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const userDetailsSchema = z.object({
  company: z.string().min(1, "Company/Organization is required"),
  role: z.string().min(1, "Role/Title is required"),
  division: z.string().min(1, "Division of interest is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  city: z.string().min(1, "City/Region is required"),
  language: z.string().min(1, "Preferred language is required"),
});

// Type definitions
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type UserDetailsData = z.infer<typeof userDetailsSchema>;

// Helper type for creating users (without auto-generated fields)
export type CreateUserData = Omit<SignupData, 'confirmPassword'> & Partial<UserDetailsData>;
export type UpdateUserData = Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>>;
