import { Button, useStyleConfig } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
	name: string;
	variant?: string;
	href: string;
}

export default function MenuItem({
	variant,
	name,
	href
}: MenuItemProps): JSX.Element {
	const styles = useStyleConfig('CustomMenuItem', {
		variant
	});

	return (
		<Button
			as={Link}
			to={href}
			__css={styles}
		>
			{name}
		</Button>
	);
}
