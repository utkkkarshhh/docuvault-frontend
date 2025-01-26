import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import documentImage from "@/assets/images/1376310.png";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32 flex flex-col lg:flex-row items-center">
      <div className="lg:w-2/3 lg:pr-8 mb-8 lg:mb-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Secure Document Management
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Document Vault is a secure and intuitive solution for organizing,
          storing, and accessing your important documents anytime and anywhere
          in a format and size of your choice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <Button size="lg">Register Now</Button>
          </Link>
          <Link to="https://www.youtube.com">
            <Button variant="outline" size="lg">
              Watch Video
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:w-1/3 lg:pl-12">
        <img
          src={documentImage || "/placeholder.svg"}
          alt="Document Vector"
          className="w-full h-auto max-w-xs mx-auto"
        />
      </div>
    </div>
  );
}
