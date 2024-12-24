"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "../ui/sidebarhelper";
import {
  IconHome,
  IconCalendar,
  IconHeart,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import github from "../assets/github.webp";

// Import 3 feature components:
import MainChat from "./mainchat";
import MealPlans from "./mealplans";
import Favorites from "./favorites";

export function SidebarDemo() {
  // Hover-to-expand logic
  const [open, setOpen] = useState(false);

  // Local state: which view to show (home, mealplans, favorites, settings)
  const [activeView, setActiveView] = useState("home");

  // Instead of href, each link has a "view" value for local toggling.
  const links = [
    {
      label: "Home",
      view: "home",
      icon: <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Weekly Meal Plans",
      view: "mealplans",
      icon: <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "My Favorites",
      view: "favorites",
      icon: <IconHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      view: "settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      view: "logout",
      icon: <IconLogout className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      {/* 1) The hover-to-expand sidebar on the left */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          {/* Left side: links, logo, etc. */}
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLinkButton
                  key={idx}
                  link={link}
                  onClick={() => {
                    if (link.view === "logout") {
                      alert("Implement your logout logic here!");
                      return;
                    }
                    setActiveView(link.view);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom Link */}
          <div>
            {/* GitHub / user link example */}
            <SidebarLinkButton
              link={{
                label: "Gana J",
                view: "user",
                icon: (
                  <Image
                    src={github}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
              onClick={() => alert("User profile clicked!")}
            />
          </div>
        </SidebarBody>

        {/* 2) The main content area on the right side, but still inside the same container */}
        <div className="flex-1 bg-white p-4 overflow-y-auto">
          {activeView === "home" && <MainChat />}
          {activeView === "mealplans" && <MealPlans />}
          {activeView === "favorites" && <Favorites />}
          {activeView === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p>All your future settings go here.</p>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
}

/** A button that mimics your SidebarLink styling but uses onClick for local toggling. */
function SidebarLinkButton({ link, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 py-2 px-3 hover:bg-gray-200 cursor-pointer"
    >
      {link.icon}
      <span className="text-neutral-700 dark:text-neutral-200 text-sm">
        {link.label}
      </span>
    </div>
  );
}

/** A 'full' logo for when the sidebar is expanded */
function Logo() {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        MealMind
      </motion.span>
    </div>
  );
}

/** An icon-only logo for when the sidebar is collapsed */
function LogoIcon() {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
}
