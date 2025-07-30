"use client";
import { atom, useAtom } from "jotai";

// Create an atom to manage the state of the create workspace modal
const modalState = atom(false);

// Custom hook to manage the create workspace modal state
export const useCreateWorkspaceModal = () => {
  return useAtom(modalState);
};
