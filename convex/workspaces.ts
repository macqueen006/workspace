import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
};

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
    const joinCode = generateCode();
    // Insert the new workspace into the database
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });

    // Return the ID of the newly created workspace
    return workspaceId;
  },
});

// This query retrieves all workspaces that a user is  apart of
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    // find all workspace or servers the user is a member of
    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();
    // get all of the workspace id that we can extract from here
    const workspaceIds = members.map((member) => member.workspaceId);
    const workspaces = [];

    for (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);
      if (workspace) workspaces.push(workspace);
    }

    return workspaces;
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }
    //show members of that workspace only
    const member = ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    if (!member) return null;
    return await ctx.db.get(args.id);
  },
});
