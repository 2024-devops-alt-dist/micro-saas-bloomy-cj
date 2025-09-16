import { Button } from '@radix-ui/themes';
import '../assets/button.css';

export function CustomButton(props: React.ComponentProps<typeof Button>) {
	return (
		<Button className="custom-btn" {...props}>
			{props.children}
		</Button>
	);
}