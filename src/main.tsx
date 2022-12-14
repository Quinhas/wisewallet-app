import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '@fontsource/fira-mono/400.css';
import '@fontsource/fira-mono/500.css';
import '@fontsource/fira-mono/700.css';
import '@fontsource/montserrat/300.css'; // Light
import '@fontsource/montserrat/400.css'; // Regular
import '@fontsource/montserrat/500.css'; // Medium
import '@fontsource/montserrat/600.css'; // Semibold
import '@fontsource/montserrat/700.css'; // Bold
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { AuthContextProvider } from 'contexts/AuthContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CustomRoutes } from 'routes';
import theme from 'styles/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<BrowserRouter>
		<ChakraProvider theme={theme}>
			<AuthContextProvider>
				<ColorModeScript />
				<CustomRoutes />
			</AuthContextProvider>
		</ChakraProvider>
	</BrowserRouter>
	// </React.StrictMode>
);
