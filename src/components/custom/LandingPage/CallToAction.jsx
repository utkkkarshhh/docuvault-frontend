import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="bg-primary text-primary-foreground py-16 sm:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg mb-8">
          Join DocuVault today and experience secure document management like
          never before.
        </p>
        <Link href="/register">
          <Button size="lg" variant="secondary">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
