import { Button } from "@/components/ui/button";
import "./SolidButton.scss";

const SolidButton = ({ onClick, buttonName }) => {
  return <Button className="solid-button">{buttonName}</Button>;
};

export default SolidButton;