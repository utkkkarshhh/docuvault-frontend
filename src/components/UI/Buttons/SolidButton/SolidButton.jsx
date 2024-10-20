import { Button } from "@/components/ui/button";
import "./SolidButton.scss";

const SolidButton = ({ onClick, buttonName }) => {
  return <Button onClick={onClick} className="solid-button">{buttonName}</Button>;
};

export default SolidButton;