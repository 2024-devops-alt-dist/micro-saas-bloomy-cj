import { CustomButton } from '../components/button';
import { Flex } from "@radix-ui/themes";
import '../assets/home.css';


export default function Home() {
	return (
        <Flex align="center" justify="center" className="home-bg">
            <Flex direction="column" align="center" justify="center" gap="4" className="home-card">
                <h1>Tester c'est douter :</h1>
                <CustomButton>Tester la connexion</CustomButton>
            </Flex>
        </Flex>
	);
}
