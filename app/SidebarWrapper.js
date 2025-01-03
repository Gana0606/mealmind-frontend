// app/SidebarWrapper.js
"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/ui/sidebarhelper";
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
import github from "@/assets/github.webp";

function Logo() {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0" />
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

function LogoIcon() {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0" />
    </div>
  );
}

export default function SidebarWrapper() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Weekly Meal Plans",
      href: "/meal-plans",
      icon: <IconCalendar className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "My Favorites",
      href: "/favorites",
      icon: <IconHeart className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconLogout className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full max-w-[300px] flex-shrink-0",
        "border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Gana J",
                href: "#",
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
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
