import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Pencil } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { apiEndpoints } from "@/constants/constants";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100");

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.user_id;
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(apiEndpoints.getUserDetails, {
          headers: {
            Accept: "application/json"
          },
        });

        if (response.data.success) {
          const userData = response.data.data;
          setName(userData.name || "");
          setEmail(userData.email || "");
          setDob(userData.dob ? new Date(userData.dob) : "");
          setBio(userData.bio || "");

          toast.success(response.data.message || "User details loaded");
        } else {
          const errorMsg =
            Array.isArray(response.data.errors) && response.data.errors.length > 0
              ? response.data.errors[0]
              : response.data.message || "Failed to fetch user details";

          toast.error(errorMsg);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        const errMsg =
          error.response?.data?.errors?.[0] ||
          error.response?.data?.message ||
          "Error fetching user details";
        toast.error(errMsg);
      }
    };

    fetchUserDetails();
  }, [currentUser.token]);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatePayload = {
        name,
        email,
        dob: dob ? dob.toISOString().split("T")[0] : null,
        bio,
      };

      const response = await axios.patch(
        apiEndpoints.updateUserDetails,
        updatePayload,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated successfully");
      } else {
        const errorMsg =
          Array.isArray(response.data.errors) && response.data.errors.length > 0
            ? response.data.errors[0]
            : response.data.message || "Failed to update profile";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Update error:", error);
      const errMsg =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        "Error updating profile";
      toast.error(errMsg);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatar} alt="Profile picture" />
            <AvatarFallback>{name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          {isEditing && (
            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Button type="button" variant="outline">
                  Change Picture
                </Button>
              </Label>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dob && "text-muted-foreground"
                )}
                disabled={!isEditing}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={!isEditing}
            className="min-h-[100px]"
          />
        </div>

        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <Button type="submit">Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </form>
    </div>
  );
};

export default ProfileSection;
