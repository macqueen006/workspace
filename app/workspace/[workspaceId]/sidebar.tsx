"use client";
import { UserButton } from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./workspace-switcher";

const Sidebar = () => {
    return (
        <aside className="w-[70px] h-full bg-slack-800 flex flex-col gap-y-4 items-center pt-[9px] pb-4">
            <div><WorkspaceSwitcher /></div>
            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton />
            </div>
        </aside>
    );
}

export default Sidebar;