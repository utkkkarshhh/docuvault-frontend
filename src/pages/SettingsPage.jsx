import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Menu, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import DeleteAccountModal from "@/components/custom/Modals/DeleteAccountModal";
import { useSelector } from "react-redux";
import { apiEndpoints } from "@/constants/constants";
import { parseApiError } from "@/utils/parseApiError";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";
import { clearState } from "@/redux/user/userSlice";


const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("Account");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSubscribedToEmails, setIsSubscribedToEmail] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser.user_id;
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(apiEndpoints.getUserDetails, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          toast.success(response.data.message || "User details fetched successfully");
          const { email, username, is_subscribed_to_emails } = response.data.data;
          setEmail(email);
          setUsername(username);
          setIsSubscribedToEmail(is_subscribed_to_emails);
        } else {
          toast.error(response.data?.message || "Failed to fetch user details");
        }
      } catch (error) {
        toast.error(parseApiError(error));
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId, baseUrl]);

  const handleUpdateAccountSettings = async () => {
    if (!email || !username) {
      toast.error("Email and username cannot be empty");
      return;
    }

    const saveButton = document.getElementById("account-save-button");
    if (saveButton) {
      saveButton.disabled = true;
    }

    const request_payload = {
      username,
      email,
      is_subscribed_to_emails: isSubscribedToEmails ? "1" : "0",
    };

    try {
      const response = await axios.patch(
        apiEndpoints.updateUserDetails,
        request_payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Account settings updated successfully");
      } else {
        toast.error(response.data?.message || "Failed to update account settings");
      }
    } catch (error) {
      toast.error(parseApiError(error));
      console.error("Error updating account settings:", error);
    } finally {
      if (saveButton) {
        saveButton.disabled = false;
      }
    }
  };

  const handleUpdatePassword = async (
    currentPassword,
    newPassword,
    confirmPassword
  ) => {
    const request_payload = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmPassword,
    };

    try {
      const response = await axios.patch(
        apiEndpoints.updateUserPassword,
        request_payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Password updated successfully");
        return true;
      } else {
        toast.error(response.data?.message || "Failed to update password");
        return false;
      }
    } catch (error) {
      toast.error(parseApiError(error));
      console.error("Password update error:", error);
      return false;
    }
  };

  const handleDeleteAccount = async (reasonForDeletion) => {
    try {
      const request_payload = {
        reason_for_deletion: reasonForDeletion,
      };

      const response = await axios.patch(apiEndpoints.deleteUser, request_payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Account deleted successfully");
        dispatch(logout());
        dispatch(clearState());
        localStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        navigate("/", { replace: true });
      } else {
        toast.error(response.data?.message || "Failed to delete account");
      }
    } catch (error) {
      toast.error(parseApiError(error));
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const menuItems = [
    {
      name: "Account",
      component: (
        <AccountSettings
          email={email}
          username={username}
          subscribeToEmails={isSubscribedToEmails}
          onEmailChange={setEmail}
          onUsernameChange={setUsername}
          onSubscribeChange={setIsSubscribedToEmail}
          onSave={handleUpdateAccountSettings}
          onPasswordUpdate={handleUpdatePassword}
        />
      ),
    },
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
        onConfirmDelete={handleDeleteAccount}
      />
    </div>
  );
};

const AccountSettings = ({
  email,
  username,
  subscribeToEmails,
  onEmailChange,
  onUsernameChange,
  onSubscribeChange,
  onSave,
  onPasswordUpdate,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAccountEditing, setIsAccountEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const handlePasswordUpdate = async () => {
    // Trim input values to remove whitespace
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Validate inputs
    if (!trimmedCurrentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (trimmedNewPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await onPasswordUpdate(
        trimmedCurrentPassword,
        trimmedNewPassword,
        trimmedConfirmPassword
      );

      // Reset password fields and exit editing mode
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsPasswordEditing(false);
    } catch (error) {
      // Error handling is done in the parent component's onPasswordUpdate method
      console.error("Password update error:", error);
    }
  };

  const handleSave = () => {
    onSave();
    setIsAccountEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Account Information Section (unchanged) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Account Information</h2>
          {!isAccountEditing && (
            <Button variant="outline" onClick={() => setIsAccountEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="max-w-md"
              disabled={!isAccountEditing}
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
              onChange={(e) => onUsernameChange(e.target.value)}
              className="max-w-md"
              disabled={!isAccountEditing}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Email Preferences</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="subscribe"
              checked={subscribeToEmails}
              onCheckedChange={onSubscribeChange}
              disabled={!isAccountEditing}
            />
            <label htmlFor="subscribe" className="text-sm font-medium">
              Subscribe to emails
            </label>
          </div>
        </div>
        {isAccountEditing && (
          <div className="pt-4 flex space-x-2">
            <Button id="account-save-button" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAccountEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Password Section */}
      <Separator />
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Password</h2>
          {!isPasswordEditing && (
            <Button
              variant="outline"
              onClick={() => setIsPasswordEditing(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="max-w-md"
              disabled={!isPasswordEditing}
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium mb-1"
            >
              New Password
            </label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="max-w-md"
              disabled={!isPasswordEditing}
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium mb-1"
            >
              Confirm New Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="max-w-md"
              disabled={!isPasswordEditing}
            />
          </div>
          {isPasswordEditing && (
            <div className="flex space-x-2">
              <Button onClick={handlePasswordUpdate}>Update Password</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setIsPasswordEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
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
