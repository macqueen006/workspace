import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// This file defines the API for managing workspaces in the application.
export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Ensure the user is authenticated
    const userId = await getAuthUserId(ctx);
    // If userId is not found, throw an error
    if (!userId) {
      throw new Error("User not authenticated");
    }
    // Generate a random join code
    const joinCode = Math.random().toString(36).substring(2, 8);
    // Insert the new workspace into the database
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    // Return the ID of the newly created workspace
    return workspaceId;
  },
});

// This query retrieves all workspaces from the database
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    return await ctx.db.get(args.id);
  },
});
