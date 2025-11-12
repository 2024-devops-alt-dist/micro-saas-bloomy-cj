import { Button } from "@radix-ui/themes";
import "../../assets/styles/Buttons.css";
import { useNavigate } from "react-router-dom";

export function CustomButton(props: React.ComponentProps<typeof Button>) {
      const navigate = useNavigate();

      
  return (
    <Button className="custom-btn" {...props} onClick={() => navigate("/addGarden")}>
      {props.children}
    </Button>
  );
}
