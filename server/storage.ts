import { User, IUser, type LoginData, type SignupData, type CreateUserData } from "./models/index";
import bcrypt from "bcryptjs";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(userData: CreateUserData): Promise<IUser>;
  updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  validateUser(email: string, password: string): Promise<IUser | null>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<IUser | null> {
    try {
      return await User.findById(id).select('-password').lean().exec();
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await User.findOne({ email }).exec();
    } catch (error) {
      console.error('Error getting user by email:', error);
      return null;
    }
  }

  async createUser(userData: CreateUserData): Promise<IUser> {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      const user = new User({
        ...userData,
        password: hashedPassword,
      });
      
      await user.save();
      
      // Return user without password
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      // If updating password, hash it
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 12);
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true }
      ).select('-password').lean().exec();
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email }).select('+password').exec();
      
      if (!user) {
        return null;
      }
      
      // Ensure password exists before comparing
      if (!user.password) {
        return null;
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return null;
      }
      
      // Return user without password
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }
}

// Create a singleton instance
export const storage = new DatabaseStorage();
