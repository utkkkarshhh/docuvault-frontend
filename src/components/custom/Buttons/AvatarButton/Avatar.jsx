import axios from "axios";
import {
  Cloud,
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import AvatarImage from "@/assets/images/avatar-generations_prsz.jpg";
import "./AvatarButton.scss";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/authSlice";

// Utility function for logout
const logoutUser = async (dispatch) => {
  try {
    dispatch(logout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    delete axios.defaults.headers.common["Authorization"];
  } catch (error) {
    console.error("Logout failed", error);
  }
};

const Avatar = ({ name }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="avatar-button"
          aria-label="User Menu"
        >
          <img src={AvatarImage} alt="Avatar" className="avatar-image" />
          <span className="avatar-name">{name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <Link to="https://github.com/utkkkarshhh/docuvault-frontend">
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <Link to="mailto:utkarshbhardwajmail@gmail.com">Support</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatar;
