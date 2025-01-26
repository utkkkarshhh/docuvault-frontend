import React, { useState } from "react";
import { Menu, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import DeleteAccountModal from "@/components/custom/Modals/DeleteAccountModal";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("Account");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const menuItems = [
    { name: "Account", component: <AccountSettings /> },
    {
      name: "Delete/Terminate Account",
      component: (
        <DeleteAccount onDeleteClick={() => setIsDeleteModalOpen(true)} />
      ),
    },
  ];

  const renderContent = () => {
    const activeItem = menuItems.find((item) => item.name === activeSection);
    return activeItem ? activeItem.component : null;
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
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
                <nav className="grid gap-4 text-sm py-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to="#"
                      className={`${
                        activeSection === item.name
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
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
          <nav className="hidden md:block">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to="#"
                    className={`block px-3 py-2 rounded-md ${
                      activeSection === item.name
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => setActiveSection(item.name)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 md:mt-0">{renderContent()}</div>
        </div>
      </main>
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

const AccountSettings = () => {
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("johndoe");
  const [subscribeToEmails, setSubscribeToEmails] = useState(true);

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving account settings:", {
      email,
      username,
      subscribeToEmails,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Email Preferences</h2>
        <div className="flex items-center space-x-2">
          <Switch
            id="subscribe"
            checked={subscribeToEmails}
            onCheckedChange={setSubscribeToEmails}
          />
          <label htmlFor="subscribe" className="text-sm font-medium">
            Subscribe to emails
          </label>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Password</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <Input id="current-password" type="password" className="max-w-md" />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <Input id="new-password" type="password" className="max-w-md" />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-1"
            >
              Confirm New Password
            </label>
            <Input id="confirm-password" type="password" className="max-w-md" />
          </div>
          <Button>Update Password</Button>
        </div>
      </div>
    </div>
  );
};

const DeleteAccount = ({ onDeleteClick }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Delete Account</h2>
      <p className="text-muted-foreground mb-4">
        Warning: This action is irreversible. All your data will be permanently
        deleted.
      </p>
      <Button variant="destructive" onClick={onDeleteClick}>
        Delete Account
      </Button>
    </div>
  );
};

export default SettingsPage;
