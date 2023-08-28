import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRootContainer } from './shared/app-root/app-root.container';
import theme from './theme/theme';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <BrowserRouter>
            <div style={{backgroundImage: 'url(../../assets/images/login_background.png)', minHeight: '100vh', backgroundSize: '100% 100%'}}>
              <AppRootContainer />
            </div>
          </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
