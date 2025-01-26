import { Link } from "react-router-dom";
import { Linkedin, Globe, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-semibold text-primary">
              DocuVault
            </Link>
          </div>
          <div className="flex gap-6 mb-4 md:mb-0">
            <a
              href="https://www.linkedin.com/in/utkkkarshhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Globe size={24} />
              <span className="sr-only">Website</span>
            </a>
            <a
              href="https://www.instagram.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
          <div className="text-sm text-gray-500">
            Designed & Developed by{" "}
            <a
              href="https://www.linkedin.com/in/utkkkarshhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Utkarsh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
