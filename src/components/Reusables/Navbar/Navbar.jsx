import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSelector } from "react-redux"
import Avatar from "@/components/custom/Buttons/AvatarButton/Avatar"
import { ROUTES } from "@/constants/routeConfig"

export default function Navbar() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  // Don't show navbar on public pages - LandingPage has its own
  if (!isLoggedIn && location.pathname === "/") {
    return null;
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="font-bold text-xl text-primary flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            D
          </div>
          DocuVault
        </Link>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="flex gap-2">
              <Link to={ROUTES.LOGIN}>
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Avatar name={currentUser?.username || "User"} />
          )}
        </div>
      </div>
    </nav>
  );
}
