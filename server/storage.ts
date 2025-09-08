import {
  users,
  sessions,
  type User,
  type UpsertUser,
  type LoginData,
  type SignupData,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: SignupData & Partial<UpsertUser>): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  validateUser(email: string, password: string): Promise<User | null>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: SignupData & Partial<UpsertUser>): Promise<User> {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const [user] = await db
      .insert(users)
      .values({
        email: userData.email,
        firstName: userData.firstName,
        password: hashedPassword,
        company: userData.company,
        role: userData.role,
        division: userData.division,
        phoneNumber: userData.phoneNumber,
        city: userData.city,
        language: userData.language,
      })
      .returning();
    
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
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

export class MemStorage implements IStorage {
  private users: User[] = [];
  private nextId = 1;

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async createUser(userData: SignupData & Partial<UpsertUser>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user: User = {
      id: this.nextId.toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: null,
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
    };

    this.users.push(user);
    this.nextId++;
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = await this.getUserByEmail(userData.email!);
    
    if (existingUser) {
      // Update existing user
      Object.assign(existingUser, userData, { updatedAt: new Date() });
      return existingUser;
    } else {
      // Create new user
      const user: User = {
        id: this.nextId.toString(),
        email: userData.email!,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        password: userData.password || null,
        profileImageUrl: userData.profileImageUrl || null,
        company: userData.company || null,
        role: userData.role || null,
        division: userData.division || null,
        phoneNumber: userData.phoneNumber || null,
        city: userData.city || null,
        language: userData.language || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.users.push(user);
      this.nextId++;
      return user;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
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

// Use MemStorage by default, can be switched to DatabaseStorage when database is available
export const storage = new MemStorage();