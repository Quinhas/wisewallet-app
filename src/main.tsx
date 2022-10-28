import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import '@fontsource/fira-mono/400.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import { AuthContextProvider } from 'contexts/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CustomRoutes } from 'routes';
import theme from 'styles/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<AuthContextProvider>
					<ColorModeScript />
					<CustomRoutes />
				</AuthContextProvider>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);
