"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

export const CreateWorkspaceModal = () => {
  const router = useRouter();
  // Use the jotai hook to manage modal state
  const [open, setOpen] = useCreateWorkspaceModal();
  const [name, setName] = useState<string>("");
  // Use the custom hook to create a workspace
  const { mutate, isPending } = useCreateWorkspace();
  // Handle modal close
  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { name },
      {
        onSuccess(id) {
          toast.success("Workspace created successfully!");
          router.push(`/workspace/${id}`);
          handleClose();
          console.log(id);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to collaborate with your team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            disabled={isPending}
            placeholder="Workspace Name e.g. Work, Personal, etc."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
          <div className="flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
        {/* Add form or content for creating a workspace here */}
      </DialogContent>
    </Dialog>
  );
};
