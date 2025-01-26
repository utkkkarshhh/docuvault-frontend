import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { IoIosCloudDownload } from "react-icons/io";
import { GiResize } from "react-icons/gi";
import { IoMdCloudDone } from "react-icons/io";

const features = [
  {
    icon: <AiOutlineSafetyCertificate className="w-12 h-12" />,
    text: "Securely store your important documents.",
  },
  {
    icon: <IoIosCloudDownload className="w-12 h-12" />,
    text: "Download anywhere and anytime you want.",
  },
  {
    icon: <GiResize className="w-12 h-12" />,
    text: "Download in any format, size, or dimension.",
  },
  {
    icon: <IoMdCloudDone className="w-12 h-12" />,
    text: "One stop place for all your conversion needs.",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-16 sm:py-24" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why use <span className="text-primary">DocuVault?</span>
          </h2>
          <p className="text-lg text-gray-600">
            DocuVault helps you in efficiently managing your documents!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <div className="text-primary opacity-75 mb-4">{feature.icon}</div>
              <p className="text-gray-800">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
