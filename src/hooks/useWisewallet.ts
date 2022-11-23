import { useContext } from 'react';
import {
	WisewalletContext,
	WisewalletContextProps
} from '../contexts/WisewalletContext';

export function useWisewallet(): WisewalletContextProps {
	const value = useContext(WisewalletContext);
	return value;
}
