import { QueryProvider } from './components/providers/query-provider';
import { RouterProvider } from './components/providers/router-provider';
import { ThemeProvider } from './components/ui/theme-provider';
import { AuthProvider } from './components/providers/auth-provider';
import ChatRoutes from './routes/chat-routes';
import { CommandMenu } from './components/command/command-menu';

export default function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <ThemeProvider>
          <RouterProvider>
            <ChatRoutes />
            <CommandMenu />
          </RouterProvider>
        </ThemeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}