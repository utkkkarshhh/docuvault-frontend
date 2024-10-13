import "./WhiteButton.scss";
import { Button } from "@/components/ui/button";

const WhiteButton = ({ onClick, buttonName }) => {
  return <Button className="white-button" variant="secondary">{buttonName}</Button>;
};


export default WhiteButton;