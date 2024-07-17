"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../../config/database"; 
import { users } from "../../config/database/schema"; 
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await db.insert(users).values(user).returning();
    console.log(newUser);
    return newUser[0]; // Assuming the returning clause returns an array
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (user.length === 0) throw new Error("User not found");
    return user[0];
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(userId: string, user: UpdateUserParams) {
  try {
    user.updatedAt = new Date(); // Ensure updatedAt is set to current date/time
    const updatedUser = await db
      .update(users)
      .set(user)
      .where(eq(users.id, userId))
      .returning();
    if (updatedUser.length === 0) throw new Error("User update failed");
    return updatedUser[0];
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(userId: string) {
  try {
    const deletedUser = await db.delete(users).where(eq(users.id, userId)).returning();
    if (deletedUser.length === 0) throw new Error("User not found");
    revalidatePath("/");
    return deletedUser[0];
  } catch (error) {
    handleError(error);
  }
}
