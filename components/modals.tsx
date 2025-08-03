"use client";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";
import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";

export const Modals = () => {
  // Ensure the component is mounted before rendering modals
  const [mounted, setMounted] = useState(false);

  // Use an effect to set the mounted state
  useEffect(() => {
    setMounted(true);
  }, []);
  // If not mounted, return null to avoid rendering modals prematurely
  if (!mounted) return null;

  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};
