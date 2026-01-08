import { CustomButton } from "../features/buttons/button";
import { Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import "../assets/styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); 
  };

  return (
    <Flex align="center" justify="center" className="home-bg" style={{ height: "100vh" }}>
      <Flex direction="column" align="center" justify="center" gap="4" className="home-card">
        <CustomButton onClick={handleLoginRedirect}>
          Se connecter / S'inscrire
        </CustomButton>
      </Flex>
    </Flex>
  );
}
