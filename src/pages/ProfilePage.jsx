import { useNavigate } from "react-router-dom"
import { ROUTES } from "@/constants/routeConfig"
import ProfileSection from "@/components/custom/ProfileSection/ProfileSection"

export default function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            DocuVault
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate(ROUTES.SETTINGS)}
              className="text-foreground hover:text-primary transition-colors"
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Your Profile</h1>
          <ProfileSection />
        </div>
      </div>
    </div>
  )
}
