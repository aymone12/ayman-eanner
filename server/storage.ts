import {
  User,
  IUser,
  type LoginData,
  type SignupData,
  type CreateUserData,
  type UpdateUserData,
} from "./models";
import bcrypt from "bcryptjs";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(userData: CreateUserData): Promise<IUser>;
  updateUser(id: string, userData: UpdateUserData): Promise<IUser | null>;
  upsertUser(userData: CreateUserData): Promise<IUser>;
  validateUser(email: string, password: string): Promise<IUser | null>;
}

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      return user;
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
        email: userData.email.toLowerCase(),
        firstName: userData.firstName,
        password: hashedPassword,
        company: userData.company,
        role: userData.role,
        division: userData.division,
        phoneNumber: userData.phoneNumber,
        city: userData.city,
        language: userData.language,
      });
      
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.code === 11000) {
        throw new Error('User with this email already exists');
      }
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { ...userData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  }

  async upsertUser(userData: CreateUserData): Promise<IUser> {
    try {
      const existingUser = await this.getUserByEmail(userData.email);
      
      if (existingUser) {
        // Update existing user (but don't override password if not provided)
        const updateData: UpdateUserData = {
          firstName: userData.firstName,
          company: userData.company,
          role: userData.role,
          division: userData.division,
          phoneNumber: userData.phoneNumber,
          city: userData.city,
          language: userData.language,
        };
        
        if (userData.password) {
          updateData.password = await bcrypt.hash(userData.password, 12);
        }
        
        const updatedUser = await this.updateUser(existingUser._id.toString(), updateData);
        return updatedUser!;
      } else {
        // Create new user
        return await this.createUser(userData);
      }
    } catch (error) {
      console.error('Error upserting user:', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user || !user.password) {
        return null;
      }
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }
}

// Legacy compatibility classes
export class DatabaseStorage extends MongoStorage {}

export class MemStorage implements IStorage {
  private users: any[] = [];
  private nextId = 1;

  async getUser(id: string): Promise<IUser | null> {
    return this.users.find(user => user._id === id) || null;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.users.find(user => user.email === email.toLowerCase()) || null;
  }

  async createUser(userData: CreateUserData): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user = {
      _id: this.nextId.toString(),
      email: userData.email.toLowerCase(),
      firstName: userData.firstName,
      lastName: userData.lastName || null,
      password: hashedPassword,
      profileImageUrl: null,
      company: userData.company || null,
      role: userData.role || null,
      division: userData.division || null,
      phoneNumber: userData.phoneNumber || null,
      city: userData.city || null,
      language: userData.language || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IUser;

    this.users.push(user);
    this.nextId++;
    return user;
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<IUser | null> {
    const user = await this.getUser(id);
    if (user) {
      Object.assign(user, userData, { updatedAt: new Date() });
      return user;
    }
    return null;
  }

  async upsertUser(userData: CreateUserData): Promise<IUser> {
    const existingUser = await this.getUserByEmail(userData.email);
    
    if (existingUser) {
      const updateData = {
        firstName: userData.firstName,
        company: userData.company,
        role: userData.role,
        division: userData.division,
        phoneNumber: userData.phoneNumber,
        city: userData.city,
        language: userData.language,
      };
      
      return await this.updateUser(existingUser._id, updateData) || existingUser;
    } else {
      return await this.createUser(userData);
    }
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user = await this.getUserByEmail(email);
    if (!user || !user.password) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    return user;
  }
}

// Use MongoStorage by default
export const storage = new MongoStorage();
