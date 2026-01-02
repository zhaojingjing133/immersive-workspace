import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { SettingsProvider } from './context/SettingsContext';
import ImmersiveLayout from './components/Layout/ImmersiveLayout';
import WorkspaceContainer from './components/Workspace/WorkspaceContainer';
import SettingsPanel from './components/Settings/SettingsPanel';
import TimerDisplay from './components/Settings/TimerDisplay';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#a1a1aa',
    },
    background: {
      default: '#000000',
      paper: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: '"PingFang HK", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
        <WorkspaceProvider>
          <ImmersiveLayout>
            <WorkspaceContainer />
            <SettingsPanel />
            <TimerDisplay />
          </ImmersiveLayout>
        </WorkspaceProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;

