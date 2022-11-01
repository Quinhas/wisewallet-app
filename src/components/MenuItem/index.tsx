import { Link, useStyleConfig } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

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
	const styles = useStyleConfig('MenuItem', {
		variant
	});

	return (
		<Link
			as={RouterLink}
			to={href}
			__css={styles}
		>
			{name}
		</Link>
	);
}
