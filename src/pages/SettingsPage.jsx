import React, { useState } from "react";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import ProfileSection from "@/components/custom/ProfileSection/ProfileSection";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("Account");

  const menuItems = [
    { name: "Account", component: <div>Account settings here</div> },
    {
      name: "Delete/Terminate Account",
      component: <div>Account deletion options here</div>,
    },
  ];

  const renderContent = () => {
    const activeItem = menuItems.find((item) => item.name === activeSection);
    return activeItem ? activeItem.component : null;
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-center justify-between md:justify-start mb-4 md:mb-0">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px]">
                <nav className="grid gap-4 text-sm text-muted-foreground py-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to="#"
                      className={`${
                        activeSection === item.name
                          ? "font-semibold text-primary"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveSection(item.name);
                        document
                          .querySelector('button[aria-label="Close"]')
                          ?.click();
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="text-3xl font-semibold text-center flex-grow md:text-left md:flex-grow-0">
              Settings
            </h1>
            <div className="w-10 md:hidden"></div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl items-start gap-6 md:grid md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="hidden md:grid gap-4 text-sm text-muted-foreground">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to="#"
                className={`${
                  activeSection === item.name
                    ? "font-semibold text-primary"
                    : ""
                }`}
                onClick={() => setActiveSection(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="grid gap-6 mt-6 md:mt-0">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
