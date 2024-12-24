// app/layout.js
import "./globals.css";
import SidebarWrapper from "./SidebarWrapper";

export const metadata = {
  title: "MealMind",
  description: "MealMind: Your personal recipe and meal planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100">
        <SidebarWrapper />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </body>
    </html>
  );
}
