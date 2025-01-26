import { CiLinkedin } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";

const developers = [
  {
    name: "Utkarsh Bhardwaj",
    image: "https://avatars.githubusercontent.com/u/67866657?v=4",
    linkedin: "https://www.linkedin.com/in/utkkkarshhh/",
    github: "https://www.github.com/utkkkarshhh/",
    bio: "Software Engineer @Stealth | MCA (Master of Computer Applications) ",
  },
];

export default function Developers() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24" id="developers">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meet the <span className="text-primary">Developer</span>
          </h2>
          <p className="text-lg text-gray-600">
            DocuVault is a passion project for me!
          </p>
        </div>
        <div className="flex justify-center">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-xl max-w-3xl w-full"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <img
                    src={dev.image || "/placeholder.svg"}
                    alt={dev.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto"
                  />
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <h3 className="text-2xl font-semibold mb-2">{dev.name}</h3>
                  <p className="text-gray-600 mb-4">{dev.bio}</p>
                  <div className="flex space-x-4 mb-4">
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <CiLinkedin className="w-8 h-8" />
                    </a>
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <FiGithub className="w-8 h-8" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
